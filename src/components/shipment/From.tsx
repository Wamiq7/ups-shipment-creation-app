"use client";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { updateDataState } from "@/redux/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import axios from "axios";
import BasicSelect from "../BasicSelect";

export default function From() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector((state) => state.data.from);
  const [isEdit, setIsEdit] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

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

                dispatch(
                  updateDataState({
                    path: ["from"],
                    updates: {
                      senderName: selectedAddressData.senderName,
                      senderAttention: selectedAddressData.senderAttention,
                      senderAddressLine:
                        selectedAddressData.shipFromAddressLine,
                      senderPostalCode: selectedAddressData.shipFromPostalCode,
                      senderCity: selectedAddressData.shipFromCity,
                      senderState: selectedAddressData.shipFromState,
                      senderFax: selectedAddressData.shipFromFax,
                      senderPhone: selectedAddressData.shipFromPhone,
                      senderCountry: selectedAddressData.shipFromCountry,
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
                    <Label htmlFor="senderName" className="text-xs">
                      Full Name or Company Name *
                    </Label>
                    <Input
                      type="text"
                      name="senderName"
                      value={shipmentData.senderName}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderName: e.target.value,
                            },
                          })
                        );
                      }}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="senderAttention" className="text-xs">
                      Contact Name
                    </Label>
                    <Input
                      type="text"
                      name="senderAttention"
                      value={shipmentData.senderAttention}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderAttention: e.target.value,
                            },
                          })
                        );
                      }}
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
                    onChange={(e) => {
                      dispatch(
                        updateDataState({
                          path: ["from"],
                          updates: {
                            senderAddressLine: e.target.value,
                          },
                        })
                      );
                    }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderPostalCode: e.target.value,
                            },
                          })
                        );
                      }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderCity: e.target.value,
                            },
                          })
                        );
                      }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderState: e.target.value,
                            },
                          })
                        );
                      }}
                      placeholder="Enter state"
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
                            path: ["from"],
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
                    <Label htmlFor="senderPhone" className="text-xs">
                      Phone *
                    </Label>
                    <Input
                      type="text"
                      name="senderPhone"
                      value={shipmentData.senderPhone}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderPhone: e.target.value,
                            },
                          })
                        );
                      }}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="senderCountry" className="text-xs">
                      Country Code
                    </Label>
                    <Input
                      type="text"
                      name="senderCountry"
                      value={shipmentData.senderCountry}
                      onChange={(e) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderCountry: e.target.value,
                            },
                          })
                        );
                      }}
                      placeholder="Enter country code"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit"
                      checked={shipmentData.edit}
                      onCheckedChange={(checked) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
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
                      checked={shipmentData.add}
                      onCheckedChange={(checked) => {
                        dispatch(
                          updateDataState({
                            path: ["from"],
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
        </div>
      </CardContent>
    </Card>
  );
}
