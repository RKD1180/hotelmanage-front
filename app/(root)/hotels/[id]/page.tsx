"use client";

import HotelDetails from "@/components/pages/Hotels/HotelDetails";
import { Suspense } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center">Hotel not found. Please try again.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading hotel details...</div>}>
      <HotelDetails hotelId={id as string} />
    </Suspense>
  );
}
