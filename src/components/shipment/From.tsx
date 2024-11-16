import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import BasicSelect from "../BasicSelect";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function From({ shipmentData, setShipmentData }) {
  const [isEdit, setIsEdit] = useState(false);
  const [savedAddress, setSavedAddress] = useState();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
  };

  const createAddressBookEntry = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        texIdentificationNumber: shipmentData.senderTaxId,
        fullName: shipmentData.senderName,
        contactName: shipmentData.senderAttention,
        addressLineOne: shipmentData.senderAddressLine,
        zipCode: shipmentData.senderPostalCode,
        city: shipmentData.senderCity,
        state: shipmentData.senderState,
        faxNumber: shipmentData.senderFax,
        phoneNumber: shipmentData.senderPhone,
        country: shipmentData.senderCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.post(
        "/api/address-book",
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  const getFroms = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        `/api/address-book?profileId=${localStorage.getItem(
          "selectedShipmentProfileId"
        )}`,
        config
      );

      setSavedAddress(response.data);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  useEffect(() => {
    getFroms();
  }, []);

  // console.log({ from: savedAddress });

  return (
    <Card>
      <CardContent className="p-3 lg:px-6 flex gap-2 items-center lg:pt-6">
        <div className="w-full space-y-3">
          <CardTitle className="text-base flex items-center gap-2 lg:text-2xl">
            From
          </CardTitle>
          <div className="space-y-1">
            <CardDescription className="text-black font-normal text-xs lg:text-sm">
              My Address
            </CardDescription>
            <BasicSelect value="" options={themeOptions} placeholder="Theme" />
            <button
              className="text-c-blue-accent text-xs hover:underline"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "Close" : "Edit"}
            </button>
            {isEdit ? (
              <div className="flex flex-col gap-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  {/* <Label htmlFor="email" className="text-xs lg:text-sm">
                    Country or Territory*
                  </Label>
                  <BasicSelect
                    options={themeOptions}
                    placeholder="Country or Territory"
                  /> */}
                  <Label htmlFor="email" className="text-xs lg:text-sm">
                    Tax Identification Number
                  </Label>
                  <Input
                    type="text"
                    name="senderTaxId"
                    value={shipmentData.senderTaxId}
                    onChange={handleChange}
                    placeholder="Enter Sender Tax ID"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Full Name or Company Name *
                    </Label>
                    <Input
                      type="text"
                      name="senderName"
                      value={shipmentData.senderName}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Contact Name
                    </Label>
                    <Input
                      type="text"
                      name="senderAttention"
                      value={shipmentData.senderAttention}
                      onChange={handleChange}
                      placeholder="Enter contact name"
                    />
                  </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="senderAddressLine" className="text-xs">
                    Address Line 1 *
                  </Label>
                  <Input
                    type="text"
                    name="senderAddressLine"
                    value={shipmentData.senderAddressLine}
                    onChange={handleChange}
                    placeholder="Enter address line"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="senderPostalCode" className="text-xs">
                      Zip Code *
                    </Label>
                    <Input
                      type="text"
                      name="senderPostalCode"
                      value={shipmentData.senderPostalCode}
                      onChange={handleChange}
                      placeholder="Enter zip code"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="senderCity" className="text-xs">
                      City *
                    </Label>
                    <Input
                      type="text"
                      name="senderCity"
                      value={shipmentData.senderCity}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="senderState" className="text-xs">
                      State *
                    </Label>
                    <Input
                      type="text"
                      name="senderState"
                      value={shipmentData.senderState}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                    {/* <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                    /> */}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="faxNumber" className="text-xs">
                      Fax Number
                    </Label>
                    <Input
                      type="text"
                      name="senderFax"
                      value={shipmentData.senderFax}
                      onChange={handleChange}
                      placeholder="Enter fax number"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="senderPhone" className="text-xs">
                      Phone *
                    </Label>
                    <Input
                      type="text"
                      name="senderPhone"
                      value={shipmentData.senderPhone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Country Code
                    </Label>
                    <Input
                      type="text"
                      name="senderCountry"
                      value={shipmentData.senderCountry}
                      onChange={handleChange}
                      placeholder="Enter country code"
                    />
                    {/* <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                    /> */}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save Edits to this Address
                    </label>
                  </div>
                  <Button
                    variant={"default"}
                    onClick={() => {
                      createAddressBookEntry();
                    }}
                  >
                    Save as New Address book
                  </Button>
                  {/* <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                     
                    </label>
                  </div> */}
                </div>
              </div>
            ) : (
              <p className="text-xs max-w-[65%]">
                Company Name, Contact Name, Street Address, City, State, zip
                code, Country, email address, phone number
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
