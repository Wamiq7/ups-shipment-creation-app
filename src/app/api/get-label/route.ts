import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// API Route to handle POST request for label recovery
export async function POST(req: NextRequest) {
  try {
    const { TrackingNumber } = await req.json();

    const labelPayload = {
      LabelRecoveryRequest: {
        Request: {
          RequestOption: "Non_Validate",
          SubVersion: "1903",
          TransactionReference: {
            CustomerContext: "",
            TransactionIdentifier: ""
          }
        },
        LabelSpecification: {
          HTTPUserAgent: "Mozilla/4.5",
          LabelImageFormat: { Code: "ZPL" },
          LabelStockSize: { Height: "6", Width: "4" }
        },
        Translate: {
          LanguageCode: "eng",
          DialectCode: "US",
          Code: "01"
        },
        LabelDelivery: {
          LabelLinkIndicator: "",
          ResendEmailIndicator: ""
        },
        TrackingNumber: TrackingNumber || "1Z12345E8791315509"
      }
    };

    const version = "v2403"; 
    const token = cookies().get("access_token")?.value;
    const response = await fetch(
      `${process.env.BASE_URL}/api/labels/${version}/recovery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(labelPayload)
      }
    );

    const responseData = await response.json();

    if (response.status === 200) {
      return NextResponse.json(responseData, { status: 200 });
    }

    // Handle 400, 401, 403, and 429 cases
    if (response.status === 400) {
      return NextResponse.json(
        { message: "Invalid request", errors: responseData.errors },
        { status: 400 }
      );
    }

    if (response.status === 401) {
      return NextResponse.json(
        { message: "Unauthorized request", errors: responseData.errors },
        { status: 401 }
      );
    }

    if (response.status === 403) {
      return NextResponse.json(
        { message: "Blocked Merchant", errors: responseData.errors },
        { status: 403 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { message: "Rate limit exceeded", errors: responseData.errors },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { message: "Unexpected error occurred", details: responseData },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error},
      { status: 500 }
    );
  }
}
