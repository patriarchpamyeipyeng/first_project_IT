import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { fetchHomepage, fetchServices, fetchTestimonials, mediaURL } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
// import ServiceModal from "@/components/ServiceModal";
// import ServiceSection from "@/components/ServiceSection";

// Helper for media URLs
function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return mediaURL(media);
  if (media?.data?.attributes?.url) return mediaURL(media.data.attributes.url);
  if (media?.attributes?.url) return mediaURL(media.attributes.url);
  if (media?.url) return mediaURL(media.url);
  return undefined;
}
const homepageRes = await fetchHomepage();
console.log("Homepage API response:", homepageRes);
export default async function HomePage() {
  const [homepageRes, servicesRes, testimonialsRes] = await Promise.all([
    fetchHomepage(),
    fetchServices(),
    fetchTestimonials(),
  ]);

  const hpAttrs = homepageRes?.data?.attributes ?? {};
  const svc = servicesRes?.data ?? [];
  const tms = testimonialsRes?.data ?? [];

  return (
    <main className="max-w-6xl p-8 mx-auto">
      {/* Hero Section */}
  <section className="relative h-[500px] flex items-center justify-center text-center bg-gray-900 text-white">
{hpAttrs.heroImage?.url && (
  <img
    src={mediaURL(hpAttrs.heroImage.url)}
    alt="Hero"
    className="absolute inset-0 object-cover w-full h-full opacity-60"
  />
)}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold">{hpAttrs.title}</h1>
          <p className="mt-4 text-lg">{hpAttrs.description}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {hpAttrs.button?.map((btn: any) => (
              <a
                key={btn.id}
                href={btn.url}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  btn.variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-blue-600 border hover:bg-gray-100"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (from homepage only) */}
      {hpAttrs.about && (
        <section className="max-w-5xl px-6 py-16 mx-auto">
          <h2 className="mb-6 text-3xl font-bold">About Us</h2>
          <div className="mb-6">
            <BlocksRenderer content={hpAttrs.about} />
          </div>
        </section>
      )}

      {/* SERVICES */}
      {/* SERVICES */}
{svc.length > 0 && (
  <section className="mt-16">
    <h2 className="mb-6 text-3xl font-bold text-center">Our Services</h2>
    {/* <ServiceSection services={svc} /> */}
  </section>
)}

      {/* QUICK STATS */}
      <section className="py-12 mt-16 text-white bg-blue-700">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <p className="text-3xl font-bold">10+</p>
            <p>Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p>Vehicles Repaired</p>
          </div>
          <div>
            <p className="text-3xl font-bold">100%</p>
            <p>Customer Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p>Support</p>
          </div>
        </div>
      </section>

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
{hpAttrs.images && hpAttrs.images.length > 0 && (
  <section className="mt-16">
    <h2 className="mb-6 text-3xl font-bold text-center">Gallery</h2>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {hpAttrs.images.map((img: any) => (
        <img
          key={img.id}
          src={mediaURL(img.url)}
          alt={img.name ?? "gallery"}
          className="object-cover w-full h-48 shadow rounded-xl"
        />
      ))}
    </div>
  </section>
)}

      {/* BRANDS */}
      <section className="py-12 mt-16 bg-gray-100">
        <h2 className="mb-6 text-3xl font-bold text-center">We Work With</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["toyota.png", "mercedes.png", "volvo.png", "nissan.png"].map(
            (logo, i) => (
              <img
                key={i}
                src={`/brands/${logo}`}
                alt="brand logo"
                className="object-contain h-12"
              />
            )
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 mt-16">
        <h2 className="mb-6 text-3xl font-bold text-center">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <details className="p-4 bg-gray-100 rounded-lg">
            <summary className="font-semibold">
              How long does a repair take?
            </summary>
            <p className="mt-2 text-gray-600">
              It depends on the service, but most repairs are completed within
              24–48 hours.
            </p>
          </details>
          <details className="p-4 bg-gray-100 rounded-lg">
            <summary className="font-semibold">
              Do you offer emergency services?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, we provide 24/7 roadside assistance for urgent breakdowns.
            </p>
          </details>
          <details className="p-4 bg-gray-100 rounded-lg">
            <summary className="font-semibold">
              What types of vehicles do you repair?
            </summary>
            <p className="mt-2 text-gray-600">
              We fix all vehicle types — trucks, cars, buses, and heavy-duty
              machines.
            </p>
          </details>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-12 mt-16 text-center text-white bg-blue-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Need Immediate Assistance?</h2>
        <p className="mt-2">Call us now or book a service online.</p>
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="tel:08036798700"
            className="px-6 py-3 font-semibold text-blue-700 bg-white rounded-lg shadow hover:bg-gray-200"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/2348036798700"
            className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
          >
            💬 WhatsApp
          </a>
        </div>
      </section>
      
    </main>
  );
}