"use client";

export interface IPickup {
  _id: string;
  refNo: string;
  pickUpLocationId: string;
}

import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";

export default function Tracking() {
  const [inquiryNumber, setInquiryNumber] = useState("dki9339k");
  const [pickups, setPickups] = useState<IPickup[]>([]);
  const [selectedPickupRefNo, setSelectedPickupRefNo] = useState("");
  const [transId, setTransId] = useState(
    "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv"
  );
  const [transactionSrc, setTransactionSrc] = useState(
    "pfecjSUu1pYAQ32AV9sh3WVkPBOyVjYKXCz5zjymmO8cDMQa6HLbY4etlAoRFglG"
  );
  const [response, setResponse] = useState(null);

  useEffect(() => {
    getPickups();
  }, []);

  const getPickups = useCallback(async () => {
    try {
      const res = await fetch("/api/pickup/store", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data: { pickups: IPickup[] } = await res.json();
      setPickups(data.pickups);
    } catch (error) {
      console.error("Error getting pickups:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryNumber,
          transId,
          transactionSrc,
          referenceNumber: !!selectedPickupRefNo
            ? selectedPickupRefNo
            : pickups[0]?.refNo,
          fromPickUpDate: new Date().toISOString(),
          toPickUpDate: new Date().toISOString(),
          refNumType: "SmallPackage. Valid values: SmallPackage, fgv",
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto flex flex-col gap-4 mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600">
          Tracking shipment
        </h2>
        <div>
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
        </div>
        <div>
          <label> Reference Number:</label>
          <select
            value={selectedPickupRefNo}
            onChange={(e) => setSelectedPickupRefNo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            {pickups.map((item) => (
              <option value={item.refNo}>{item.refNo}</option>
            ))}
          </select>
        </div>
        <Button type="submit" className="w-full">
          Track
        </Button>
      </form>

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
