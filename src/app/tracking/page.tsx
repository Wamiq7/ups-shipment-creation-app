// "use client";

// import { useState } from "react";

// const Tracking = () => {
//   const [shipmentData, setShipmentData] = useState({
//     inquiryNumber: "dki9339k",
//     transId: "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv",
//     transactionSrc:
//       "pfecjSUu1pYAQ32AV9sh3WVkPBOyVjYKXCz5zjymmO8cDMQa6HLbY4etlAoRFglG",
//     locale: "en_US",
//     returnSignature: "false",
//     returnMilestones: "false",
//     returnPOD: "false",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setShipmentData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/tracking", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(shipmentData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Tracking Info:", result);
//         // Handle successful tracking info
//       } else {
//         console.error("Error:", result.message);
//         // Handle error accordingly
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label>Inquiry Number:</label>
//         <input
//           type="text"
//           name="inquiryNumber"
//           value={shipmentData.inquiryNumber}
//           onChange={handleChange}
//           required
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//         />
//       </div>
//       <div>
//         <label>Transaction ID:</label>
//         <input
//           type="text"
//           name="transId"
//           value={shipmentData.transId}
//           onChange={handleChange}
//           required
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//         />
//       </div>
//       <div>
//         <label>Transaction Source:</label>
//         <input
//           type="text"
//           name="transactionSrc"
//           value={shipmentData.transactionSrc}
//           onChange={handleChange}
//           required
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//         />
//       </div>
//       <div>
//         <label>Locale:</label>
//         <input
//           type="text"
//           name="locale"
//           value={shipmentData.locale}
//           onChange={handleChange}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white rounded-lg px-4 py-2"
//       >
//         Track Shipment
//       </button>
//     </form>
//   );
// };

// export default Tracking;
