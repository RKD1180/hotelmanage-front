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
        console.error("Error creating hotel:", error);
        throw error.response?.data || error.message;
    }
};

// Get a hotel by ID
export const getHotelById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/hotel/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching hotel:", error);
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
        console.error("Error fetching hotels:", error);
        throw error.response?.data || error.message;
    }
};

// Update a hotel
export const updateHotel = async (id: string, hotelData: Partial<Hotel>) => {
    try {
        const response = await axiosInstance.put(`/hotel/${id}`, hotelData);
        return response.data;
    } catch (error: any) {
        console.error("Error updating hotel:", error);
        throw error.response?.data || error.message;
    }
};

// Delete a hotel
export const deleteHotel = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/hotels/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error deleting hotel:", error);
        throw error.response?.data || error.message;
    }
};

// Search hotels
export const searchHotels = async (query: string) => {
    try {
        const response = await axiosInstance.get(`/hotels/search`, {
            params: { query },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error searching hotels:", error);
        throw error.response?.data || error.message;
    }
};