import Link from "next/link";

export default function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Booking" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold">TruckView</Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-blue-600">{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}