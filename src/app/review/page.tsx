"use client";

import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import {
  useAddressBook,
  useCreatePackageShipment,
  useCreatePickupLocation,
  useCreateShipmentProfile,
  useToAddressBook,
  useUpdateAddressBook,
  useUpdatePickupLocation,
  useUpdateShipmentProfile,
  useUpdateToAddressBook,
} from "@/hooks/apis";
import { useAppSelector } from "@/redux/hooks";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const DataGrid = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, any>;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-4">{title}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex">
          <div className="font-semibold capitalize w-1/2">{key}:</div>
          <div className="w-1/2">{value?.toString()}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function Review() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const shipmentData = useAppSelector((state) => state.data);
  const [ratingsResponse, setRatingsResponse] = React.useState<any>(null);
  const [label, setLabel] = useState("");
  const [loading, setIsLoading] = useState(false);

  const { createAddressBookEntry } = useAddressBook();
  const { updateAddressBookEntry } = useUpdateAddressBook();
  const { createAddressBookToEntry } = useToAddressBook();
  const { updateAddressBookToEntry } = useUpdateToAddressBook();
  const { createPickupLocation } = useCreatePickupLocation();
  const { updatePickupLocation } = useUpdatePickupLocation();
  const { createShipmentProfile } = useCreateShipmentProfile();
  const { updateShipmentProfile } = useUpdateShipmentProfile();
  const { createPackageShipment } = useCreatePackageShipment();

  const handleAddress = async (payload: any) => {
    const response = await fetch("/api/address-validation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regionalrequestindicator: "True", // Hardcoded value
        maximumcandidatelistsize: "20", // Hardcoded value
        addressPayload: {
          AddressKeyFormat: {
            ConsigneeName: payload.to.receiverName,
            BuildingName: "Innoplex", // Hardcoded value
            AddressLine: [payload.to.receiverAddressLine].filter(Boolean),
            Region: payload.to.receiverCountry,
            PoliticalDivision2: "ALISO VIEJO", // Hardcoded value
            PoliticalDivision1: "CA", // Hardcoded value
            PostcodePrimaryLow: payload.to.receiverPostalCode,
            PostcodeExtendedLow: "1521", // Hardcoded value
            Urbanization: "porto arundal", // Hardcoded value
            CountryCode: payload.to.receiverCountry,
          },
        },
      }),
    });

    if (response.ok) {
      setCurrentStep(2);
      setIsLoading(false);
      const result = await response.json();
      return result;
    } else {
      setIsLoading(false);
      const errorData = await response.json();
      console.error("Error in Address:", errorData);
      alert("An error occurred while creating the shipment");
    }
  };

  const handleRatings = async (payload: any) => {
    try {
      const response = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipment: payload,
        }),
      });

      if (response.ok) {
        setCurrentStep(3);
        setIsLoading(false);
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Add or Update From
    if (shipmentData.from.add) {
      await createAddressBookEntry(shipmentData.from);
    } else {
      await updateAddressBookEntry(
        shipmentData.from,
        shipmentData.from.selectedAddress
      );
    }
    // Add or Update To
    if (shipmentData.to.add) {
      await createAddressBookToEntry(shipmentData.to);
    } else {
      await updateAddressBookToEntry(
        shipmentData.to,
        shipmentData.to.selectedAddress
      );
    }
    // Add or Update pickup location
    if (shipmentData.pickUpLocation.add) {
      await createPickupLocation(shipmentData.pickUpLocation);
    } else {
      await updatePickupLocation(
        shipmentData.pickUpLocation,
        shipmentData.pickUpLocation.selectedAddress
      );
    }
    // Add or Update Shipment Profile
    if (shipmentData.shipmentProfile.add) {
      await createShipmentProfile(shipmentData.shipmentProfile.name);
    } else {
      await updateShipmentProfile(
        shipmentData.shipmentProfile.name,
        shipmentData.shipmentProfile.selectedAddress
      );
    }
    // Add Package and Shipment
    const pkgData = {
      shipDate: shipmentData.packageShipmentDetails.shipDate,
      serviceType: shipmentData.packageShipmentDetails.serviceType,
      packageType: shipmentData.packageShipmentDetails.packageType,
      packages: [
        {
          packageQuantity: shipmentData.packageShipmentDetails.pkgeQuantity,
          weight: shipmentData.packageShipmentDetails.packageWeight,
          dimensions: {
            length: shipmentData.packageShipmentDetails.packageLength,
            width: shipmentData.packageShipmentDetails.packageWidth,
            height: shipmentData.packageShipmentDetails.packageHeight,
          },
          signatureRequired:
            shipmentData.packageShipmentDetails.isSignatureRequired,
        },
      ],
    };
    await createPackageShipment(pkgData);

    const data = await handleAddress(shipmentData);
    if (data.XAVResponse.Response.ResponseStatus.Description === "Success") {
      const data = await handleRatings(shipmentData);
      setRatingsResponse(data);
      toast.success("Ratings fetched successfully");
    }
  };

  const createShipment = async (payload: any) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });

      const result = await response.json();

      if (response.ok) {
        setCurrentStep(4);
        const imageData =
          result.ShipmentResponse.ShipmentResults.PackageResults[0]
            .ShippingLabel;
        const imageSrc = `data:${imageData.ImageFormat.Code};base64,${imageData.GraphicImage}`;

        setLabel(imageSrc);
      } else {
        alert("Failed to create shipment");
      }
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("An error occurred while creating the shipment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateShipment = async () => {
    try {
      const data = await createShipment(shipmentData);
      console.log("Shipment response", data);
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("An error occurred while creating the shipment");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-3 lg:p-6 flex flex-col gap-8">
        <h1 className="text-center text-3xl font-bold">Review</h1>
        {shipmentData && (
          <>
            <DataGrid
              title="Shipment Profile"
              data={shipmentData.shipmentProfile}
            />
            <DataGrid title="From" data={shipmentData.from} />
            <DataGrid title="To" data={shipmentData.to} />
            <DataGrid
              title="Package Shipment Details"
              data={shipmentData.packageShipmentDetails}
            />
            <DataGrid
              title="Pending Pickups"
              data={shipmentData.pendingPickups}
            />
            <DataGrid
              title="Pickup Details"
              data={shipmentData.pickUpDetails}
            />
            <DataGrid
              title="Pickup Location"
              data={shipmentData.pickUpLocation}
            />
          </>
        )}
        {currentStep < 3 ? (
          <div className="flex justify-center gap-4">
            <Link href={"/"}>
              <Button variant={"outline"}>Go Back</Button>
            </Link>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              {loading ? (
                <LoaderCircle className="animate-spin text-white" />
              ) : (
                "Create & Get Label"
              )}
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <div className="bg-c-orange px-2 items-center text-white border flex gap-2 border-black rounded-md max-w-fit">
              <p className="text-[14px] lg:text-[24px] font-bold">Rates:</p>
              <h1 className="text-[20px]">
                {ratingsResponse?.RateResponse?.RatedShipment?.TotalCharges
                  ?.MonetaryValue || 0}
              </h1>
            </div>
            <Button
              onClick={() => {
                handleCreateShipment();
              }}
            >
              {loading ? (
                <LoaderCircle className="animate-spin text-white" />
              ) : (
                ` Create Shipment`
              )}
            </Button>
          </div>
        )}

        <ProgressBar
          steps={["Review", "Address Validation", "Ratings", "Shipment Label"]}
          currentStep={currentStep}
        />

        {label && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Shipment Label</h1>
            <img src={label} alt="Shipping Label" className="mb-4" />
            <a href={label} download="label.gif">
              <Button variant={"default"}>Download Label</Button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
