"use client";

import { useEffect, useState } from "react";
import ShipmentForm, { ShipmentData } from "../components/ShipmentForm";
import { Toaster, toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import PackageShipmentDetails from "@/components/shipment/PackageShipmentDetails";
import OtherOptionRate from "@/components/shipment/OtherOptionRate";
import SetPickup from "@/components/shipment/SetPickup";
import { Input } from "@/components/ui/input";
import From from "@/components/shipment/From";
import To from "@/components/shipment/To";
import ShipmentProfile from "@/components/shipment/ShipmentProfile";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [label, setLabel] = useState("");
  const [ratingsResponse, setRatingsResponse] = useState<any>(null);
  const [isToken, setIsToken] = useState("");
  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    description: "Ship WS test",
    senderName: "ShipperName",
    senderAttention: "ShipperZs Attn Name",
    senderTaxId: "123456",
    senderPhone: "1115554758",
    senderFax: "8002222222",
    senderAddressLine: "2311 York Rd",
    senderCity: "Timonium",
    senderState: "MD",
    senderPostalCode: "21093",
    senderCountry: "US",
    receiverName: "Happy Dog Pet Supply",
    receiverAttention: "1160b_74",
    receiverPhone: "9225377171",
    receiverAddressLine: "123 Main St",
    receiverCity: "timonium",
    receiverState: "MD",
    receiverPostalCode: "21030",
    receiverCountry: "US",
    shipFromName: "T and T Designs",
    shipFromAttention: "1160b_74",
    shipFromPhone: "1234567890",
    shipFromFax: "1234567890",
    shipFromAddressLine: "2311 York Rd",
    shipFromCity: "Alpharetta",
    shipFromState: "GA",
    shipFromPostalCode: "30005",
    shipFromCountry: "US",
    packageDescription: "Nails",
    packageLength: "10",
    packageWidth: "30",
    packageHeight: "45",
    packageWeight: "5",
    serviceType: "03",
  });

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

  const handleAddress = async (payload: any) => {
    const response = await fetch("/api/address-validation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regionalrequestindicator: "1", // Hardcoded value
        maximumcandidatelistsize: "10", // Hardcoded value
        addressPayload: {
          AddressKeyFormat: {
            ConsigneeName: payload.receiverName,
            BuildingName: "Innoplex", // Hardcoded value
            AddressLine: [payload.receiverAddressLine].filter(Boolean),
            Region: payload.receiverCity,
            PoliticalDivision2: payload.receiverState,
            PoliticalDivision1: "CA", // Hardcoded value
            PostcodePrimaryLow: payload.receiverPostalCode,
            PostcodeExtendedLow: "0000", // Hardcoded value
            Urbanization: "porto arundal", // Hardcoded value
            CountryCode: payload.receiverCountry,
          },
        },
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
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
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createShipment = async (payload: any) => {
    try {
      const response = await fetch("/api/create-shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });

      const result = await response.json();

      if (response.ok) {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await handleAddress(shipmentData);
    console.log("Address response", data);
    if (data.XAVResponse.Response.ResponseStatus.Description === "Success") {
      const data = await handleRatings(shipmentData);
      setRatingsResponse(data);
      toast.success("Ratings fetched successfully");
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
    <div>
      <Navbar />
      <div className="px-3 lg:px-6 py-4 flex flex-col gap-3 lg:gap-4">
        <Toaster position="top-right" richColors />
        <ShipmentProfile />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <From
              shipmentData={shipmentData}
              setShipmentData={setShipmentData}
            />
            <To shipmentData={shipmentData} setShipmentData={setShipmentData} />
          </div>
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <PackageShipmentDetails
              shipmentData={shipmentData}
              setShipmentData={setShipmentData}
            />
            <SetPickup />
          </div>
          <div>
            <OtherOptionRate />
            <div className="space-y-4 mt-5">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Update Existing Shipment Profile
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save as New Shipment Profile
                </label>
              </div>
              <Input type="email" placeholder="Email" className="bg-white" />
              <div className="mx-4">
                <button className="border border-black text-gray-700 bg-c-orange text-2xl lg:text-3xl font-semibold px-5 py-4 w-full rounded-lg">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
        {isToken ? (
          <>
            {" "}
            {ratingsResponse ? (
              <div className="flex flex-col gap-2 w-full items-center justify-center my-4">
                <h1>Ratings will be</h1>
                <h1>
                  {
                    ratingsResponse.RateResponse.RatedShipment.TotalCharges
                      .CurrencyCode
                  }
                </h1>
                <h1>
                  {
                    ratingsResponse.RateResponse.RatedShipment.TotalCharges
                      .MonetaryValue
                  }
                </h1>
                <button
                  className="text-white bg-blue-700 w-fit hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  onClick={() => {
                    handleCreateShipment();
                  }}
                >
                  Create Shipment
                </button>
                <button
                  className="text-white bg-blue-700 w-fit hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  onClick={() => {
                    setRatingsResponse(null);
                  }}
                >
                  Go Back
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-screen-sm mx-auto flex flex-col gap-4 mt-10"
              >
                <ShipmentForm
                  shipmentData={shipmentData}
                  setShipmentData={setShipmentData}
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                >
                  Generate Ratings
                </button>
              </form>
            )}
          </>
        ) : (
          <h1 className="text-center my-4">
            Welcome, Authenticate to continue
          </h1>
        )}
        {label && (
          <div>
            <h3>Shipment Label</h3>
            <img src={label} alt="Shipping Label" className="" />
            <a href={label} download="label.gif">
              Download Label
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
