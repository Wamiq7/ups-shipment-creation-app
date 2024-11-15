import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import BasicSelect from "../BasicSelect";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function To({ shipmentData, setShipmentData }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
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
                  <Label htmlFor="email" className="text-xs lg:text-sm">
                    Country or Territory *
                  </Label>{" "}
                  <BasicSelect
                    value=""
                    options={themeOptions}
                    placeholder="Country or Territory"
                  />
                </div>
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
                    {/* <BasicSelect
                      value=""
                      options={themeOptions}
                      placeholder="Country or Territory"
                    /> */}
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
                  {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Phone *
                    </Label>
                    <Input
                      type="text"
                      name="receiverPhone"
                      value={shipmentData.receiverPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Extension
                    </Label>{" "}
                    <BasicSelect
                      value=""
                      options={themeOptions}
                      placeholder="Country or Territory"
                    />
                  </div> */}
                </div>
                <div className="flex gap-2 w-full justify-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save as New Address book
                    </label>
                  </div>
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
