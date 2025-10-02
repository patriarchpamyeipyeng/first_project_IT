"use client";
import { useState, useEffect } from "react";
import { createBooking, fetchServices } from "@/lib/api";
import Link from "next/link";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    vehicleType: "",
    location: "",
    notes: "",
    stati: "pending",
  });
  const [status, setStatus] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      const res = await fetchServices();
      setServices(res.data || []);
    }
    loadServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const bookingData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      vehicleType: form.vehicleType,
      location: form.location,
      notes: form.notes,
      services: form.service ? [form.service] : [],
      stati: form.stati,
    };
    try {
      const result = await createBooking(bookingData);
      if (result) {
        setStatus("✅ Booking submitted! We'll contact you soon.");
        setForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          service: "",
          vehicleType: "",
          location: "",
          notes: "",
          stati: "pending",
        });
      } else {
        setStatus("❌ Error submitting booking. Please try again.");
      }
    } catch (err) {
      setStatus("❌ Error submitting booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <main className="max-w-2xl p-8 mx-auto mt-10 bg-white shadow rounded-xl">
      <h1 className="mb-2 text-3xl font-extrabold text-center text-blue-700">
        Book a Car Service
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Fill out the form below and our team will reach out to confirm your booking.
      </p>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="0803 123 4567"
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Date & Time</label>
          <input
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Vehicle Type</label>
          <input
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            placeholder="e.g. Truck, Car, Bus"
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Your Location"
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any additional info..."
            className="w-full p-3 border rounded focus:outline-blue-500"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Service</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-blue-500"
            required
          >
            <option value="">Select a service</option>
            {services.map((svc: any) => {
              const attrs = svc.attributes || svc;
              return (
                <option key={svc.id} value={svc.id}>
                  {attrs.name || attrs.title || "Service"}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 font-bold text-white transition bg-blue-600 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
{status && (
  <div
    className={`mt-6 text-center font-semibold ${
      status.startsWith("✅") ? "text-green-600" : "text-red-600"
    }`}
  >
    {status}
    {status.startsWith("✅") && (
      <div className="mt-2 text-blue-700">
        <strong>Booking Status:</strong> {form.stati}
      </div>
    )}
  </div>
)}
<Link href="/booking/status" className="text-blue-600 hover:underline">
Check Booking Status
</Link>
    </main>
  );
}