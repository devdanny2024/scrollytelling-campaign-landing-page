// Backend API on the campaign VPS, and the Paystack public key (safe to expose).
export const API_BASE = "https://kayodework.vps.webdock.cloud/ikeh/api";
export const PAYSTACK_PUBLIC_KEY = "pk_live_325eef92c02b152d1c133b5f76d9dccf4c21b5f5";

// Smooth-scroll to a section by id (used by CTA buttons).
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
