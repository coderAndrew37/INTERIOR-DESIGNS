import { baseUrl } from "../constants.js";
// Refresh the access token using the refresh token
export async function refreshToken() {
  try {
    const response = await fetch(`${baseUrl}/api/users/refresh`, {
      method: "POST",
      credentials: "include", // Include cookies
    });

    if (response.ok) {
      const data = await response.json();
      console.log("New access token received:", data.token);
      return data.token;
    } else {
      console.error("Failed to refresh token:", response.status);
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
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
    credentials: "include",
  });

  if (response.status === 401) {
    console.log("Access token expired. Attempting to refresh...");
    const newToken = await refreshToken();

    if (newToken) {
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });
    } else {
      console.error("Session expired.");

      // 🚀 Only redirect if explicitly requested (e.g., in cart actions)
      if (shouldRedirect) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login.html";
      }

      return null;
    }
  }

  return response;
}
