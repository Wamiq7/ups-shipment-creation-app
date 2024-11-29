import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      transId = "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv",
      transactionSrc = "testing",
      payload,
    } = await req.json();

    const pickupPayload = {
      PickupRateRequest: {
        PickupAddress: {
          AddressLine: payload.pickUpLocation.shipFromAddressLine,
          City: payload.pickUpLocation.shipFromCity,
          StateProvince: payload.pickUpLocation.shipFromState,
          PostalCode: payload.pickUpLocation.shipFromPostalCode,
          CountryCode: payload.pickUpLocation.shipFromCountry,
          ResidentialIndicator:
            payload.pickUpLocation.residentialIndicator || "N", // 'Y' or 'N'
        },
        AlternateAddressIndicator: "N", // Assuming no alternate address
        ServiceDateOption: payload.packageShipmentDetails.serviceType || "02",
        PickupDateInfo: {
          CloseTime: "2000",
          ReadyTime: "0900",
          PickupDate: "20160405",
        },
      },
    };

    const version = "v2403";
    const token = req.cookies.get("access_token")?.value;

    if (!token?.valueOf) {
      throw new Error("Token not found");
    }

    const response = await fetch(
      `${process.env.BASE_URL}/api/shipments/${version}/pickup/${payload.pickupType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transId: transId,
          transactionSrc: transactionSrc,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pickupPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from UPS API:", errorData);
      return NextResponse.json(
        { message: "Failed to create pickup", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error creating pickup:", error);
    return NextResponse.json(
      {
        message: "Error occurred while creating pickup",
        error: error,
      },
      { status: 500 }
    );
  }
}
