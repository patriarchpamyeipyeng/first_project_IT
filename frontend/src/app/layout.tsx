import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Truck-View Global Enterprise",
  description: "We fix all vehicle types! Reliable and expert mechanical services.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>  
        <Footer />
      </body>
    </html>
  );
}