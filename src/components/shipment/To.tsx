"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import BasicSelect from "../BasicSelect";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { set } from "mongoose";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function To({ shipmentData, setShipmentData }) {
  const [isEdit, setIsEdit] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
  };

  const createAddressBookToEntry = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.receiverName,
        attentionName: shipmentData.receiverAttention,
        addressLineOne: shipmentData.receiverAddressLine,
        zipCode: shipmentData.receiverPostalCode,
        city: shipmentData.receiverCity,
        state: shipmentData.receiverState,
        countryCode: shipmentData.receiverCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.post(
        "/api/address-book/to",
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  const getTos = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        `/api/address-book/to?profileId=${localStorage.getItem(
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
    getTos();
  }, []);

  const transformedOptions = savedAddress?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const updateAddressBookToEntry = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.receiverName,
        attentionName: shipmentData.receiverAttention,
        addressLineOne: shipmentData.receiverAddressLine,
        zipCode: shipmentData.receiverPostalCode,
        city: shipmentData.receiverCity,
        state: shipmentData.receiverState,
        countryCode: shipmentData.receiverCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.patch(
        `/api/address-book/to/${selectedAddress}`,
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
      <CardContent className="p-3 lg:px-6 flex gap-2 items-center lg:pt-6">
        <div className="w-full space-y-3">
          <CardTitle className="flex items-center gap-2">To</CardTitle>
          <div className="space-y-1">
            <CardDescription className="text-black font-normal text-xs lg:text-sm">
              Saved Addresses
            </CardDescription>
            <BasicSelect
              value={selectedAddress}
              options={transformedOptions}
              placeholder="Select saved address"
              onChange={(value: string) => {
                const selectedAddressData = savedAddress.find(
                  (item: any) => item._id === value
                );

                setShipmentData({
                  ...shipmentData,
                  receiverName: selectedAddressData.fullName,
                  receiverAttention: selectedAddressData.attentionName,
                  receiverAddressLine: selectedAddressData.addressLineOne,
                  receiverPostalCode: selectedAddressData.zipCode,
                  receiverCity: selectedAddressData.city,
                  receiverState: selectedAddressData.state,
                  receiverCountry: selectedAddressData.countryCode,
                });

                setSelectedAddress(value);
              }}
            />
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
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Full Name or Company Name *
                    </Label>
                    <Input
                      type="text"
                      name="receiverName"
                      value={shipmentData.receiverName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Attention Name
                    </Label>
                    <Input
                      type="text"
                      name="receiverAttention"
                      value={shipmentData.receiverAttention}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Address Line 1 *
                  </Label>
                  <Input
                    type="text"
                    name="receiverAddressLine"
                    value={shipmentData.receiverAddressLine}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Zip Code *
                    </Label>
                    <Input
                      type="text"
                      name="receiverPostalCode"
                      value={shipmentData.receiverPostalCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      City *
                    </Label>
                    <Input
                      type="text"
                      name="receiverCity"
                      value={shipmentData.receiverCity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      State *
                    </Label>
                    <Input
                      type="text"
                      name="receiverState"
                      value={shipmentData.receiverState}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Country Code
                    </Label>
                    <Input
                      type="text"
                      name="receiverCountry"
                      value={shipmentData.receiverCountry}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    disabled={selectedAddress === ""}
                    variant={selectedAddress === "" ? "outline" : "default"}
                    onClick={() => {
                      updateAddressBookToEntry();
                    }}
                  >
                    Save Edits to this Address
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={() => {
                      createAddressBookToEntry();
                    }}
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
        </div>
      </CardContent>
    </Card>
  );
}
