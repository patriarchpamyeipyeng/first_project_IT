
import { fetchAbout, mediaURL } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return mediaURL(media);
  if (media?.data?.attributes?.url) return mediaURL(media.data.attributes.url);
  if (media?.attributes?.url) return mediaURL(media.attributes.url);
  if (media?.url) return mediaURL(media.url);
  return undefined;
}

export default async function AboutPage() {
  const aboutRes = await fetchAbout();
  const about = aboutRes?.data ?? {}; // <-- no .attributes

  const team = about.team || [];
  const images = about.images || [];

  return (
    <main className="max-w-6xl p-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">
        {about.title || "About Us"}
      </h1>

      {about.description && (
        <p className="max-w-3xl mx-auto mb-12 text-lg text-center text-gray-700">
          {about.description}
        </p>
      )}

      {about.about && (
        <div className="mx-auto mb-16 prose prose-lg">
          <BlocksRenderer content={about.about} />
        </div>
      )}
console.log("ABOUT DATA:", about);

      {team.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Our Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member: any) => (
              <div key={member.id} className="flex flex-col items-center p-6 text-center transition border shadow rounded-xl hover:shadow-lg">
                {member.photo && (
                  <img
                    src={mediaURL(member.photo?.url)}
                    alt={member.name}
                    className="object-cover mb-4 rounded-full shadow w-28 h-28"
                  />
                )}
                <h3 className="text-xl font-semibold">{member.name}</h3>
                {member.role && <p className="text-sm text-gray-500">{member.role}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-center">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img: any) => (
              <img
                key={img.id}
                src={mediaURL(img.url)}
                alt={img.name || "About image"}
                className="object-cover w-full h-48 rounded-lg shadow"
              />
            ))}
          </div>
        </section>
      )}
    </main>
    
  );
}

