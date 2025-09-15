import ServiceCard from "@/components/ServiceCard";
import { fetchServices, mediaURL } from "@/lib/api";

export default async function ServicesPage() {
  const services = await fetchServices();
  const svc = services?.data || [];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-800">
          Our <span className="text-blue-600">Services</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {svc.map((service: any) => {
            const attrs = service.attributes || service;
            const iconUrl =
              attrs.icon?.data?.attributes?.url
                ? mediaURL(attrs.icon.data.attributes.url)
                : attrs.icon?.url
                  ? mediaURL(attrs.icon.url)
                  : undefined;

            return (
              <ServiceCard
                key={service.id}
                name={attrs.name}
                description={attrs.description}
                icon={iconUrl}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}