"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/FormComponents/FormWrapper";
import FormInput from "@/components/FormComponents/FormInput";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { createHotel } from "@/services/hotelService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Hotel name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  costPerNight: z.number().min(1, {
    message: "Cost per night must be greater than 0.",
  }),
  availableRooms: z.number().min(1, {
    message: "Available rooms must be at least 1.",
  }),
  image: z.string({
    message: "Please provide a valid image URL.",
  }),
  averageRating: z.number().min(0).max(5, {
    message: "Average rating must be between 0 and 5.",
  }),
});

interface Props {
  fetchHotels: () => void;
}

const AddHotel = ({ fetchHotels }: Props) => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    _id: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      costPerNight: 0,
      availableRooms: 0,
      image: "",
      averageRating: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: any = await createHotel({
        ...values,
        userId: user?._id || "",
      });

      if (response.status === 200) {
        showSuccessToast("Hotel added successfully!");
        fetchHotels(); 
        // Redirect to a different page or show success message
      } else {
        showErrorToast(response.error?.message || "Failed to add hotel");
        console.log("Failed to add hotel:", response);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  // Fetch user info from cookies
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full m-2 p-6 bg-white rounded-2xl shadow-lg">
        <FormWrapper methods={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-12 gap-2 space-y-2">
            <div className="col-span-12">
              <FormInput
                name="name"
                label="Hotel Name"
                placeholder="Hotel Name"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="address"
                label="Address"
                placeholder="Hotel Address"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="costPerNight"
                label="Cost per Night"
                placeholder="Cost per Night"
                type="number"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="availableRooms"
                label="Available Rooms"
                placeholder="Available Rooms"
                type="number"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="image"
                label="Hotel Image URL"
                placeholder="Image URL"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="averageRating"
                label="Average Rating"
                placeholder="Average Rating (0-5)"
                type="number"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            <div className="col-span-12">
              <Button className="w-full bg-[#3088c3] hover:bg-[#1c5a9a] text-white">
                Add Hotel
              </Button>
            </div>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddHotel;
