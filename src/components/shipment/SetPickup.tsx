import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Input } from "../ui/input";
import BasicSelect from "../BasicSelect";
import { Checkbox } from "../ui/checkbox";
import { CalendarInput } from "../CalenderInput";

export default function SetPickup() {
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [onCallPickup, setOnCallPickup] = useState(false);

  const handlePickupChange = (value) => {
    setOnCallPickup(value === "option-two");
  };

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-2xl">
          Set Pickup
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-6">
        <RadioGroup
          defaultValue="option-one"
          onValueChange={handlePickupChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">
              Include this shipment in one of my pending pickups.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Schedule a UPS On-Call Pickup</Label>
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
            <div className="flex justify-between border-b border-gray-900">
              <p>Pickup Location</p>
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
                  />
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Full Name or Company Name *
                    </Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Contact Name
                    </Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Address Line 1 *
                  </Label>
                  <Input type="email" id="email" placeholder="Email" />
                </div>
                <div className="flex gap-2">
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
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      State *
                    </Label>
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Phone *
                    </Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Extension
                    </Label>{" "}
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save Edits to this Address
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            {/* Pickup Details */}
            <div className="flex justify-between border-b border-gray-900">
              <p>Pickup Details</p>
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
              <div className="flex gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email" className="text-xs">
                    State *
                  </Label>
                  <BasicSelect
                    options={themeOptions}
                    placeholder="Country or Territory"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email" className="text-xs">
                    State *
                  </Label>
                  <BasicSelect
                    options={themeOptions}
                    placeholder="Country or Territory"
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
              <div className="grid grid-cols-3">
                <h1>Pick up Window</h1>
                <h1>Pick up Location</h1>
                <h1>Pickup Reference</h1>
                <h1>12.00 PM - 03:00 PM</h1>
                <h1>Front Door</h1>
              </div>
            )}
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
