"use client";

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import { mediaURL } from "@/lib/api";

export default function ServiceSection({ services }: { services: any[] }) {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  return (
    <>
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
          selectedService ? "blur-sm" : ""
        }`}
      >
        {services.map((service: any) => {
          const attrs = service.attributes ?? service;
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
              onSelect={() => setSelectedService(attrs)}
            />
          );
        })}
      </div>

      {/* Only client component handles modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
