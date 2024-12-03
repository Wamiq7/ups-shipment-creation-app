"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/actions";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await deleteCookie();
    setIsLoggedIn(false);
    router.push("/login");
  };

  const isActive = (path: string) => {
    return pathname === path
      ? "text-gray-800 bg-white hover:bg-gray-200"
      : "text-white";
  };

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
        <Link
          href="/"
          className="flex-shrink-0 flex items-center ml-2 text-xl font-bold text-white"
        >
          UPS Shipment
        </Link>
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className={isActive("/")}>
              <Link href={"/"} aria-current="page">
                Shipping
              </Link>
            </Button>
            <Button asChild variant="ghost" className={isActive("/tracking")}>
              <Link href={"/tracking"} aria-current="page">
                Tracking
              </Link>
            </Button>
            <LogOut
              className="cursor-pointer text-red-500"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
