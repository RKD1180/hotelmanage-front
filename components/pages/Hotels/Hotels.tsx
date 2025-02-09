"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/common/PaginationComponent";
import { Hotel } from "../admin/Hotel/Hotel";
import { getAllHotels, searchHotels } from "@/services/hotelService";
import Modal from "@/components/common/Modal";
import HotelDetails from "./HotelDetails";
import { Input } from "@/components/ui/input";

type HotelsListProps = {
  hotels: Hotel[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
  };
};

export default function HotelsList({
  hotels: initialHotels,
  pagination: initialPagination,
}: HotelsListProps) {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [modalData, setModalData] = useState<{
    title: string;
    component: React.ReactNode;
  } | null>(null);

  // Use the useDebouncedValue hook for debouncing the search query
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // 500ms debounce time

  // Fetch hotels on page change
  const fetchHotels = async (page: number) => {
    setLoading(true);
    try {
      const data = await getAllHotels(page, pagination.limit);
      setHotels(data.hotels);
      setPagination({
        ...pagination,
        totalPages: data.totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      // Reset to initial hotels if search is cleared
      setHotels(initialHotels);
      return;
    }
    setLoading(true);
    try {
      const data = await searchHotels(query);
      setHotels(data.hotels);
    } catch (error) {
      console.error("Error searching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger the search when the debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery);
    } else {
      setHotels(initialHotels); // Reset to initial hotels if query is empty
    }
  }, [debouncedSearchQuery, initialHotels]);

  const openModal = (hotel: Hotel) => {
    setModalData({
      title: hotel.name,
      component: <HotelDetails hotelId={hotel._id} />,
    });
    window.history.pushState(null, "", `/hotels/${hotel._id}`);
  };

  const closeModal = () => {
    window.history.pushState(null, "", "/hotels");
    setModalData(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Explore Our Hotels
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <Input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Directly update search query
          className="w-full max-w-md"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading hotels...</p>
      ) : (
        <>
          {/* Hotel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotels?.map((hotel) => (
              <Card key={hotel._id} className="shadow-lg">
                <CardHeader className="p-0">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">{hotel.name}</h2>
                  <p className="text-gray-500">{hotel.address}</p>
                  <p className="text-yellow-500 font-bold mt-2">
                    {hotel.averageRating} ⭐
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <p className="text-lg font-bold">
                    ${hotel.costPerNight}/night
                  </p>
                  <Button onClick={() => openModal(hotel)} variant="default">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {!searchQuery && (
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={fetchHotels}
            />
          )}
        </>
      )}

      {modalData && (
        <Modal
          isOpen={!!modalData}
          closeModal={closeModal}
          title={modalData.title}
        >
          {modalData.component}
        </Modal>
      )}
    </div>
  );
}
