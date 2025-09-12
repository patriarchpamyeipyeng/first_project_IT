export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-white border-t">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-gray-600">© {year} TruckView. All rights reserved.</p>
      </div>
    </footer>
  );
}