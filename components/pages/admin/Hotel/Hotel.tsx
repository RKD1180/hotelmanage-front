"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
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
import { deleteHotel, getAllHotels } from "@/services/hotelService"; // Import delete function
import PaginationComponent from "@/components/common/PaginationComponent";

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

type HotelsListProps = {
  hotels: Hotel[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
  };
};

export default function HotelPage({
  hotels: initialHotels,
  pagination: initialPagination,
}: HotelsListProps) {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState(initialPagination);
  const [modalData, setModalData] = useState<{
    title: string;
    component: React.ReactNode;
  } | null>(null);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);

  // Function to fetch hotels data
  const fetchHotels = async (page: number = pagination.currentPage) => {
    setLoading(true);
    try {
      const data = await getAllHotels(page, pagination.limit);
      setHotels(data.hotels);
      setPagination({
        currentPage: page,
        totalPages: data.totalPages,
        limit: pagination.limit,
      });
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const openAddHotelModal = () => {
    setModalData({
      title: "Add New Hotel",
      component: (
        <AddHotel fetchHotels={fetchHotels} closeModals={closeModals} />
      ),
    });
  };

  const openEditHotelModal = (hotel: Hotel) => {
    setModalData({
      title: `Edit Hotel: ${hotel.name}`,
      component: (
        <AddHotel
          hotel={hotel}
          fetchHotels={fetchHotels}
          closeModals={closeModals}
        />
      ),
    });
  };

  const closeModals = useCallback(() => {
    setModalData(null);
    setHotelToDelete(null);
  }, []);

  // Open Delete Confirmation Modal
  const openDeleteModal = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setModalData({
      title: "Confirm Delete",
      component: (
        <div>
          <p>
            Are you sure you want to delete <b>{hotel.name}</b>?
          </p>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={closeModals}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="ml-2"
              onClick={() => handleDeleteHotel(hotel._id)}
            >
              Confirm
            </Button>
          </div>
        </div>
      ),
    });
  };

  // Handle hotel deletion
  const handleDeleteHotel = async (hotelId: string) => {
    try {
      await deleteHotel(hotelId);
      setHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel._id !== hotelId)
      );
      closeModals();
    } catch (error) {
      console.error("Error deleting hotel:", error);
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
                <TableHead>ID</TableHead>
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
                  <TableCell className="font-medium">{hotel._id}</TableCell>
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.averageRating} ⭐</TableCell>
                  <TableCell className="text-right">
                    ${hotel.costPerNight}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditHotelModal(hotel)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={() => openDeleteModal(hotel)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="flex justify-between items-center mt-4">
          <PaginationComponent
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page: number) => fetchHotels(page)}
          />
        </div>
      </div>

      {modalData && (
        <Modal
          isOpen={!!modalData}
          closeModal={closeModals}
          title={modalData.title}
          dialogClass="w-[50%]"
        >
          {modalData.component}
        </Modal>
      )}
    </Suspense>
  );
}
