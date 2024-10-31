import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// API Route to handle POST request for creating shipment
export async function POST(req: NextRequest) {
  try {
    // Extract shipment details from the request body
    const {
      additionaladdressvalidation = "1",
      transId = "HDBGJqCPsGUEfpTwHpJPfEUGd0a1CfWiGKyYy6wqKNbydtnv",
      transactionSrc = "testing",
      payload,
    } = await req.json();

    // Construct the shipment payload for the UPS API
    const shipmentPayload = {
      ShipmentRequest: {
        Request: {
          SubVersion: "1801",
          RequestOption: "nonvalidate",
          TransactionReference: {
            CustomerContext: "",
          },
        },
        Shipment: {
          Description: "Ship WS test",
          Shipper: {
            Name: "ShipperName",
            AttentionName: "ShipperZs Attn Name",
            TaxIdentificationNumber: "123456",
            Phone: {
              Number: "1115554758",
              Extension: " ",
            },
            ShipperNumber: `${process.env.account_number}`,
            FaxNumber: "8002222222",
            Address: {
              AddressLine: ["2311 York Rd"],
              City: "Timonium",
              StateProvinceCode: "MD",
              PostalCode: "21093",
              CountryCode: "US",
            },
          },
          ShipTo: {
            Name: "Happy Dog Pet Supply",
            AttentionName: "1160b_74",
            Phone: {
              Number: "9225377171",
            },
            Address: {
              AddressLine: [payload.receiverAddressLine?.toString()],
              City: "timonium",
              StateProvinceCode: "MD",
              PostalCode: "21030",
              CountryCode: "US",
            },
            Residential: " ",
          },
          ShipFrom: {
            Name: "T and T Designs",
            AttentionName: "1160b_74",
            Phone: {
              Number: "1234567890",
            },
            FaxNumber: "1234567890",
            Address: {
              AddressLine: [payload.shipFromAddressLine?.toString()],
              City: "Alpharetta",
              StateProvinceCode: "GA",
              PostalCode: "30005",
              CountryCode: "US",
            },
          },
          PaymentInformation: {
            ShipmentCharge: {
              Type: "01",
              BillShipper: {
                AccountNumber: `${process.env.account_number}`,
              },
            },
          },
          Service: {
            Code: payload.serviceType.toString(),
            Description: "Express",
          },
          Package: {
            Description: " ",
            Packaging: {
              Code: "02",
              Description: "Nails",
            },
            Dimensions: {
              UnitOfMeasurement: {
                Code: "IN",
                Description: "Inches",
              },
              Length: payload.packageLength,
              Width: payload.packageWidth,
              Height: payload.packageHeight,
            },
            PackageWeight: {
              UnitOfMeasurement: {
                Code: "LBS",
                Description: "Pounds",
              },
              Weight: payload.packageWeight,
            },
          },
        },
        LabelSpecification: {
          LabelImageFormat: {
            Code: "GIF",
            Description: "GIF",
          },
          HTTPUserAgent: "Mozilla/4.5",
        },
      },
    };

    const version = "v2403"; // UPS API version

    const token = cookies().get("access_token")?.value;

    if (!token?.valueOf) {
      throw new Error("Token not found");
    }

    // Send request to UPS API to create the shipment
    const response = await fetch(
      `${process.env.BASE_URL}/api/shipments/${version}/ship?additionaladdressvalidation=${additionaladdressvalidation}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transId: transId,
          transactionSrc: transactionSrc,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shipmentPayload),
      }
    );

    // Handle UPS API response
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from UPS API:", errorData);
      return NextResponse.json(
        { message: "Failed to create shipment", details: errorData },
        { status: response.status }
      );
    }

    // Parse successful response
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Catch and log any errors in the process
    console.error("Error creating shipment:", error);
    return NextResponse.json(
      {
        message: "Error occurred while creating shipment",
        error: error,
      },
      { status: 500 }
    );
  }
}
