// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const referenceNumber = searchParams.get("referenceNumber");
//     const fromPickUpDate =
//       searchParams.get("fromPickUpDate") || "currentDate-14";
//     const toPickUpDate = searchParams.get("toPickUpDate") || "currentDate";
//     const refNumType = searchParams.get("refNumType") || "SmallPackage";

//     if (!referenceNumber) {
//       return NextResponse.json(
//         { message: "Missing required referenceNumber query parameter." },
//         { status: 400 }
//       );
//     }

//     const token = req.cookies.get("access_token")?.value;

//     if (!token) {
//       return NextResponse.json(
//         { message: "Missing authorization token." },
//         { status: 401 }
//       );
//     }

//     // const fromPickUpDate = `${new Date().getFullYear()}-01-01`;
//     // const toPickUpDate = `${new Date().getFullYear()}-12-31`;

//     const apiUrl = `${
//       process.env.BASE_URL
//     }/api/track/v1/reference/details/${referenceNumber}?locale=en_US&fromPickUpDate=${fromPickUpDate}&toPickUpDate=${toPickUpDate}&refNumType=${encodeURIComponent(
//       refNumType
//     )}`;

//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         transId: "testing",
//         transactionSrc: "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv",
//       },
//     });

//     if (response.ok) {
//       const contentLength = response.headers.get("content-length");
//       if (contentLength && parseInt(contentLength, 10) > 0) {
//         const data = await response.json();
//         return NextResponse.json(data, { status: 200 });
//       } else {
//         console.warn("Empty response body");
//         return NextResponse.json(
//           { message: "Empty response body from UPS API" },
//           { status: 204 }
//         );
//       }
//     } else {
//       const errorText = await response.text();
//       console.error("UPS API Error:", errorText);
//       return NextResponse.json(
//         { message: "Failed to fetch UPS tracking details", error: errorText },
//         { status: response.status }
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching UPS tracking details:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error },
//       { status: 500 }
//     );
//   }
// }
