"use client";
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
      <main className="max-w-4xl p-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Book a Truck Service</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border"
            required
          />
          <input
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          >
            <option value="">Select a service</option>
            {services.map((svc: any) => (
              <option key={svc.id} value={svc.id}>
                {svc.name}
              </option>
            ))}
          </select>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
            Submit Booking
          </button>
        </form>
        {status && <p className="mt-4">{status}</p>}
      </main>
    </>
  );
}