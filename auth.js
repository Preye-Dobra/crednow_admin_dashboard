// src/auth.js
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

export function isLoggedIn() {
  const token = Cookies.get("authToken");
  if (!token) {
    return false; // No token, not logged in
  }

  // Check if the token is expired
  const isExpired = isTokenExpired(token);
  return !isExpired; // Token exists and is not expired
}

export function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token is expired, remove it from the cookie
      Cookies.remove("authToken");
      return true;
    } else {
      // Token is not expired
      return false;
    }
  } catch (error) {
    // Token is invalid (not a valid JWT), remove it
    Cookies.remove("authToken");
    return true;
  }
}
export async function fetchDataWithToken(url, options = {}) {
  const token = Cookies.get("authToken");

  const headers = {
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      // Token is invalid (expired or unauthorized)
      Cookies.remove("authToken");
      window.location.href = "/auth/signin"; // Redirect to login
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json(); // Assuming the backend returns an error message
      return errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle other errors (network, etc.)
    return { message: "Network Error" };
  }
}
