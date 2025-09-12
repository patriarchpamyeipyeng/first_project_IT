import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchContactInfo } from "@/lib/api";

export default async function ContactPage() {
  const contactInfo = await fetchContactInfo();
  const contact = contactInfo?.data;

  return (
    <>

      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        {contact ? (
          <div className="space-y-2">
            <p>Email: {contact.email || "Email not provided"}</p>
            <p>Phone: {contact.phone || "Phone not provided"}</p>
            <p>Address: {contact.address || "Address not provided"}</p>
          </div>
        ) : (
          <p>No contact info available.</p>
        )}
      </main>

    </>
  );
}