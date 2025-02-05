import Login from "@/components/pages/Login/Login";
import Image from "next/image";
import { Suspense } from "react";
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

export type Hotel = {
  id: number;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
};

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "New York, USA",
    rating: 4.5,
    pricePerNight: 120,
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Malibu, USA",
    rating: 4.7,
    pricePerNight: 200,
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Denver, USA",
    rating: 4.2,
    pricePerNight: 90,
  },
  {
    id: 4,
    name: "Royal Heritage",
    location: "London, UK",
    rating: 4.8,
    pricePerNight: 250,
  },
  {
    id: 5,
    name: "Skyline Tower Hotel",
    location: "Dubai, UAE",
    rating: 5.0,
    pricePerNight: 300,
  },
];

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Manage Hotels</h1>
        <Table>
          <TableCaption>A list of available hotels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Hotel Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Price/Night</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium">{hotel.name}</TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>{hotel.rating} ⭐</TableCell>
                <TableCell className="text-right">
                  ${hotel.pricePerNight}
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
      </div>
    </Suspense>
  );
}
