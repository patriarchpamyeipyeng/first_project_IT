// app/page.tsx
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { fetchHomepage, fetchServices, fetchTestimonials, mediaURL } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

function getMediaUrl(media: any) {
  if (!media) return undefined;
  if (typeof media === "string") return mediaURL(media);
  if (media?.data?.attributes?.url) return mediaURL(media.data.attributes.url);
  if (media?.attributes?.url) return mediaURL(media.attributes.url);
  if (media?.url) return mediaURL(media.url);
  return undefined;
}

export default async function HomePage() {
  const homepageRes = await fetchHomepage();
  const servicesRes = await fetchServices();
  const testimonialsRes = await fetchTestimonials();

  // ✅ always drill into `.data`
  const hp = homepageRes?.data ?? null;
  const hpAttrs = hp?.attributes ?? {};

  const svc = servicesRes?.data ?? [];
  const tms = testimonialsRes?.data ?? [];

  return (
    <main className="max-w-6xl p-8 mx-auto">
      {/* HERO */}
      {(hpAttrs.title || hpAttrs.description || hpAttrs.heroImage) && (
        <Hero
          title={hpAttrs.title}
          description={hpAttrs.description}
          image={getMediaUrl(hpAttrs.heroImage)}
        />
      )}

      {/* ABOUT */}
      {hpAttrs.about && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">About Us</h2>
          <div className="mx-auto text-lg prose text-gray-700">
            <BlocksRenderer content={hpAttrs.about} />
          </div>
        </section>
      )}

      {/* SERVICES */}
      {svc.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Our Services</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((service: any) => {
              const attrs = service.attributes ?? {};
              const iconUrl =
                attrs.icon?.data?.attributes?.url
                  ? mediaURL(attrs.icon.data.attributes.url)
                  : attrs.icon?.url
                    ? mediaURL(attrs.icon.url)
                    : undefined;

              return (
                <ServiceCard
                  key={service.id}
                  name={attrs.name ?? attrs.title ?? "Service"}
                  description={attrs.description ?? attrs.summary ?? ""}
                  icon={iconUrl}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {tms.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Testimonials</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {tms.map((t: any) => {
              const at = t.attributes ?? t;
              const avatar = at.avatar?.data?.attributes?.url
                ? at.avatar.data.attributes.url
                : at.avatar?.url;
              return (
                <TestimonialCard
                  key={t.id}
                  name={at.name ?? "Anonymous"}
                  role={at.role ?? "Client"}
                  message={<BlocksRenderer content={at.message || []} />}
                  avatar={getMediaUrl(avatar)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {hpAttrs.images?.data && hpAttrs.images.data.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {hpAttrs.images.data.map((img: any) => (
              <img
                key={img.id}
                src={getMediaUrl(img)}
                alt={img?.attributes?.name ?? "gallery"}
                className="object-cover w-full h-48 shadow rounded-xl"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
