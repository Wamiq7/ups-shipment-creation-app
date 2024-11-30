"use client";

import { Toaster } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { updateDataState } from "@/redux/dataSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import From from "@/components/shipment/From";
import Navbar from "@/components/Navbar";
import To from "@/components/shipment/To";
import SetPickup from "@/components/shipment/SetPickup";
import OtherOptionRate from "@/components/shipment/OtherOptionRate";
import ShipmentProfile from "@/components/shipment/ShipmentProfile";
import PackageShipmentDetails from "@/components/shipment/PackageShipmentDetails";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector((state) => state.data);
  const [isToken, setIsToken] = useState("");
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");

  // Refs for each section
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const shippingServiceRef = useRef<HTMLDivElement>(null);
  const additionalOptionsRef = useRef<HTMLDivElement>(null);
  const paymentsRef = useRef<HTMLDivElement>(null);

  // State to track the highlighted section
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function isTokenInCookies() {
      try {
        const response = await fetch("/api/get-existing-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setIsToken(data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    isTokenInCookies();
  }, []);

  useEffect(() => {
    if (edit) {
      // Scroll to the relevant section
      switch (edit) {
        case "from":
          fromRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case "to":
          toRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case "package":
          packageRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case "shippingService":
          shippingServiceRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case "additionalOptions":
          additionalOptionsRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case "payments":
          paymentsRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        default:
          break;
      }

      // Set the highlighted section
      setHighlightedSection(edit);

      // Remove the highlight after 2 seconds
      const timer = setTimeout(() => {
        setHighlightedSection(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [edit]);

  return (
    <>
      <Navbar />
      <div className="px-3 lg:px-6 py-4 flex flex-col gap-3 lg:gap-4">
        <ShipmentProfile />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            {/* Ship From Section */}
            <div
              ref={fromRef}
              className={`transition-all duration-500 ${
                highlightedSection === "from"
                  ? "ring-4 ring-amber-400 animate-pulse rounded-xl"
                  : ""
              }`}
            >
              <From />
            </div>
            {/* Ship To Section */}
            <div
              ref={toRef}
              className={`transition-all duration-500 ${
                highlightedSection === "to"
                  ? "ring-4 ring-amber-400 animate-pulse rounded-xl"
                  : ""
              }`}
            >
              <To />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 space-y-4">
            {/* Package Information Section */}
            <div
              ref={packageRef}
              className={`transition-all duration-500 ${
                highlightedSection === "package"
                  ? "ring-4 ring-amber-400 animate-pulse rounded-xl"
                  : ""
              }`}
            >
              <PackageShipmentDetails />
            </div>
            {/* Shipping Service Section */}
            <div
              ref={shippingServiceRef}
              className={`transition-all duration-500 ${
                highlightedSection === "shippingService"
                  ? "ring-4 ring-amber-400 animate-pulse rounded-xl"
                  : ""
              }`}
            >
              <SetPickup />
            </div>
          </div>
          <div>
            {/* Additional Options Section */}
            <div
              ref={additionalOptionsRef}
              className={`transition-all duration-500 ${
                highlightedSection === "additionalOptions"
                  ? "ring-4 ring-amber-400 animate-pulse rounded-xl"
                  : ""
              }`}
            >
              <OtherOptionRate />
            </div>
            {/* Payments Section */}
            <div
              ref={paymentsRef}
              className={`transition-all duration-500 ${
                highlightedSection === "payments"
                  ? "ring-4 ring-amber-400 animate-pulse rounded-xl"
                  : ""
              }`}
            >
              <div className="space-y-4 mt-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-shipmentProfile"
                    checked={shipmentData.shipmentProfile.edit}
                    onCheckedChange={(checked) => {
                      dispatch(
                        updateDataState({
                          path: ["shipmentProfile"],
                          updates: {
                            edit: checked,
                            add: false,
                          },
                        })
                      );
                    }}
                  />
                  <label
                    htmlFor="edit-shipmentProfile"
                    className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Update Existing Shipment Profile
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="add-shipmentProfile"
                    checked={shipmentData.shipmentProfile.add}
                    onCheckedChange={(checked) => {
                      dispatch(
                        updateDataState({
                          path: ["shipmentProfile"],
                          updates: {
                            add: checked,
                            edit: false,
                          },
                        })
                      );
                    }}
                  />
                  <label
                    htmlFor="add-shipmentProfile"
                    className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save as New Shipment Profile
                  </label>
                </div>
                <Input
                  type="text"
                  placeholder="Enter shipment profile name"
                  className="bg-white"
                  value={shipmentData.shipmentProfile.name}
                  onChange={(e) => {
                    dispatch(
                      updateDataState({
                        path: ["shipmentProfile"],
                        updates: {
                          name: e.target.value,
                        },
                      })
                    );
                  }}
                />
                <div className="py-4 w-full">
                  <Link
                    href={"/review"}
                    className="block text-center border border-black text-gray-700 bg-c-orange text-2xl lg:text-3xl font-semibold px-5 py-4 w-full rounded-lg"
                  >
                    Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
