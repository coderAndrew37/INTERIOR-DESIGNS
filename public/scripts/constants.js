export const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000" // Local environment
    : "https://interiors-by-tiffi.vercel.app"; // Production environment
