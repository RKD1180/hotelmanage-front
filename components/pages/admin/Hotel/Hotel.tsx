"use client";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/Modal";
import AddHotel from "./AddHotel";
import { getAllHotels } from "@/services/hotelService"; // Import your service

export type Hotel = {
  _id: string;
  name: string;
  address: string;
  costPerNight: number;
  availableRooms: number;
  image: string;
  averageRating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export default function HotelPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });
  const [modalData, setModalData] = useState<{
    title: string;
    component: React.ReactNode;
  } | null>(null);

  // Function to fetch hotels data
  const fetchHotels = async (page: number = pagination.currentPage) => {
    setLoading(true);
    try {
      const data = await getAllHotels(page, pagination.limit);
      setHotels(data.hotels);
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: data.totalPages,
        currentPage: page, // Ensure currentPage is updated correctly
      }));
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotels when the component mounts
  useEffect(() => {
    fetchHotels();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle opening the "Add Hotel" modal
  const openAddHotelModal = () => {
    setModalData({
      title: "Add New Hotel",
      component: <AddHotel fetchHotels={fetchHotels} />,
    });
  };

  // Handle pagination changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchHotels(page); // Fetch hotels for the selected page
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Hotels</h1>
          <Button onClick={openAddHotelModal}>Add Hotel</Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableCaption>A list of available hotels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead className="w-[200px]">Hotel Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Price/Night</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotels.map((hotel, idx) => (
                <TableRow key={hotel._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.averageRating} ⭐</TableCell>
                  <TableCell className="text-right">
                    ${hotel.costPerNight}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="ml-2">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={pagination.currentPage <= 1}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          >
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            disabled={pagination.currentPage >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {modalData && (
        <Modal
          isOpen={!!modalData}
          closeModal={() => setModalData(null)}
          title={modalData.title}
          dialogClass="w-[50%]"
        >
          {modalData.component}
        </Modal>
      )}
    </Suspense>
  );
}
