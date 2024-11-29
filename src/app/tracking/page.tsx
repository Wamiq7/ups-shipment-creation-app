"use client";

export interface IPickup {
  _id: string;
  refNo: string;
  pickUpLocationId: string;
}

import React, { useCallback, useEffect, useState } from "react";

export default function Tracking() {
  const [inquiryNumber, setInquiryNumber] = useState("dki9339k");
  const [pickups, setPickups] = useState<IPickup[]>([]);
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
        body: JSON.stringify({ inquiryNumber, transId, transactionSrc }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto flex flex-col gap-4 mt-10">
      <form onSubmit={handleSubmit}>
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
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          type="submit"
        >
          Track
        </button>
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
