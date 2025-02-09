import { axiosInstance } from "@/lib/axiosInstance";

export interface Hotel {
    _id?: string;
    name: string;
    address: string;
    costPerNight: number;
    availableRooms: number;
    image: string;
    averageRating?: number;
    userId: string;
}

// Create a new hotel
export const createHotel = async (hotelData: Hotel) => {
    try {
        const response = await axiosInstance.post("/hotel", hotelData);
        return response.data;
    } catch (error: any) {
        console.log("Error creating hotel:", error);
        throw error.response?.data || error.message;
    }
};

// Get a hotel by ID
export const getHotelById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/hotel/${id}`);
        return response.data;
    } catch (error: any) {
        console.log("Error fetching hotel:", error);
        throw error.response?.data || error.message;
    }
};

// Get all hotels with pagination
export const getAllHotels = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await axiosInstance.get(`/hotel`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error: any) {
        console.log("Error fetching hotels:", error);
        return error.response?.data || error.message;
    }
};

// Update a hotel
export const updateHotel = async (id: string, hotelData: Partial<Hotel>) => {
    try {
        const response = await axiosInstance.put(`/hotel/${id}`, hotelData);
        return response.data;
    } catch (error: any) {
        console.log("Error updating hotel:", error);
        return error.response?.data || error.message;
    }
};

// Delete a hotel
export const deleteHotel = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/hotel/${id}`);
        return response.data;
    } catch (error: any) {
        console.log("Error deleting hotel:", error);
        return error.response?.data || error.message;
    }
};

export const searchHotels = async (query: string) => {
    if (!query.trim()) return { error: { message: "Query cannot be empty", status: 400 } };

    try {
        const { data } = await axiosInstance.get(`/hotel/search`, { params: { query } });
        return data;
    } catch (error: any) {
        console.log("Error searching hotels:", error?.response?.data || error.message);
        return {
            error: {
                message: error.response?.data?.error?.message || "Something went wrong",
                status: error.response?.status || 500,
            },
        };
    }
};
