"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";
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

export default function Home() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector((state) => state.data);
  const [isToken, setIsToken] = useState("");

  useEffect(() => {
    async function isTokenInCookies() {
      const oldToken = await fetch("/api/get-existing-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      oldToken.json().then((data) => {
        setIsToken(data.token);
      });
    }

    isTokenInCookies();
  }, []);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" richColors />
      <div className="px-3 lg:px-6 py-4 flex flex-col gap-3 lg:gap-4">
        <ShipmentProfile />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <From />
            <To />
          </div>
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <PackageShipmentDetails />
            <SetPickup />
          </div>
          <div>
            <OtherOptionRate />
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
    </>
  );
}
