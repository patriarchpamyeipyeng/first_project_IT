import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchAbout, mediaURL } from "@/lib/api";

export default async function AboutPage() {
  const about = await fetchAbout();
  const data = about?.data;

  return (
    <>
      <main className="max-w-5xl p-8 mx-auto space-y-10">
        {/* Title */}
        <section>
          <h1 className="mb-4 text-4xl font-bold">
            {data?.title || "About TruckView"}
          </h1>
          <div
            className="prose prose-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          />
        </section>

        {/* Mission / Vision / Values */}
        <section className="grid gap-6 md:grid-cols-3">
          {data?.mission && (
            <div className="p-4 border rounded-lg shadow">
              <h2 className="mb-2 text-2xl font-semibold">Our Mission</h2>
              <p className="text-gray-700">{data.mission}</p>
            </div>
          )}
          {data?.vision && (
            <div className="p-4 border rounded-lg shadow">
              <h2 className="mb-2 text-2xl font-semibold">Our Vision</h2>
              <p className="text-gray-700">{data.vision}</p>
            </div>
          )}
          {data?.values && (
            <div className="p-4 border rounded-lg shadow">
              <h2 className="mb-2 text-2xl font-semibold">Our Values</h2>
              <p className="text-gray-700">{data.values}</p>
            </div>
          )}
        </section>

        {/* Team */}
        {data?.team && (
          <section>
            <h2 className="mb-4 text-3xl font-semibold">Meet Our Team</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {data.team.map((member: any) => (
                <div
                  key={member.id}
                  className="p-4 transition border rounded-lg shadow hover:shadow-lg"
                >
                  {member.photo && (
                    <img
                      src={mediaURL(member.photo.url)}
                      alt={member.name}
                      className="w-24 h-24 mx-auto mb-3 rounded-full"
                    />
                  )}
                  <h3 className="font-bold text-center">{member.name}</h3>
                  <p className="text-center text-gray-600">{member.role}</p>
                  {member.bio && (
                    <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {data?.images && (
          <section>
            <h2 className="mb-4 text-3xl font-semibold">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.images.map((img: any) => (
                <img
                  key={img.id}
                  src={mediaURL(img.url)}
                  alt={img.name}
                  className="object-cover w-full h-40 rounded-lg shadow"
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
