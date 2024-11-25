"use client";

import axios from "axios";
import BasicSelect from "../BasicSelect";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { CreateShipmentProfile } from "../CreateShipmentProfile";
import { useEffect, useState } from "react";

export default function ShipmentProfile({ rating }: { rating: any }) {
  const [shipmentProfiles, setShipmentProfiles] = useState<any[]>([]);
  const [selectedShipmentProfileId, setSelectedShipmentProfileId] =
    useState("");
  const [selectedShipmentProfile, setSelectedShipmentProfile] = useState("");

  // Fetch shipment profiles from API
  const getShipmentProfiles = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get("/api/shipment-profile", config);
      setShipmentProfiles(response.data.data);
    } catch (error) {
      console.error("Error creating address book entry:", error);
    }
  };

  // Load localStorage data after the component mounts
  useEffect(() => {
    const savedProfileId =
      localStorage.getItem("selectedShipmentProfileId") || "";
    const savedProfile = localStorage.getItem("selectedShipmentProfile") || "";

    setSelectedShipmentProfileId(savedProfileId);
    setSelectedShipmentProfile(savedProfile);
  }, []);

  useEffect(() => {
    getShipmentProfiles();
  }, []);

  const formattedProfiles = shipmentProfiles?.map((profile: any) => ({
    value: profile.name,
    label: profile.name,
  }));

  // Update localStorage whenever selectedShipmentProfile changes
  useEffect(() => {
    if (selectedShipmentProfile) {
      const selectedProfileId = shipmentProfiles.find(
        (profile: any) => profile.name === selectedShipmentProfile
      )?._id;

      localStorage.setItem(
        "selectedShipmentProfileId",
        selectedProfileId || ""
      );
      localStorage.setItem("selectedShipmentProfile", selectedShipmentProfile);
    }
  }, [selectedShipmentProfile, shipmentProfiles]);

  // Update localStorage whenever selectedShipmentProfileId changes
  useEffect(() => {
    if (selectedShipmentProfileId) {
      localStorage.setItem(
        "selectedShipmentProfileId",
        selectedShipmentProfileId
      );
    }
  }, [selectedShipmentProfileId]);

  return (
    <Card>
      <CardContent className="p-3 lg:px-6 flex gap-2 items-center lg:pt-6">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <CardTitle className="flex flex-col lg:flex-row lg:items-center gap-2">
              Shipment Profile
              <CardDescription className="italic font-normal text-[12px] lg:text-sm">
                * My shipment profile (formerly Fast Ship)
              </CardDescription>
            </CardTitle>
            <CreateShipmentProfile />
          </div>
          <BasicSelect
            options={formattedProfiles}
            placeholder="Select Shipment Profile"
            value={selectedShipmentProfile}
            onChange={(value: any) => setSelectedShipmentProfile(value)}
          />
        </div>
        <div className="bg-c-orange px-2 items-center text-white border flex gap-2 border-black rounded-md max-w-fit">
          <p className="text-[14px] lg:text-[24px] font-bold">Rates:</p>
          <h1 className="text-[20px] lg:text-[64px]">{`$${
            rating?.RatedShipment?.TotalCharges?.MonetaryValue || 0
          }`}</h1>
        </div>
      </CardContent>
    </Card>
  );
}
