import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import BasicSelect from "../BasicSelect";
import { Checkbox } from "../ui/checkbox";
import { CalendarInput } from "../CalenderInput";
import axios from "axios";
import { toast } from "sonner";
import { set } from "mongoose";
import { Button } from "../ui/button";

export default function SetPickup() {
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [onCallPickup, setOnCallPickup] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [pickupLocation, setPickupLocation] = useState({
    countryOrTerritory: "",
    fullName: "",
    contactName: "",
    addressLineOne: "",
    zipCode: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    extension: "",
  });

  const handlePickupChange = (value) => {
    setOnCallPickup(value === "option-two");
  };

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  const createPickupLocation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        countryOrTerritory: pickupLocation.countryOrTerritory,
        fullName: pickupLocation.fullName,
        contactName: pickupLocation.contactName,
        addressLineOne: pickupLocation.addressLineOne,
        zipCode: pickupLocation.zipCode,
        city: pickupLocation.city,
        state: pickupLocation.state,
        email: pickupLocation.email,
        phone: pickupLocation.phone,
        extension: pickupLocation.extension,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.post(
        "/api/address-book/pickup-location",
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  const getPickupLocations = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        `/api/address-book/pickup-location?profileId=${localStorage.getItem(
          "selectedShipmentProfileId"
        )}`,
        config
      );

      setSavedAddress(response.data.data);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  useEffect(() => {
    getPickupLocations();
  }, []);

  const transformedOptions = savedAddress?.map((item: any) => ({
    value: item._id,
    label: item.contactName,
  }));

  const updatePickupLocation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        countryOrTerritory: pickupLocation.countryOrTerritory,
        fullName: pickupLocation.fullName,
        contactName: pickupLocation.contactName,
        addressLineOne: pickupLocation.addressLineOne,
        zipCode: pickupLocation.zipCode,
        city: pickupLocation.city,
        state: pickupLocation.state,
        email: pickupLocation.email,
        phone: pickupLocation.phone,
        extension: pickupLocation.extension,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.patch(
        `/api/address-book/pickup-location/${selectedAddress}`,
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating address book entry:", error);
      toast.error("An error occurred while updating the address book entry.");
    }
  };

  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-lg lg:text-2xl">
          Set Pickup
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:px-6 flex flex-col gap-2 lg:pt-6">
        <RadioGroup
          defaultValue="option-one"
          onValueChange={handlePickupChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one" className="text-xs lg:text-sm">
              Include this shipment in one of my pending pickups.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two" className="text-xs lg:text-sm">
              Schedule a UPS On-Call Pickup
            </Label>
          </div>
        </RadioGroup>
        {onCallPickup ? (
          <div className="space-y-6">
            <CalendarInput
              label="Date of Birth"
              placeholder="Select date"
              onDateChange={(date) => console.log("Selected date:", date)}
            />
            {/* Pickup  Location */}
            <BasicSelect
              value={selectedAddress}
              options={transformedOptions}
              placeholder="Select saved locations"
              onChange={(value: string) => {
                const selectedAddressData = savedAddress.find(
                  (item: any) => item._id === value
                );

                setPickupLocation({
                  countryOrTerritory: selectedAddressData.countryOrTerritory,
                  fullName: selectedAddressData.fullName,
                  contactName: selectedAddressData.contactName,
                  addressLineOne: selectedAddressData.addressLineOne,
                  zipCode: selectedAddressData.zipCode,
                  city: selectedAddressData.city,
                  state: selectedAddressData.state,
                  email: selectedAddressData.email,
                  phone: selectedAddressData.phone,
                  extension: selectedAddressData.extension,
                });

                setSelectedAddress(value);
              }}
            />
            <div className="space-y-2 lg:space-y-4">
              <div className="flex justify-between border-b border-gray-900">
                <p className="text-xs lg:text-sm">Pickup Location</p>
                <button
                  className="text-c-blue-accent text-xs hover:underline"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                >
                  {isEdit ? "Close" : "Edit"}
                </button>
              </div>
              {isEdit ? (
                <div className="flex flex-col gap-3">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Country or Territory *</Label>{" "}
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                      value={pickupLocation.countryOrTerritory}
                      onChange={(value) =>
                        setPickupLocation({
                          ...pickupLocation,
                          countryOrTerritory: value,
                        })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Full Name or Company Name *
                      </Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={pickupLocation.fullName}
                        onChange={(e) =>
                          setPickupLocation({
                            ...pickupLocation,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Contact Name
                      </Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={pickupLocation.contactName}
                        onChange={(e) =>
                          setPickupLocation({
                            ...pickupLocation,
                            contactName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Address Line 1 *
                    </Label>
                    <Input
                      type="text"
                      placeholder=""
                      value={pickupLocation.addressLineOne}
                      onChange={(e) =>
                        setPickupLocation({
                          ...pickupLocation,
                          addressLineOne: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Zip Code *
                      </Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={pickupLocation.zipCode}
                        onChange={(e) =>
                          setPickupLocation({
                            ...pickupLocation,
                            zipCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        City *
                      </Label>
                      <Input
                        placeholder=""
                        value={pickupLocation.city}
                        onChange={(e) =>
                          setPickupLocation({
                            ...pickupLocation,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        State *
                      </Label>
                      <BasicSelect
                        options={themeOptions}
                        placeholder="Country or Territory"
                        value={pickupLocation.state}
                        onChange={(value) =>
                          setPickupLocation({
                            ...pickupLocation,
                            state: value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        value={pickupLocation.email}
                        placeholder=""
                        onChange={(e) =>
                          setPickupLocation({
                            ...pickupLocation,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Phone *
                      </Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={pickupLocation.phone}
                        onChange={(e) =>
                          setPickupLocation({
                            ...pickupLocation,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs">
                        Extension
                      </Label>{" "}
                      <BasicSelect
                        options={themeOptions}
                        placeholder="Country or Territory"
                        value={pickupLocation.extension}
                        onChange={(value) =>
                          setPickupLocation({
                            ...pickupLocation,
                            extension: value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      disabled={selectedAddress === ""}
                      variant={selectedAddress === "" ? "outline" : "default"}
                      onClick={() => {
                        updatePickupLocation();
                      }}
                    >
                      Save Edits to this Address
                    </Button>
                    <Button
                      variant={"default"}
                      onClick={() => createPickupLocation()}
                    >
                      Save as New Address book
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs max-w-[65%]">
                  Company Name, Contact Name, Street Address, City, State, zip
                  code, Country, email address, phone number
                </p>
              )}
            </div>
            {/* Pickup Details */}
            <div className="space-y-2 lg:space-y-4">
              <div className="flex justify-between border-b border-gray-900">
                <p className="text-xs lg:text-sm">Pickup Details</p>
                <button
                  className="text-c-blue-accent text-xs hover:underline"
                  onClick={() => {
                    setIsEdit2(!isEdit2);
                  }}
                >
                  {isEdit2 ? "Close" : "Edit"}
                </button>
              </div>
              {isEdit2 ? (
                <div className="grid grid-cols-2 gap-2 lg:gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      State *
                    </Label>
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                      value=""
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      State *
                    </Label>
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                      value=""
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Zip Code *
                    </Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      City *
                    </Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 text-xs">
                  <h1>Pick up Window</h1>
                  <h1>Pick up Location</h1>
                  <h1>Pickup Reference</h1>
                  <h1>12.00 PM - 03:00 PM</h1>
                  <h1>Front Door</h1>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Textarea placeholder="Pickup Location" />
            <p className="text-xs max-w-[65%]">
              Company Name, Contact Name, Street Address, City, State, zip code,
              Country, email address, phone number
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
