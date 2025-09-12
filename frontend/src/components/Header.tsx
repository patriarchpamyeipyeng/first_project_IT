
export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 mb-8">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4 md:flex-nowrap">
        <h1 className="font-bold text-xl">Truck-View Global Enterprise</h1>
        <nav className="flex flex-1 justify-end gap-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/booking" className="hover:underline">Booking</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}

