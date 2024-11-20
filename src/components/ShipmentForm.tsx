import React from "react";

export interface ShipmentData {
  description: string;
  senderName: string;
  senderAttention: string;
  senderTaxId: string;
  senderPhone: string;
  senderFax: string;
  senderAddressLine: string;
  senderCity: string;
  senderState: string;
  senderPostalCode: string;
  senderCountry: string;
  receiverName: string;
  receiverAttention: string;
  receiverPhone: string;
  receiverAddressLine: string;
  receiverCity: string;
  receiverState: string;
  receiverPostalCode: string;
  receiverCountry: string;
  shipFromName: string;
  shipFromAttention: string;
  shipFromPhone: string;
  shipFromFax: string;
  shipFromAddressLine: string;
  shipFromCity: string;
  shipFromState: string;
  shipFromPostalCode: string;
  shipFromCountry: string;
  shipDate: string;
  pkgeQuantity: string;
  packageType: string;
  packageDescription: string;
  packageLength: string;
  packageWidth: string;
  packageHeight: string;
  packageWeight: string;
  serviceType: string;
  isSignatureRequired: boolean;
}

function ShipmentForm({
  shipmentData,
  setShipmentData,
}: {
  shipmentData: ShipmentData;
  setShipmentData: React.Dispatch<React.SetStateAction<ShipmentData>>;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-600">
        Shipping Information
      </h1>

      {/* Shipment Description */}
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={shipmentData.description}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      {/* Sender Information */}
      <h2 className="text-xl font-semibold mt-4">Sender Information</h2>
      {/* <div>
        <label>Sender Name:</label>
        <input
          type="text"
          name="senderName"
          value={shipmentData.senderName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Attention Name:</label>
        <input
          type="text"
          name="senderAttention"
          value={shipmentData.senderAttention}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Tax Identification Number:</label>
        <input
          type="text"
          name="senderTaxId"
          value={shipmentData.senderTaxId}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="senderPhone"
          value={shipmentData.senderPhone}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Fax Number:</label>
        <input
          type="text"
          name="senderFax"
          value={shipmentData.senderFax}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Address Line:</label>
        <input
          type="text"
          name="senderAddressLine"
          value={shipmentData.senderAddressLine}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>City:</label>
        <input
          type="text"
          name="senderCity"
          value={shipmentData.senderCity}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>State:</label>
        <input
          type="text"
          name="senderState"
          value={shipmentData.senderState}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="senderPostalCode"
          value={shipmentData.senderPostalCode}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Country Code:</label>
        <input
          type="text"
          name="senderCountry"
          value={shipmentData.senderCountry}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}

      {/* Receiver Information */}
      <h2 className="text-xl font-semibold mt-4">Receiver Information</h2>
      {/* <div>
        <label>Receiver Name:</label>
        <input
          type="text"
          name="receiverName"
          value={shipmentData.receiverName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Attention Name:</label>
        <input
          type="text"
          name="receiverAttention"
          value={shipmentData.receiverAttention}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="receiverPhone"
          value={shipmentData.receiverPhone}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Address Line:</label>
        <input
          type="text"
          name="receiverAddressLine"
          value={shipmentData.receiverAddressLine}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>City:</label>
        <input
          type="text"
          name="receiverCity"
          value={shipmentData.receiverCity}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>State:</label>
        <input
          type="text"
          name="receiverState"
          value={shipmentData.receiverState}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="receiverPostalCode"
          value={shipmentData.receiverPostalCode}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Country Code:</label>
        <input
          type="text"
          name="receiverCountry"
          value={shipmentData.receiverCountry}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}

      {/* Ship From Information */}
      <h2 className="text-xl font-semibold mt-4">Ship From Information</h2>
      <div>
        <label>Ship From Name:</label>
        <input
          type="text"
          name="shipFromName"
          value={shipmentData.shipFromName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Attention Name:</label>
        <input
          type="text"
          name="shipFromAttention"
          value={shipmentData.shipFromAttention}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="shipFromPhone"
          value={shipmentData.shipFromPhone}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Fax Number:</label>
        <input
          type="text"
          name="shipFromFax"
          value={shipmentData.shipFromFax}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Address Line:</label>
        <input
          type="text"
          name="shipFromAddressLine"
          value={shipmentData.shipFromAddressLine}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="shipFromCity"
          value={shipmentData.shipFromCity}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="shipFromState"
          value={shipmentData.shipFromState}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="shipFromPostalCode"
          value={shipmentData.shipFromPostalCode}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div>
        <label>Country Code:</label>
        <input
          type="text"
          name="shipFromCountry"
          value={shipmentData.shipFromCountry}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      {/* Package Details */}
      <h2 className="text-xl font-semibold mt-4">Package Details</h2>
      <div>
        <label>Package Description:</label>
        <input
          type="text"
          name="packageDescription"
          value={shipmentData.packageDescription}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      {/* <div>
        <label>Dimensions (inches):</label>
        <div className="flex gap-4">
          <input
            type="text"
            name="packageLength"
            placeholder="Length"
            value={shipmentData.packageLength}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <input
            type="text"
            name="packageWidth"
            placeholder="Width"
            value={shipmentData.packageWidth}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <input
            type="text"
            name="packageHeight"
            placeholder="Height"
            value={shipmentData.packageHeight}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>
      </div> */}
      {/* <div>
        <label>Package Weight (lbs):</label>
        <input
          type="text"
          name="packageWeight"
          value={shipmentData.packageWeight}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div> */}
      {/* <div>
        <label>Service Type:</label>
        <select
          name="serviceType"
          value={shipmentData.serviceType}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value="03">Ground</option>
          <option value="02">2nd Day Air</option>
          <option value="01">Next Day Air</option>
        </select>
      </div> */}
    </div>
  );
}

export default ShipmentForm;
