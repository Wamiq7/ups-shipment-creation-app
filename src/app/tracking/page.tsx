"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Tracking() {
  // const [inquiryNumber, setInquiryNumber] = useState("dki9339k");
  // const [transId, setTransId] = useState(
  //   "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv"
  // );
  // const [transactionSrc, setTransactionSrc] = useState(
  //   "pfecjSUu1pYAQ32AV9sh3WVkPBOyVjYKXCz5zjymmO8cDMQa6HLbY4etlAoRFglG"
  // );
  const [response, setResponse] = useState<any>();
  const [pickupData, setPickupData] = useState([]);
  const [selectedRef, setSelectedRef] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryNumber: selectedRef,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const queryParams = new URLSearchParams({
  //       referenceNumber: selectedRef,
  //       locale: "en_US", // Default value, can be dynamic
  //       fromPickUpDate: "currentDate-14",
  //       toPickUpDate: "currentDate",
  //       refNumType: "SmallPackage", // Default value, can be dynamic
  //     }).toString();

  //     const res = await fetch(`/api/tracking/ref?${queryParams}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();
  //     setResponse(data);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleFetchPickups = async () => {
    try {
      const res = await fetch("/api/pickup/store", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setPickupData(data.data);
    } catch (error) {
      console.error("Error fetching pickups:", error);
    }
  };

  useEffect(() => {
    handleFetchPickups();
  }, []);

  console.log(pickupData);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-4 flex gap-8">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-lg font-semibold text-gray-600">
            List of References
          </h1>
          <Table className="bg-white rounded-lg shadow-lg ">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2">Id</TableHead>
                <TableHead>Ref No</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pickupData &&
                pickupData.map((pickup: any, index: number) => (
                  <TableRow key={pickup._id}>
                    <TableCell className="font-medium px-4 py-2">
                      {index + 1}
                    </TableCell>
                    <TableCell>{pickup.refNo}</TableCell>
                    <TableCell>
                      {new Date(pickup.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="max-w-screen-sm flex flex-col gap-2 w-full">
          <h1 className="text-lg font-semibold text-gray-600">
            Track Shipment
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 justify-end"
          >
            <Input
              type="text"
              placeholder="Search by reference number"
              className="bg-white"
              value={selectedRef}
              onChange={(e) => setSelectedRef(e.target.value)}
            />
            {/* <div>
              <label>Inquiry Number:</label>
              <input
                type="text"
                value={inquiryNumber}
                onChange={(e) => setInquiryNumber(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label>Transaction ID:</label>
              <input
                type="text"
                value={transId}
                onChange={(e) => setTransId(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label>Transaction Source:</label>
              <input
                type="text"
                value={transactionSrc}
                onChange={(e) => setTransactionSrc(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div> */}
            <div className="w-full flex justify-end">
              <Button type="submit" variant={"default"} className="w-fit">
                Track
              </Button>
            </div>
          </form>
          <div>
            <h1 className="text-lg font-semibold text-gray-600">
              Shipment Details
            </h1>
            {response && (
              <div>
                {response?.trackResponse.shipment.map((shipment, index) => (
                  <div key={index}>
                    <h2>Shipment {index + 1}</h2>
                    <p>
                      <strong>Inquiry Number:</strong> {shipment.inquiryNumber}
                    </p>

                    <h3>Package Details</h3>
                    {shipment.package.map((pkg, pkgIndex) => (
                      <div key={pkgIndex}>
                        <p>
                          <strong>Tracking Number:</strong> {pkg.trackingNumber}
                        </p>
                        <p>
                          <strong>Weight:</strong> {pkg.weight.weight}{" "}
                          {pkg.weight.unitOfMeasurement}
                        </p>
                        <p>
                          <strong>Dimensions:</strong> {pkg.dimension.length} x{" "}
                          {pkg.dimension.width} x {pkg.dimension.height}{" "}
                          {pkg.dimension.unitOfDimension}
                        </p>
                        <p>
                          <strong>Service:</strong> {pkg.service.description}
                        </p>
                        <p>
                          <strong>Current Status:</strong>{" "}
                          {pkg.currentStatus.description}
                        </p>

                        <h4>Activity</h4>
                        {pkg.activity.map((activity, actIndex) => (
                          <div
                            key={actIndex}
                            style={{
                              marginBottom: "10px",
                              borderBottom: "1px solid #ccc",
                              paddingBottom: "10px",
                            }}
                          >
                            <p>
                              <strong>Date:</strong> {activity.date}{" "}
                              {activity.time}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              {activity.status.description}
                            </p>
                            {activity.location?.address && (
                              <p>
                                <strong>Location:</strong>{" "}
                                {activity.location.address.city},{" "}
                                {activity.location.address.country}
                              </p>
                            )}
                          </div>
                        ))}

                        <h4>Address Details</h4>
                        {pkg.packageAddress.map((addr, addrIndex) => (
                          <p key={addrIndex}>
                            <strong>{addr.type}:</strong> {addr.address.city},{" "}
                            {addr.address.country}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
