"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { showSuccessToast } from "@/lib/toast"; // Import toast for feedback
import Link from "next/link";

// Menu items
const items = [
  { title: "Home", url: "/admin", icon: Home },
  { title: "Users", url: "/admin/users", icon: Users },
];

export function AppSidebar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  // Fetch user info from cookies
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    setUser(null);
    showSuccessToast("Logged out successfully!");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Top Section - Navigation */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Section - User Info & Logout */}
        <div className="border-t p-4 mt-4">
          {user ? (
            <div className="flex flex-col items-center text-center">
              <User size={40} className="mb-2" />
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <button
                onClick={handleLogout}
                className="mt-3 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">Not logged in</p>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
