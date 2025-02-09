import HotelsList from "@/components/pages/Hotels/Hotels";
import { getAllHotels } from "@/services/hotelService";

export default async function HotelsPage() {
  const page = 1; // Default page
  const limit = 8; // Default limit

  // Fetch hotels on the server
  const data = await getAllHotels(page, limit);

  return (
    <HotelsList
      hotels={data.hotels}
      pagination={{ currentPage: page, totalPages: data.totalPages, limit }}
    />
  );
}
