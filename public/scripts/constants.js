export const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000" // Local environment
    : "https://your-vercel-deployment.vercel.app"; // Production environment