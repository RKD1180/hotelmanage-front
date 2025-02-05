"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/FormComponents/FormWrapper";
import FormInput from "@/components/FormComponents/FormInput";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Signup Data:", values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 my-4">
          Sign Up
        </h2>
        <FormWrapper methods={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-12 gap-2 space-y-2">
            <div className="col-span-12">
              <FormInput
                name="username"
                label="Username"
                placeholder="Username"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="col-span-12">
              <FormInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="col-span-12">
              <Button className="w-full bg-[#3088c3] hover:bg-[#1c5a9a] text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </FormWrapper>
        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#3088c3] font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
