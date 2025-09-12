// lib/api.ts

export async function fetchHomepage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Failed to fetch homepage: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(err);
    return { data: null }; // fallback if fetch fails
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services?populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Failed to fetch services: ${res.status}`);
    const json = await res.json();
    return { data: json.data || [] }; // always return array
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
}
export async function fetchTestimonials() {
  const res = await fetch("http://localhost:1337/api/testimonials?populate=*");
  const data = await res.json();
  return data.data;
}

// ...existing code...
export async function fetchContactInfo() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-info?populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Failed to fetch contact info: ${res.status}`);
    return res.json(); // single type returns an object
  } catch (err) {
    console.error(err);
    return { data: null };
  }
}
// ...existing code...

// helper for images
export function mediaURL(path?: string) {
  if (!path) return "";
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${path}`;
}
// Fetch about page data
export async function fetchAbout() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about?populate[team][populate]=photo&populate=images`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Failed to fetch about: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(err);
    return { data: null };
  }
}
// Fetch bookings data
export async function fetchBookings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings?populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.status}`);
    const json = await res.json();
    return { data: json.data || [] };
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
}

export async function createBooking(bookingData: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: bookingData }),
      }
    );
    if (!res.ok) throw new Error(`Failed to create booking: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}