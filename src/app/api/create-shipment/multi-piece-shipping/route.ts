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
          SubVersion: "1701",
          RequestOption: "nonvalidate",
          TransactionReference: {
            CustomerContext: "",
          },
        },
        Shipment: {
          Description: "UPS Premier",
          Shipper: {
            Name: payload.from.senderName,
            AttentionName: payload.from.senderAttention,
            CompanyDisplayableName: "", // CompanyDisplayableName
            TaxIdentificationNumber: payload.from.senderTaxId,
            Phone: {
              Number: payload.from.senderPhone,
              Extension: payload.from.extension,
            },
            ShipperNumber: `${process.env.account_number}`,
            FaxNumber: payload.from.senderFax,
            EMailAddress: payload.from.email, // EMailAddress
            Address: {
              AddressLine: [
                payload.pickUpLocation.shipFromAddressLine?.toString(),
              ],
              City: payload.from.senderCity,
              StateProvinceCode: payload.from.senderState,
              PostalCode: payload.from.senderPostalCode,
              CountryCode: payload.from.senderCountry,
            },
          },
          ShipTo: {
            Name: payload.to.receiverName,
            AttentionName: payload.to.receiverAttention,
            CompanyDisplayableName: "", // CompanyDisplayableName
            TaxIdentificationNumber: "", // TaxIdentificationNumber
            Phone: {
              Number: payload.to.receiverPhone,
              Extension: "", // Extension
            },
            FaxNumber: "", // FaxNumber
            EMailAddress: payload.to.email, // EMailAddress
            Address: {
              AddressLine: [payload.to.receiverAddressLine?.toString()],
              City: payload.to.receiverCity,
              StateProvinceCode: payload.to.receiverState,
              PostalCode: payload.to.receiverPostalCode,
              CountryCode: payload.to.receiverCountry,
              ResidentialAddressIndicator: "Y", // ResidentialAddressIndicator
            },
            // Residential: " ",
          },
          ShipFrom: {
            Name: payload.pickUpLocation.shipFromName,
            AttentionName: payload.pickUpLocation.shipFromAttention,
            CompanyDisplayableName: "", // CompanyDisplayableName
            TaxIdentificationNumber: payload.from.senderTaxId, // TaxIdentificationNumber
            EMailAddress: payload.pickUpLocation.email, // EMailAddress
            Phone: {
              Number: payload.pickUpLocation.shipFromPhone,
              Extension: "", // Extension
            },
            FaxNumber: payload.pickUpLocation.shipFromFax,
            Address: {
              AddressLine: [
                payload.pickUpLocation.shipFromAddressLine?.toString(),
              ],
              City: payload.pickUpLocation.shipFromCity,
              StateProvinceCode: payload.pickUpLocation.shipFromState,
              PostalCode: payload.pickUpLocation.shipFromPostalCode,
              CountryCode: payload.pickUpLocation.shipFromCountry,
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
            Code: payload.packageShipmentDetails.serviceType.toString(),
            Description: "Express",
          },
          Package: getPackagesArray(payload),
        },
        LabelSpecification: {
          LabelImageFormat: {
            Code: "GIF",
            Description: "desc",
          },
          HTTPUserAgent: "Mozilla/4.5",
          LabelStockSize: {
            Height: "6",
            Width: "4",
          },
        },
      },
    };

    const version = "v2403"; // UPS API version

    const token = req.cookies.get("access_token")?.value;

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
    console.log(response);
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

const getPackagesArray = (payload: any) => {
  return payload.packageShipmentDetails?.packages.map((pkg: any) => ({
    Description: payload.packageShipmentDetails.description,
    Packaging: {
      Code: payload.packageShipmentDetails.packageType,
      Description: payload.packageShipmentDetails.packageDescription,
    },
    Dimensions: {
      UnitOfMeasurement: {
        Code: "IN",
        Description: "Inches",
      },
      Length: pkg.dimensions.packageLength,
      Width: pkg.dimensions.packageWidth,
      Height: pkg.dimensions.packageHeight,
    },
    PackageWeight: {
      UnitOfMeasurement: {
        Code: "LBS",
        Description: "Pounds",
      },
      Weight: pkg.packageWeight,
    },
  }));
};
