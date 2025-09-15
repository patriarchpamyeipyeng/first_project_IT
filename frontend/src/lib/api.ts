// src/lib/api.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Build absolute URL for media returned by Strapi
 */
export function mediaURL(path?: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}

/**
 * Generic request helper.
 * - returns parsed JSON (the whole response body)
 * - logs helpful info when responses are not OK
 */
async function request(endpoint: string, opts: RequestInit = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${STRAPI_URL}/api/${endpoint}`;
  const headers = {
    ...(opts.headers || {}),
    // add content-type only when body is present
  } as Record<string, string>;

  const options: RequestInit = {
    ...opts,
    headers,
    cache: "no-store",
  };

  const res = await fetch(url, options);
  const text = await res.text();
  let json: any;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }

  if (!res.ok) {
    console.error(`API ${url} failed (${res.status})`, json ?? text);
    // If Strapi returns an error object, try to surface it
    const msg = json?.error?.message || json?.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return json;
}

/* ---------- GET helpers (return full response JSON) ---------- */

/** Homepage (single type) */
export async function fetchHomepage() {
  return request("homepage?populate=*");
}

/** About (single type) */
export async function fetchAbout() {
  return request("about?populate=*");
}

/** ContactInfo (single type) */
export async function fetchContactInfo() {
  return request("contact-info?populate=*");
}

/** Services (collection) */
export async function fetchServices() {
  return request("services?populate=*");
}

/** Testimonials (collection) */
export async function fetchTestimonials() {
  return request("testimonials?populate=*");
}

/* ---------- POST helpers ---------- */

/** Generic POST to Strapi (wraps payload as { data }) */
export async function postAPI(endpoint: string, data: any) {
  return request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
}

/** Convenience wrappers */
export async function createBooking(payload: any) {
  return postAPI("bookings", payload);
}
export async function sendContact(payload: any) {
  return postAPI("contacts", payload);
}
