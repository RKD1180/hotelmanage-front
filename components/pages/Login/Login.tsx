"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/FormComponents/FormWrapper";
import FormInput from "@/components/FormComponents/FormInput";
import { login } from "@/services/auth";
import { showErrorToast } from "@/lib/toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: any = await login(values.username, values.password);

      if (response.success) {
        console.log("Login successful:", response.message);
        window.location.href = "/admin"; // Redirect to admin dashboard after login
      } else {
        showErrorToast(response.error?.messsage || "Login failed");
        console.log("Login failed:", response);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 my-4">
          Login
        </h2>
        <FormWrapper methods={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-12 gap-2 space-y-2">
            <div className="col-span-12">
              <FormInput
                name="username"
                label="User Name"
                placeholder="Username"
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
                Login
              </Button>
            </div>
          </div>
        </FormWrapper>
        <div className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#3088c3] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
