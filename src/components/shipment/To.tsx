"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ClearTo, updateDataState } from "@/redux/dataSlice";
import axios from "axios";
import BasicSelect from "../BasicSelect";

export default function To() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector((state) => state.data.to);
  const [isEdit, setIsEdit] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

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

                dispatch(
                  updateDataState({
                    path: ["to"],
                    updates: {
                      receiverName: selectedAddressData.fullName,
                      receiverAttention: selectedAddressData.attentionName,
                      receiverAddressLine: selectedAddressData.addressLineOne,
                      receiverPostalCode: selectedAddressData.zipCode,
                      receiverCity: selectedAddressData.city,
                      receiverState: selectedAddressData.state,
                      receiverCountry: selectedAddressData.countryCode,
                      selectedAddress: value,
                    },
                  })
                );

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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverName: e.target.value,
                            },
                          })
                        );
                      }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverAttention: e.target.value,
                            },
                          })
                        );
                      }}
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
                    onChange={(e) => {
                      dispatch(
                        updateDataState({
                          path: ["to"],
                          updates: {
                            receiverAddressLine: e.target.value,
                          },
                        })
                      );
                    }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverPostalCode: e.target.value,
                            },
                          })
                        );
                      }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverCity: e.target.value,
                            },
                          })
                        );
                      }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverState: e.target.value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={shipmentData.email}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              email: e.target.value,
                            },
                          })
                        );
                      }}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="receiverPhone" className="text-xs">
                      Phone
                    </Label>
                    <Input
                      type="text"
                      name="receiverPhone"
                      value={shipmentData.receiverPhone}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverPhone: e.target.value,
                            },
                          })
                        );
                      }}
                      placeholder="Enter phone number"
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              receiverCountry: e.target.value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-to"
                      checked={shipmentData.edit}
                      onCheckedChange={(checked) => {
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              edit: checked,
                              add: false,
                            },
                          })
                        );
                      }}
                    />
                    <label
                      htmlFor="edit-to"
                      className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save Edits to this Address
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="add-to"
                      checked={shipmentData.add}
                      onCheckedChange={(checked) => {
                        dispatch(ClearTo());
                        dispatch(
                          updateDataState({
                            path: ["to"],
                            updates: {
                              add: checked,
                              edit: false,
                            },
                          })
                        );
                      }}
                    />
                    <label
                      htmlFor="add-to"
                      className="text-xs lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save as New Address book
                    </label>
                  </div>
                </div>
              </div>
            ) : Object.entries(shipmentData).filter(([_, value]) =>
                typeof value === "string"
                  ? value.trim()
                  : value && typeof value !== "boolean"
              ).length > 0 ? (
              <p className="text-xs">
                {Object.entries(shipmentData)
                  .filter(([_, value]) =>
                    typeof value === "string"
                      ? value.trim()
                      : value && typeof value !== "boolean"
                  )
                  .map(([_, value], index, filteredArray) => (
                    <span key={index} className="mr-1">
                      {value?.toString()}
                      {index < filteredArray.length - 1 && ","}{" "}
                    </span>
                  ))}
              </p>
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
