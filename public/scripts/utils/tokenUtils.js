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
export async function makeAuthenticatedRequest(url, options) {
  let response = await fetch(url, {
    ...options,
    credentials: "include", // Include cookies for authentication
  });

  if (response.status === 401) {
    console.log("Access token expired. Attempting to refresh...");
    const newToken = await refreshToken();

    if (newToken) {
      // Retry the original request with the new token
      response = await fetch(url, {
        ...options,
        credentials: "include", // Include cookies
      });
    } else {
      console.error("Failed to refresh token. Redirecting to login...");
      window.location.href = "/login.html";
    }
  }

  return response;
}
