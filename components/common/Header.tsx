"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">MyHotelApp</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300"
                >
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/hotels" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300"
                >
                  Hotels
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300"
                >
                  About
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300"
                >
                  Contact
                </Button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Side Buttons (Login & Signup) */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login">
            <Button
              variant="default"
              className="text-white hover:text-gray-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              Signup
            </Button>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white py-4">
          <ul className="space-y-4 px-4">
            <li>
              <Link href="/" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300 w-full"
                >
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/hotels" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300 w-full"
                >
                  Hotels
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300 w-full"
                >
                  About
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <Button
                  variant="link"
                  className="text-white hover:text-gray-300 w-full"
                >
                  Contact
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/login" passHref>
                <Button
                  variant="default"
                  className="text-white hover:text-gray-300 w-full"
                >
                  Login
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/signup" passHref>
                <Button
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-400 text-white w-full"
                >
                  Signup
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
