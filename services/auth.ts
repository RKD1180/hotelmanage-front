import { axiosInstance } from "@/lib/axiosInstance";


// **Login Function: Authenticate User & Store Token in Cookies**
import Cookies from "js-cookie";

export async function login(username: string, password: string) {
    try {
        const response = await axiosInstance.post("/auth/login", { username, password });

        if (response.status === 200 && response.data.user) {
            const { accessToken, refreshToken } = response.data.user;

            // Set tokens in cookies
            Cookies.set("accessToken", accessToken, { expires: 1, secure: true, sameSite: "Strict" });
            Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true, sameSite: "Strict" });
            localStorage.setItem("user", JSON.stringify(response.data.user));
            return { success: true, message: "Login successful" };
        } else {
            return { success: false, message: "Invalid credentials" };
        }
    } catch (error: any) {
        console.log("Login error:", error);
        return error?.response?.data
    }
}


export async function signup(name: string, username: string, password: string, email: string) {
    try {
        const response = await axiosInstance.post("/auth/register", { name, username, password, email });

        if (response.status === 201 && response.data.user) {

            return { success: true, message: "Signup successful" };
        } else {
            return { success: false, message: "Failed to create account" };
        }
    } catch (error: any) {
        console.log("Signup error:", error);
        return error?.response?.data;
    }
}

// Get all users with pagination
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`/auth/users`);
        return response.data;
    } catch (error: any) {
        console.log("Error fetching hotels:", error);
        return error.response?.data || error.message;
    }
};

// **Logout Function: Clears Session & Cookies**
export const logout = async () => {
    try {
        await axiosInstance.post("/auth/logout");
        window.location.href = "/login"; // Redirect to login after logout
    } catch (error) {
        console.error("Logout failed", error);
    }
};

// **Check Authentication Status (Using Cookies)**
export const checkAuth = async () => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data; // Returns user data if authenticated
    } catch (error) {
        return null; // User is not authenticated
    }
};
