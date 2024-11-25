"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isToken, setIsToken] = useState("");

  // useEffect(() => {
  //   async function isTokenInCookies() {
  //     const oldToken = await fetch("/api/get-existing-token", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     oldToken.json().then((data) => {
  //       setIsToken(data.token);
  //     });
  //   }

  //   isTokenInCookies();
  // }, []);

  // async function getToken() {
  //   try {
  //     const response = await fetch("/api/auth/getToken", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setIsToken(data.token);
  //     window.location.reload();
  //   } catch (error: any) {
  //     console.error("Error fetching token:", error?.message);
  //   }
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-white">
                UPS Shipment
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button asChild variant="ghost" className="text-white">
                  <Link href={"/"} aria-current="page">
                    Shipping
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="text-white">
                  <Link href={"/tracking"} aria-current="page">
                    Tracking
                  </Link>
                </Button>
                <Button
                  variant="default"
                  className="text-gray-800 bg-white hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
