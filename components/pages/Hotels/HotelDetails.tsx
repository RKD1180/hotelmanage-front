"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHotelById } from "@/services/hotelService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type HotelDetailsProps = {
  hotelId: string;
};

const HotelDetails = ({ hotelId }: HotelDetailsProps) => {
  const router = useRouter();
  const [hotel, setHotel] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const data = await getHotelById(hotelId);
        setHotel(data?.hotel);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading)
    return <div className="text-center py-8">Loading hotel details...</div>;

  if (!hotel) return <div className="text-center py-8">Hotel not found</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-900">{hotel.name}</h1>
        <p className="text-gray-600 text-xl">{hotel.address}</p>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <p className="text-yellow-500 font-bold text-xl">
            {hotel.averageRating} ⭐
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4 w-full">
        {/* Hotel Image and Details */}
        <Card className="shadow-xl w-1/2 ">
          <CardHeader className="p-0">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Hotel Details
            </h2>
            <p className="text-gray-700">{hotel.description}</p>
            <p className="text-lg font-bold text-gray-900">
              Cost per Night:{" "}
              <span className="text-blue-600">${hotel.costPerNight}</span>
            </p>
            <p className="text-md text-gray-600">
              Available Rooms: {hotel.availableRooms}
            </p>
          </CardContent>

          {/* Book Now Button inside the Card */}
          <div className="flex justify-center items-center mt-4 mb-6">
            <Button
              variant="default"
              className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all duration-300 ease-in-out"
            >
              Book Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Back Button */}
      <div className="text-center my-4">
        <Button
          variant="outline"
          onClick={() => router.push("/hotels")}
          className="px-6 py-3 text-lg font-semibold text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
        >
          Back to Hotels
        </Button>
      </div>
    </div>
  );
};

export default HotelDetails;
