import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import BasicSelect from "../BasicSelect";
import axios from "axios";

export default function From({ shipmentData, setShipmentData }) {
  const [isEdit, setIsEdit] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

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
        fullName: shipmentData.shipFromName,
        contactName: shipmentData.senderAttention,
        addressLineOne: shipmentData.senderAddressLine,
        zipCode: shipmentData.shipFromPostalCode,
        city: shipmentData.shipFromCity,
        state: shipmentData.shipFromState,
        faxNumber: shipmentData.shipFromFax,
        phoneNumber: shipmentData.shipFromPhone,
        country: shipmentData.shipFromCountry,
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

  const transformedOptions = savedAddress?.map((item: any) => ({
    value: item._id,
    label: item.contactName,
  }));

  const updateAddressBookEntry = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.senderName,
        contactName: shipmentData.shipFromAttention,
        addressLineOne: shipmentData.shipFromAddressLine,
        zipCode: shipmentData.senderPostalCode,
        city: shipmentData.senderCity,
        state: shipmentData.senderState,
        faxNumber: shipmentData.senderFax,
        phoneNumber: shipmentData.senderPhone,
        country: shipmentData.senderCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.patch(
        `/api/address-book/${selectedAddress}`,
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

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
                  senderName: selectedAddressData.senderName,
                  senderAttention: selectedAddressData.senderAttention,
                  senderAddressLine: selectedAddressData.shipFromAddressLine,
                  senderPostalCode: selectedAddressData.shipFromPostalCode,
                  senderCity: selectedAddressData.shipFromCity,
                  senderState: selectedAddressData.shipFromState,
                  senderFax: selectedAddressData.shipFromFax,
                  senderPhone: selectedAddressData.shipFromPhone,
                  senderCountry: selectedAddressData.shipFromCountry,
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
                      name="senderName"
                      value={shipmentData.shipFromName}
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
                      value={shipmentData.shipFromAttention}
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
                    value={shipmentData.shipFromAddressLine}
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
                      value={shipmentData.shipFromPostalCode}
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
                      value={shipmentData.shipFromCity}
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
                      value={shipmentData.shipFromState}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
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
                      value={shipmentData.shipFromFax}
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
                      value={shipmentData.shipFromPhone}
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
                      value={shipmentData.shipFromCountry}
                      onChange={handleChange}
                      placeholder="Enter country code"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    disabled={selectedAddress === ""}
                    variant={selectedAddress === "" ? "outline" : "default"}
                    onClick={() => {
                      updateAddressBookEntry();
                    }}
                  >
                    Save Edits to this Address
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={() => {
                      createAddressBookEntry();
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
