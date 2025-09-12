import ServiceCard from "@/components/ServiceCard";
import { fetchServices } from "@/lib/api";

export default async function ServicesPage() {
  const services = await fetchServices();
  const svc = services?.data || [];

  return (
    <>
 
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Our <span className="text-blue-600">Services</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {svc.map((service: any) => {
              const attrs = service.attributes || service;

              const iconUrl = attrs.icon?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.icon.url}`
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
    </>
  );
}
