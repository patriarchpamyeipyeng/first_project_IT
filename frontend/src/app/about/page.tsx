import { fetchAbout, mediaURL } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function AboutPage() {
  const about = await fetchAbout();
  const attrs = about?.data?.attributes || {};

  return (
    <main className="max-w-5xl p-8 mx-auto space-y-10">
      {/* ...rest of your code unchanged... */}
    </main>
  );
}