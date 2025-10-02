import ServiceSection from "@/components/ServiceSection";
import { fetchServices } from "@/lib/api";

export default async function ServicesPage() {
  const servicesRes = await fetchServices();
  const services = servicesRes?.data || [];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-800">
          Our <span className="text-blue-600">Services</span>
        </h1>

        {/* Pass services to client component */}
        <ServiceSection services={services} />
      </div>
    </main>
  );
}
