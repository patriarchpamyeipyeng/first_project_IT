"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { createBooking, fetchServices } from "@/lib/api";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    stati: "pending",
  });
  const [status, setStatus] = useState("");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    async function loadServices() {
      const res = await fetchServices();
      setServices(res.data || []);
    }
    loadServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");
    const bookingData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      service: form.service ? [form.service] : [],
      stati: form.stati,
    };
    const result = await createBooking(bookingData);
    if (result) {
      setStatus("Booking submitted!");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        service: "",
        stati: "pending",
      });
    } else {
      setStatus("Error submitting booking.");
    }
  };

  return (
    <>
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Book a Truck Service</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 w-full"
            required
          />
          <input
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select a service</option>
            {services.map((svc: any) => (
              <option key={svc.id} value={svc.id}>
                {svc.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Booking
          </button>
        </form>
        {status && <p className="mt-4">{status}</p>}
      </main>
    </>
  );
}