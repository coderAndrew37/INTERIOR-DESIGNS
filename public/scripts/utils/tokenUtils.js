import { baseUrl } from "../constants.js";
// Refresh the access token using the refresh token
export async function refreshToken() {
  try {
    console.log("🔄 Attempting to refresh token...");

    const response = await fetch(`${baseUrl}/api/users/refresh`, {
      method: "POST",
      credentials: "include", // Ensures cookies are included
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("🔄 Refresh token request sent. Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ New access token received:", data.token);
      return data.token;
    } else {
      console.error("❌ Failed to refresh token:", response.status);
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("⚠️ Error refreshing token:", error);
    return null;
  }
}

// Make an authenticated request with auto-refresh token logic
export async function makeAuthenticatedRequest(
  url,
  options,
  shouldRedirect = false
) {
  let response = await fetch(url, {
    ...options,
    credentials: "include", // Ensures cookies are sent
  });

  if (response.status === 401) {
    console.log("⚠️ Access token expired. Attempting to refresh...");

    const newToken = await refreshToken();

    if (newToken) {
      response = await fetch(url, {
        ...options,
        credentials: "include", // Re-send with new token
      });
    } else {
      console.error("❌ Session expired.");

      if (shouldRedirect) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login.html";
      }

      return null;
    }
  }

  return response;
}
