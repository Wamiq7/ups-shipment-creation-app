"use client";

import axios from "axios";
import BasicSelect from "../BasicSelect";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { CreateShipmentProfile } from "../CreateShipmentProfile";
import { useEffect, useState } from "react";

export default function ShipmentProfile() {
  const [shipmentProfiles, setShipmentProfiles] = useState([]);
  const [selectedShipmentProfile, setSelectedShipmentProfile] = useState(
    localStorage.getItem("selectedShipmentProfile") || ""
  );

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

  useEffect(() => {
    getShipmentProfiles();
  }, []);

  const formattedProfiles = shipmentProfiles?.map((profile: any) => ({
    value: profile.name,
    label: profile.name,
  }));

  useEffect(() => {
    localStorage.setItem("selectedShipmentProfile", selectedShipmentProfile);
  }, [selectedShipmentProfile]);

  return (
    <Card>
      <CardContent className="p-3 lg:px-6 flex gap-2 items-center lg:pt-6">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <CardTitle className="flex flex-col lg:flex-row lg:items-center gap-2">
              Shipment Profile
              <CardDescription className="italic font-normal text-[12px] lg:text-sm">
                * My shipment profile(formerly Fast Ship)
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
          <h1 className="text-[20px] lg:text-[64px]">$15.49</h1>
        </div>
      </CardContent>
    </Card>
  );
}
