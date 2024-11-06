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

export default function From() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Card>
      <CardContent className="flex gap-2 items-center pt-6">
        <div className="w-full space-y-3">
          <CardTitle className="flex items-center gap-2 text-2xl">
            From
          </CardTitle>
          <div className="space-y-1">
            <CardDescription className="text-black font-normal text-sm">
              My Address
            </CardDescription>
            <BasicSelect options={themeOptions} placeholder="Theme" />
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
