import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      transactionSrc = "testing",
      transId = "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv",
      shipment,
    } = await req.json();

    const ratingPayload = {
      RateRequest: {
        Request: {
          TransactionReference: {
            CustomerContext: "CustomerContext",
          },
          RequestOption: "rate", // this might be needed in payload
        },
        Shipment: {
          Shipper: {
            Name: shipment.senderName || "ShipperName",
            ShipperNumber: process.env.account_number,
            Address: {
              AddressLine: [
                shipment.senderAddressLine || "ShipperAddressLine",
                "ShipperAddressLine2",
                "ShipperAddressLine3",
              ],
              City: shipment.senderCity || "TIMONIUM",
              StateProvinceCode: shipment.senderState || "MD",
              PostalCode: shipment.senderPostalCode || "21093",
              CountryCode: shipment.senderCountry || "US",
            },
          },
          ShipTo: {
            Name: shipment.receiverName || "ShipToName",
            Address: {
              AddressLine: [
                shipment.receiverAddressLine || "ShipToAddressLine",
                "ShipToAddressLine2",
                "ShipToAddressLine3",
              ],
              City: shipment.receiverCity || "Alpharetta",
              StateProvinceCode: shipment.receiverState || "GA",
              PostalCode: shipment.receiverPostalCode || "30005",
              CountryCode: shipment.receiverCountry || "US",
            },
          },
          ShipFrom: {
            Name: shipment.shipFromName || "ShipFromName",
            Address: {
              AddressLine: [
                shipment.shipFromAddressLine || "ShipFromAddressLine",
                "ShipFromAddressLine2",
                "ShipFromAddressLine3",
              ],
              City: shipment.shipFromCity || "TIMONIUM",
              StateProvinceCode: shipment.shipFromState || "MD",
              PostalCode: shipment.shipFromPostalCode || "21093",
              CountryCode: shipment.shipFromCountry || "US",
            },
          },
          PaymentDetails: {
            ShipmentCharge: [
              {
                Type: "01",
                BillShipper: {
                  AccountNumber: process.env.account_number,
                },
              },
            ],
          },
          Service: {
            Code: shipment.serviceType || "03",
            Description: "Ground",
          },
          NumOfPieces: "1",
          Package: {
            SimpleRate: {
              Description: "SimpleRateDescription",
              Code: "XS",
            },
            PackagingType: {
              Code: "02",
              Description: shipment.packageDescription || "Packaging",
            },
            Dimensions: {
              UnitOfMeasurement: {
                Code: "IN",
                Description: "Inches",
              },
              Length: shipment.packageLength || "5",
              Width: shipment.packageWidth || "5",
              Height: shipment.packageHeight || "5",
            },
            PackageWeight: {
              UnitOfMeasurement: {
                Code: "LBS",
                Description: "Pounds",
              },
              Weight: shipment.packageWeight || "1",
            },
          },
        },
      },
    };

    const version = "v2403";
    const additionalInfo = "string";

    let token = cookies().get("access_token")?.value;

    if (!token?.valueOf) {
      throw new Error("Token not found");
    }

    const response = await fetch(
      `${process.env.BASE_URL}/api/rating/${version}/Rate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transId: transId,
          transactionSrc: transactionSrc,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ratingPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from UPS API:", errorData.response.errors);
      return NextResponse.json(
        { message: "Failed to get rating", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error getting rates:", error);
    return NextResponse.json(
      {
        message: "Error occurred while getting rates",
        error: error,
      },
      { status: 500 }
    );
  }
}
