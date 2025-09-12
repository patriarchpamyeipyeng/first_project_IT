import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { fetchHomepage, fetchServices, mediaURL, fetchTestimonials } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function HomePage() {
  const homepage = await fetchHomepage();
  const services = await fetchServices();
  const testimonials = await fetchTestimonials();

  const hp = homepage?.data;
  const svc = services?.data || [];

  return (
    <main className="max-w-6xl p-8 mx-auto">
      {/* Hero Section */}
      <Hero
        title={hp?.title || "Truck-View Global Enterprise"}
        description={
          hp?.description ||
          "We fix all vehicle types! Reliable and quick service."
        }
        image={hp?.heroImage?.url ? mediaURL(hp.heroImage.url) : undefined}
      />

      {/* About Section */}
      {hp?.about && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">About Us</h2>
          <div className="mx-auto text-lg prose text-gray-700">
            <BlocksRenderer content={hp.about} />
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="mt-16">
        <h2 className="mb-6 text-3xl font-bold text-center">Our Services</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {svc.map((service: any) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              description={service.description}
              icon={
                service.icon?.url ? mediaURL(service.icon.url) : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* ✅ Testimonials Section (Strapi content) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials?.data?.map((t: any) => (
              <div key={t.id} className="p-6 bg-white shadow rounded-xl">
                {/* Avatar */}
                {t.avatar?.url && (
                  <img
                    src={`http://localhost:1337${t.avatar.url}`}
                    alt={t.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-full"
                  />
                )}

                {/* Message */}
                <p className="italic text-gray-600">
                  {t.message?.map((block: any) =>
                    block.children?.map((child: any) => child.text).join("")
                  ).join(" ")}
                </p>

                {/* Name & Role */}
                <h4 className="mt-4 font-semibold text-gray-900">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {hp?.images && hp.images.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {hp.images.map((img: any) => (
              <img
                key={img.id}
                src={mediaURL(img.url)}
                alt={img.name}
                className="object-cover w-full h-48 shadow rounded-xl"
              />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Section (ready for Strapi later)
      {hp?.testimonials && hp.testimonials.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Testimonials</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {hp.testimonials.map((t: any) => (
              <div
                key={t.id}
                className="p-6 bg-gray-100 shadow-sm rounded-xl"
              >
                <p className="text-lg italic text-gray-700">“{t.quote}”</p>
                <p className="mt-4 font-semibold text-gray-900">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </section>
      )} */}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2348036798700?text=Hello%20TruckView!%20I%20want%20to%20book%20a%20service."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed p-4 text-white transition bg-green-500 rounded-full shadow-lg bottom-5 right-5 hover:bg-green-600"
      >
        💬 WhatsApp
      </a>

      {/* Call-to-Action Section */}
      <section className="p-10 mt-20 text-center text-white bg-blue-600 rounded-2xl">
        <h2 className="text-2xl font-semibold">Need Immediate Assistance?</h2>
        <p className="mt-2">
          Call us now:{" "}
          <a href="tel:08036798700" className="underline">
            08036798700
          </a>
        </p>
        <p className="mt-2">or WhatsApp us directly for quick booking.</p>
      </section>
    </main>
  );
}
