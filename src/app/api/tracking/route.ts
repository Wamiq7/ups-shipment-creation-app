import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Extract shipment details from the request body
  const {
    inquiryNumber,
    transId,
    transactionSrc,
    locale = "en_US",
    returnSignature = "false",
    returnMilestones = "false",
    returnPOD = "false",
  } = await req.json();

  if (!inquiryNumber || inquiryNumber.length < 7 || inquiryNumber.length > 34) {
    return NextResponse.json(
      {
        message: "Invalid inquiryNumber. Must be between 7 and 34 characters.",
      },
      { status: 400 }
    );
  }
  if (!transId) {
    return NextResponse.json(
      { message: "Missing required transId in headers." },
      { status: 400 }
    );
  }
  if (!transactionSrc) {
    return NextResponse.json(
      { message: "Missing required transactionSrc in headers." },
      { status: 400 }
    );
  }
  const version = "v1";
  const token = req.cookies.get("access_token")?.value;

  const apiUrl = `${process.env.BASE_URL}/api/track/${version}/details/${inquiryNumber}?locale=${locale}&returnSignature=${returnSignature}&returnMilestones=${returnMilestones}&returnPOD=${returnPOD}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transId: transId,
        transactionSrc: transactionSrc,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else if (response.status === 400) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: "Invalid request", details: errorData },
        { status: 400 }
      );
    } else if (response.status === 403) {
      return NextResponse.json(
        {
          message:
            "Blocked Merchant. You do not have permission to access this resource.",
        },
        { status: 403 }
      );
    } else if (response.status === 404) {
      return NextResponse.json(
        { message: "Tracking number information not found." },
        { status: 404 }
      );
    } else if (response.status === 500 || response.status === 503) {
      return NextResponse.json(
        { message: "Server error. Please try again later." },
        { status: response.status }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: "An unknown error occurred", details: errorData },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error while fetching tracking information:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
