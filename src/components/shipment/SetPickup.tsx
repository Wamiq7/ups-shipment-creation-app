"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import BasicSelect from "../BasicSelect";
import { Checkbox } from "../ui/checkbox";
import { CalendarInput } from "../CalenderInput";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateDataState } from "@/redux/dataSlice";
import axios from "axios";

export default function SetPickup() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector((state) => state.data);
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [onCallPickup, setOnCallPickup] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handlePickupChange = (value) => {
    setOnCallPickup(value === "option-two");
  };

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

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
              onDateChange={(date) =>
                dispatch(
                  updateDataState({
                    path: ["pickUpLocation"],
                    updates: {
                      pickupDate: date,
                    },
                  })
                )
              }
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

                dispatch(
                  updateDataState({
                    path: ["pickUpLocation"],
                    updates: {
                      shipFromCountry: selectedAddressData.countryOrTerritory,
                      shipFromName: selectedAddressData.fullName,
                      contactName: selectedAddressData.contactName,
                      shipFromAddressLine: selectedAddressData.addressLineOne,
                      shipFromPostalCode: selectedAddressData.zipCode,
                      shipFromCity: selectedAddressData.city,
                      shipFromState: selectedAddressData.state,
                      email: selectedAddressData.email,
                      shipFromPhone: selectedAddressData.phone,
                      extension: selectedAddressData.extension,
                      selectedAddress: value,
                    },
                  })
                );

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
                    <Label>Country or Territory *</Label>{" "}
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Country or Territory"
                      value={shipmentData.pickUpLocation.shipFromCountry}
                      onChange={(value) => {
                        dispatch(
                          updateDataState({
                            path: ["pickUpLocation"],
                            updates: {
                              shipFromCountry: value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">
                        Full Name or Company Name *
                      </Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={shipmentData.pickUpLocation.shipFromName}
                        onChange={(e) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                shipFromName: e.target.value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">Contact Name</Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={shipmentData.pickUpLocation.contactName}
                        onChange={(e) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                contactName: e.target.value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-xs">Address Line 1 *</Label>
                    <Input
                      type="text"
                      placeholder=""
                      value={shipmentData.pickUpLocation.shipFromAddressLine}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["pickUpLocation"],
                            updates: {
                              shipFromAddressLine: e.target.value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">Zip Code *</Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={shipmentData.pickUpLocation.shipFromPostalCode}
                        onChange={(e) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                shipFromPostalCode: e.target.value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">City *</Label>
                      <Input
                        placeholder=""
                        value={shipmentData.pickUpLocation.shipFromCity}
                        onChange={(e) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                shipFromCity: e.target.value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">State *</Label>
                      <BasicSelect
                        options={themeOptions}
                        placeholder="State"
                        value={shipmentData.pickUpLocation.shipFromState}
                        onChange={(value) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                shipFromState: value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">Email</Label>
                      <Input
                        type="email"
                        placeholder=""
                        value={shipmentData.pickUpLocation.email}
                        onChange={(e) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                email: e.target.value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">Phone *</Label>
                      <Input
                        type="text"
                        placeholder=""
                        value={shipmentData.pickUpLocation.shipFromPhone}
                        onChange={(e) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                shipFromPhone: e.target.value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-xs">Extension</Label>{" "}
                      <BasicSelect
                        options={themeOptions}
                        placeholder="Extension"
                        value={shipmentData.pickUpLocation.extension}
                        onChange={(value) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                extension: value,
                              },
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit"
                        checked={shipmentData.pickUpLocation.edit}
                        onCheckedChange={(checked) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                edit: checked,
                                add: false,
                              },
                            })
                          );
                        }}
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Save Edits to this Address
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="add"
                        checked={shipmentData.pickUpLocation.add}
                        onCheckedChange={(checked) => {
                          dispatch(
                            updateDataState({
                              path: ["pickUpLocation"],
                              updates: {
                                add: checked,
                                edit: false,
                              },
                            })
                          );
                        }}
                      />
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
                    <Label className="text-xs">Earliest*</Label>
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Earliest"
                      value={shipmentData.pickUpDetails.earliest}
                      onChange={(value) => {
                        dispatch(
                          updateDataState({
                            path: ["pickUpDetails"],
                            updates: {
                              earliest: value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-xs">Latest*</Label>
                    <BasicSelect
                      options={themeOptions}
                      placeholder="Latest"
                      value={shipmentData.pickUpDetails.latest}
                      onChange={(value) => {
                        dispatch(
                          updateDataState({
                            path: ["pickUpDetails"],
                            updates: {
                              latest: value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-xs">Preferred Pickup Location</Label>
                    <Input
                      type="text"
                      placeholder="Preferred Pickup Location"
                      value={shipmentData.pickUpDetails.preferredPickupLocation}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["pickUpDetails"],
                            updates: {
                              preferredPickupLocation: e.target.value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-xs">Pickup Reference</Label>
                    <Input
                      type="text"
                      placeholder="Pickup Reference"
                      value={shipmentData.pickUpDetails.pickupReference}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["pickUpDetails"],
                            updates: {
                              pickupReference: e.target.value,
                            },
                          })
                        );
                      }}
                    />
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
            <Textarea
              placeholder="Pickup Location"
              value={shipmentData.pendingPickups.pickupLocation}
              onChange={(e) => {
                dispatch(
                  updateDataState({
                    path: ["pendingPickups"],
                    updates: {
                      pickupLocation: e.target.value,
                    },
                  })
                );
              }}
            />
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
