import { Suspense } from "react";
import HotelPage from "@/components/pages/admin/Hotel/Hotel";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HotelPage />
    </Suspense>
  );
}
