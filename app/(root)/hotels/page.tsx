import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy hotel data
const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "New York, USA",
    rating: 4.5,
    pricePerNight: 120,
    image: "/assets/images/ho1.jpg",
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Malibu, USA",
    rating: 4.7,
    pricePerNight: 200,
    image: "/assets/images/ho1.jpg",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Denver, USA",
    rating: 4.2,
    pricePerNight: 90,
    image: "/assets/images/ho1.jpg",
  },
  {
    id: 4,
    name: "Royal Heritage",
    location: "London, UK",
    rating: 4.8,
    pricePerNight: 250,
    image: "/assets/images/ho1.jpg",
  },
  {
    id: 5,
    name: "Skyline Tower Hotel",
    location: "Dubai, UAE",
    rating: 5.0,
    pricePerNight: 300,
    image: "/assets/images/ho1.jpg",
  },
];

export default function HotelsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Explore Our Hotels
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="shadow-lg">
            <CardHeader className="p-0">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{hotel.name}</h2>
              <p className="text-gray-500">{hotel.location}</p>
              <p className="text-yellow-500 font-bold mt-2">
                {hotel.rating} ⭐
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <p className="text-lg font-bold">${hotel.pricePerNight}/night</p>
              <Button variant="default">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
