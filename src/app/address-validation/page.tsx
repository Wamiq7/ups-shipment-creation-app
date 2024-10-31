// "use client";

// import React, { useState } from "react";

// const AddressValidation = () => {
//   const [regionalRequestIndicator, setRegionalRequestIndicator] =
//     useState("True");
//   const [maximumCandidateListSize, setMaximumCandidateListSize] = useState("1");
//   const [consigneeName, setConsigneeName] = useState(
//     "RITZ CAMERA CENTERS-1749"
//   );
//   const [buildingName, setBuildingName] = useState("Innoplex");
//   const [addressLine1, setAddressLine1] = useState("26601 ALISO CREEK ROAD");
//   const [addressLine2, setAddressLine2] = useState("ALISO VIEJO TOWN CENTER");
//   const [region, setRegion] = useState("ROSWELL,GA,30076-1521");
//   const [politicalDivision2, setPoliticalDivision2] = useState("ALISO VIEJO");
//   const [politicalDivision1, setPoliticalDivision1] = useState("CA");
//   const [postcodePrimaryLow, setPostcodePrimaryLow] = useState("92656");
//   const [postcodeExtendedLow, setPostcodeExtendedLow] = useState("1521");
//   const [urbanization, setUrbanization] = useState("porto arundal");
//   const [countryCode, setCountryCode] = useState("US");
//   const [responseData, setResponseData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(""); // Clear previous error messages

//     const response = await fetch("/api/address-validation", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         regionalrequestindicator: regionalRequestIndicator,
//         maximumcandidatelistsize: maximumCandidateListSize,
//         addressPayload: {
//           AddressKeyFormat: {
//             ConsigneeName: consigneeName,
//             BuildingName: buildingName,
//             AddressLine: [addressLine1, addressLine2].filter(Boolean), // Filter out empty lines
//             Region: region,
//             PoliticalDivision2: politicalDivision2,
//             PoliticalDivision1: politicalDivision1,
//             PostcodePrimaryLow: postcodePrimaryLow,
//             PostcodeExtendedLow: postcodeExtendedLow,
//             Urbanization: urbanization,
//             CountryCode: countryCode,
//           },
//         },
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setResponseData(data); // Store the response data
//     } else {
//       const errorData = await response.json();
//       setErrorMessage(errorData.message || "An error occurred");
//       setResponseData(null); // Clear previous response data on error
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
//       <h2 className="text-lg font-bold mb-4">Address Validation</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label className="block mb-2">Regional Request Indicator:</label>
//           <input
//             type="text"
//             value={regionalRequestIndicator}
//             onChange={(e) => setRegionalRequestIndicator(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Maximum Candidate List Size:</label>
//           <input
//             type="number"
//             value={maximumCandidateListSize}
//             onChange={(e) => setMaximumCandidateListSize(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Consignee Name:</label>
//           <input
//             type="text"
//             value={consigneeName}
//             onChange={(e) => setConsigneeName(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Building Name:</label>
//           <input
//             type="text"
//             value={buildingName}
//             onChange={(e) => setBuildingName(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Address Line 1:</label>
//           <input
//             type="text"
//             value={addressLine1}
//             onChange={(e) => setAddressLine1(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Address Line 2:</label>
//           <input
//             type="text"
//             value={addressLine2}
//             onChange={(e) => setAddressLine2(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Region:</label>
//           <input
//             type="text"
//             value={region}
//             onChange={(e) => setRegion(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Political Division 1:</label>
//           <input
//             type="text"
//             value={politicalDivision1}
//             onChange={(e) => setPoliticalDivision1(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Political Division 2:</label>
//           <input
//             type="text"
//             value={politicalDivision2}
//             onChange={(e) => setPoliticalDivision2(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Postcode Primary Low:</label>
//           <input
//             type="text"
//             value={postcodePrimaryLow}
//             onChange={(e) => setPostcodePrimaryLow(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Postcode Extended Low:</label>
//           <input
//             type="text"
//             value={postcodeExtendedLow}
//             onChange={(e) => setPostcodeExtendedLow(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Urbanization:</label>
//           <input
//             type="text"
//             value={urbanization}
//             onChange={(e) => setUrbanization(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Country Code:</label>
//           <input
//             type="text"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//         >
//           Validate Address
//         </button>
//       </form>

//       {errorMessage && (
//         <div className="mt-4 text-red-600">
//           <p>{errorMessage}</p>
//         </div>
//       )}

//       {responseData && (
//         <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
//           <h3 className="font-bold">Response Data:</h3>
//           <pre>{JSON.stringify(responseData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressValidation;
