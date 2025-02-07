import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // Set API base URL

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Ensures cookies (including tokens) are sent with requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to get the token from cookies
const getToken = () => {
    if (typeof window !== "undefined") {
        return Cookies.get("accessToken"); // Get token from cookies
    }
    return null;
};

// Function to set the token as Authorization header (Bearer token)
const setToken = (config: any) => {
    const token = getToken();
    if (token) {
        // Make sure token is set in the Authorization header
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

// Add request interceptor to set token before each request
axiosInstance.interceptors.request.use(
    setToken,
    (error) => {
        console.error("Error setting token:", error);
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// Function to subscribe to new token refresh
const subscribeTokenRefresh = (cb: () => void) => {
    refreshSubscribers.push(cb);
};

// Function to notify all subscribers to retry requests
const onRefreshed = () => {
    refreshSubscribers.forEach((cb) => cb());
    refreshSubscribers = [];
};

// **Response Interceptor: Handle Unauthorized Errors & Refresh Token**
axiosInstance.interceptors.response.use(
    (response) => response, // Pass successful responses through
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh(() => resolve(axiosInstance(originalRequest)));
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call the refresh endpoint (cookies will be sent automatically)
                const refreshResponse = await axiosInstance.get("/api/auth/refresh");

                // Assuming the new token is returned in the response body
                const newAccessToken = refreshResponse.data.accessToken;

                // Set the new access token in cookies
                Cookies.set("accessToken", newAccessToken, { expires: 1, secure: true, sameSite: "Strict" });

                isRefreshing = false;
                onRefreshed();

                return axiosInstance(originalRequest); // Retry failed request with the new token
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                isRefreshing = false;
                window.location.href = "/login"; // Redirect to login if refresh fails
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
