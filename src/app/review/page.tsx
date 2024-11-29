"use client";

import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
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
import { Edit2Icon, LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  IDataState,
  IShipmentFrom,
  PackageShipmentDetails,
} from "@/types/data.type";
import { useRouter } from "next/navigation";
import createPdfFromLabel from "@/lib/utils";

const DataGrid = ({ title, body }: { title: string; body: ReactNode }) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger className="px-4 bg-gray-200 py-1 border-y-2 border-gray-300 font-semibold text-base">
        {title}
      </AccordionTrigger>
      <AccordionContent className="gap-2 pt-6 pb-14 px-4 ">
        {body}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default function Review() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = React.useState(1);
  const shipmentData = useAppSelector((state) => state.data);
  const [ratingsResponse, setRatingsResponse] = React.useState<any>(null);
  const [label, setLabel] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [pickUpRate, setPickUpRate] = React.useState<any>(null);

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
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error("Error in Ratings:", errorData);
        alert("An error occurred while fetching ratings");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("An error occurred while fetching ratings");
    }
  };

  const handlePickupRate = async (payload: any) => {
    try {
      const response = await fetch("/api/pickup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: payload,
        }),
      });

      if (response.ok) {
        setCurrentStep(4);
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error("Error in Pickup:", errorData);
        alert("An error occurred while creating the pickup");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("An error occurred while creating the pickup");
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
      packages: shipmentData.packageShipmentDetails.packages.map((pkg) => ({
        packageQuantity: pkg.pkgeQuantity,
        weight: pkg.packageWeight,
        dimensions: {
          length: pkg.dimensions.packageLength,
          width: pkg.dimensions.packageWidth,
          height: pkg.dimensions.packageHeight,
        },
        signatureRequired: pkg.isSignatureRequired,
      })),
      description: shipmentData.packageShipmentDetails.description,
      packageDescription:
        shipmentData.packageShipmentDetails.packageDescription,
    };
    await createPackageShipment(pkgData);

    // UPS Apis
    const data = await handleAddress(shipmentData);
    if (
      data?.XAVResponse?.Response?.ResponseStatus?.Description === "Success"
    ) {
      const ratingData = await handleRatings(shipmentData);
      setRatingsResponse(ratingData);
      toast.success("Ratings fetched successfully");
      if (
        ratingData?.RateResponse.Response?.ResponseStatus?.Description ===
        "Success"
      ) {
        const pickUpRateData = await handlePickupRate(shipmentData);
        setPickUpRate(pickUpRateData?.PickupRateResponse);
      }
    }

    setIsLoading(false);
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
        setCurrentStep(5);
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

  const createMultiPieceShipment = async (payload: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "/api/create-shipment/multi-piece-shipping",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload }),
        }
      );

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
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("An error occurred while creating the shipment");
    }
  };

  const handleCreateMultiPieceShipment = async () => {
    try {
      const data = await createMultiPieceShipment(shipmentData);
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("An error occurred while creating the shipment");
    }
  };

  // Handle Edit button clicks
  const handleEdit = (section: string) => {
    router.push(`/?edit=${section}`);
  };

  const handleDownload = async () => {
    const pdfBlob = await createPdfFromLabel(label);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "shipment_label.pdf"; // Specify the download file name
    link.click();
    URL.revokeObjectURL(pdfUrl); // Clean up the object URL
  };

  const handleCopy = () => {
    const referenceNumber =
      pickUpRate?.Response?.TransactionReference?.TransactionIdentifier;

    if (referenceNumber) {
      navigator.clipboard
        .writeText(referenceNumber)
        .then(() => {
          toast.success("Reference number copied to clipboard");
        })
        .catch((err) => {
          toast.error("Failed to copy reference number");
          console.error("Failed to copy:", err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-3 lg:p-6 flex flex-col bg-white min-h-[calc(100dvh-64px)] h-full">
        <h1 className="text-3xl font-bold mb-8">
          <span className="border-b-2 border-yellow-400 pb-2">Create</span> a
          Shipment
        </h1>
        {shipmentData && (
          <>
            <DataGrid
              title="Ship From *"
              body={
                <ShipFromAndToBody
                  data={shipmentData.from}
                  onEdit={() => handleEdit("from")}
                />
              }
            />
            <DataGrid
              title="Ship To *"
              body={
                <ShipFromAndToBody
                  data={shipmentData.to}
                  onEdit={() => handleEdit("to")}
                />
              }
            />
            <DataGrid
              title="Package Information *"
              body={
                <PackageInformationBody
                  data={shipmentData.packageShipmentDetails}
                  onEdit={() => handleEdit("package")}
                />
              }
            />
            <DataGrid
              title="Shipping Service *"
              body={
                <ShippingServiceBody
                  data={shipmentData}
                  onEdit={() => handleEdit("shippingService")}
                />
              }
            />
            <DataGrid
              title="Additional Options"
              body={
                <AdditionalOptionsBody
                  onEdit={() => handleEdit("additionalOptions")}
                />
              }
            />
            <DataGrid
              title="Payments *"
              body={
                <PaymentInfoBody
                  shipmentDetails={shipmentData.from}
                  onEdit={() => handleEdit("payments")}
                />
              }
            />
            <TermsAndConditions />
          </>
        )}
        {currentStep < 3 ? (
          <div className="flex gap-4 px-10 mt-8">
            <Button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-c-orange hover:bg-c-orange rounded-full px-4 text-gray-800"
            >
              {loading ? (
                <LoaderCircle className="animate-spin text-gray-800" />
              ) : (
                "Create & Get Label(s)"
              )}
            </Button>
            <Link href={"/"}>
              <Button
                variant={"link"}
                className="underline text-blue-500 text-base"
              >
                Cancel Shipment
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 px-10 mt-8">
            <div className="bg-c-orange px-2 items-center text-white border flex gap-2 border-black rounded-md max-w-fit">
              <p className="text-[14px] lg:text-[24px] font-bold">Rates:</p>
              <h1 className="text-[20px]">
                {(
                  parseFloat(
                    ratingsResponse?.RateResponse?.RatedShipment?.TotalCharges
                      ?.MonetaryValue || 0
                  ) +
                  parseFloat(pickUpRate?.RateResult?.GrandTotalOfAllCharge || 0)
                ).toFixed(2)}{" "}
              </h1>
            </div>
            <Button
              onClick={() => {
                shipmentData.packageShipmentDetails.packages.length > 1
                  ? handleCreateMultiPieceShipment()
                  : handleCreateShipment();
              }}
              disabled={loading}
              className="bg-c-orange hover:bg-c-orange rounded-full px-4 text-gray-800"
            >
              {loading ? (
                <LoaderCircle className="animate-spin text-white" />
              ) : (
                ` Create Shipment`
              )}
            </Button>
          </div>
        )}

        {pickUpRate?.Response && (
          <h1 className="mt-4 font-semibold">
            Pick Up Rate Reference Number:{" "}
            <span
              onClick={handleCopy}
              className="text-gray-600 cursor-pointer border-b border-dotted hover:text-blue-600"
              title="Click to copy"
            >
              {
                pickUpRate?.Response?.TransactionReference
                  ?.TransactionIdentifier
              }
            </span>
          </h1>
        )}

        <ProgressBar
          steps={[
            "Review",
            "Address Validation",
            "Ratings",
            "Pickup Rate",
            "Shipment Label",
          ]}
          currentStep={currentStep}
        />

        {label && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Shipment Label</h1>
            <img src={label} alt="Shipping Label" className="mb-4" />
            <Button
              variant={"default"}
              onClick={handleDownload}
              className="bg-c-orange hover:bg-c-orange rounded-full px-4 text-gray-800"
            >
              Download as PDF
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

const ShipFromAndToBody = ({
  data,
  onEdit,
}: {
  data: Record<string, any>;
  onEdit: () => void;
}) => {
  return (
    <div className="w-1/2 relative">
      <div className="w-3/4 text-gray-600">
        {Object.entries(data).map(([_, value], index) => {
          const hasValue = typeof value === "string" ? !!value.trim() : !!value;
          const isLastValue = index === Object.keys(data).length - 1;
          if (hasValue) {
            return (
              <span key={index} className="mr-1">
                {value?.toString() + (!isLastValue ? "," : "")}{" "}
              </span>
            );
          }
          return null;
        })}
      </div>
      <div className="absolute top-0 right-0">
        <EditButton onEdit={onEdit} />
      </div>
    </div>
  );
};

const PackageInformationBody = ({
  data,
  onEdit,
}: {
  data: PackageShipmentDetails;
  onEdit: () => void;
}) => {
  return (
    <div className="w-1/2 relative">
      <div className="w-3/4">
        <p className="font-semibold">Total Packages: {data.packages.length}</p>

        <hr className="my-3" />
        <div className="ml-12 space-y-4">
          <ul className="ml-4 list-decimal">
            {data.packages.map((pkg, index) => {
              return (
                <li key={index} className="font-semibold">
                  {data.description} - {pkg.packageWeight} lbs -{" "}
                  {pkg.dimensions.packageHeight} x{" "}
                  {pkg.dimensions.packageLength} x {pkg.dimensions.packageWidth}{" "}
                  in
                </li>
              );
            })}
          </ul>
          <button
            className="text-c-blue-accent italic text-xs hover:underline"
            // onClick={handleAddPackage}
          >
            + Add another Package
          </button>
        </div>

        <div className="flex mt-5 gap-2 items-center">
          <Button size={"sm"} variant={"outline"}>
            Previous
          </Button>
          <Button size={"sm"} variant={"outline"}>
            Next
          </Button>
        </div>

        <div className="absolute top-0 right-0">
          <EditButton onEdit={onEdit} />
        </div>
      </div>
    </div>
  );
};

const ShippingServiceBody = ({
  data,
  onEdit,
}: {
  data: IDataState;
  onEdit: () => void;
}) => {
  const { pickUpLocation, packageShipmentDetails, pickUpDetails } = data;

  return (
    <div className="w-full space-y-3">
      {/* Pickup Section */}
      <div>
        <div className="flex justify-between mb-2 border-b border-b-amber-300">
          <h2 className="flex items-center text-lg font-semibold text-gray-700">
            Do you need to schedule a pickup?
          </h2>
          <EditButton onEdit={onEdit} />
        </div>
        <p className="mt-1 text-gray-600">YES pick up my shipment.</p>
        <p className="text-gray-600">
          {pickUpLocation.shipFromName} is a "Daily Pickup" Account. Your
          pickups occur once each business day.
        </p>
        <p className="text-gray-600 font-medium">Pickup Location:</p>
        <p className="text-gray-600">{pickUpLocation.shipFromName}</p>
        <p className="text-gray-600">
          {pickUpLocation.shipFromAddressLine}, {pickUpLocation.shipFromCity},{" "}
          {pickUpLocation.shipFromState} {pickUpLocation.shipFromPostalCode}
        </p>
        <p className="text-gray-600">{pickUpLocation.shipFromCountry}</p>
      </div>

      {/* Hold for Customer Pickup Section */}
      <div>
        <div className="flex justify-between mb-2 border-b border-b-amber-300">
          <h2 className="flex items-center text-lg font-semibold text-gray-700">
            Hold for customer pickup at a UPS Access Point™ location?
          </h2>
          <EditButton onEdit={onEdit} />
        </div>
        <p className="mt-1 text-gray-600">No, deliver to receiver.</p>
      </div>

      {/* Delivery Section */}
      <div className="space-y-2">
        <div className="flex justify-between mb-2 border-b border-b-amber-300">
          <h2 className="flex items-center text-lg font-semibold text-gray-700">
            <InfoCircledIcon className="w-5 h-5 text-blue-500 mr-2" />
            When would you like it delivered?
          </h2>
          <EditButton onEdit={onEdit} />
        </div>
        <p className="mt-1 text-gray-600">
          {new Date(packageShipmentDetails.shipDate).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}{" "}
          by End of Day via our UPS Ground service for $15.08.
        </p>
        <p className="text-gray-600 text-sm bg-gray-200 p-2 !my-3">
          Please note that extremely high volume on November 18, 2024 - January
          10, 2025 may add one day in transit for a small number of Ground
          shipments. See if you may be affected:{" "}
          <a
            href="https://www.ups.com/servicealerts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Check for Service Impacts
          </a>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          * Note: Confirm packages can be received at this address during
          regular hours.
        </p>
        <p className="text-gray-500 text-xs">
          Above delivery dates/times are estimated, but not necessarily
          guaranteed. Refer to{" "}
          <a
            href="https://www.ups.com/guarantees"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Guarantees and Notices
          </a>{" "}
          for additional information.
        </p>
      </div>
    </div>
  );
};

const AdditionalOptionsBody = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="font-semibold">None Selected</p>
      <EditButton onEdit={onEdit} />
    </div>
  );
};

const PaymentInfoBody = ({
  shipmentDetails,
  onEdit,
}: {
  shipmentDetails: IShipmentFrom;
  onEdit: () => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="font-semibold">
        Bill Shipping Charges To: Shipper - {shipmentDetails.senderTaxId} -{" "}
        {shipmentDetails.senderName}
      </p>
      <EditButton onEdit={onEdit} />
    </div>
  );
};

const TermsAndConditions = () => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-2  border-b border-b-amber-300">
        Terms and Conditions
      </h2>
      <div className="ml-12">
        <p className="text-gray-600 text-sm flex items-center gap-2">
          Creating this shipment affirms that you have agreed to the UPS Tariff
          / Terms and Conditions of Service. View and download:{" "}
          <a
            href="https://www.ups.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline flex items-center gap-1"
          >
            UPS Tariff/Terms and Conditions of Service
            <OpenInNewWindowIcon />
          </a>{" "}
        </p>
        <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
          You agree not to ship any items prohibited by UPS, or any
          UPS-regulated items except by express written contract with UPS.{" "}
          <a
            href="https://www.ups.com/prohibited-items"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline flex  items-center gap-1"
          >
            List of Prohibited Articles for Shipping
            <OpenInNewWindowIcon />
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

const EditButton = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={onEdit}
      className="text-blue-500 underline flex items-center gap-1"
    >
      <Edit2Icon />
      Edit
    </Button>
  );
};
