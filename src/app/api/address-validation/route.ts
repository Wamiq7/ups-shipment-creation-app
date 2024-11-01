import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      regionalrequestindicator,
      maximumcandidatelistsize,
      addressPayload,
    } = await req.json();

    const token = req.cookies.get("access_token")?.value;

    if (!token?.valueOf) {
      throw new Error("Token not found");
    }

    const payload = {
      XAVRequest: { ...addressPayload },
    };

    const response = await fetch(
      `${process.env.BASE_URL}/api/addressvalidation/v2/1?regionalrequestindicator=${regionalrequestindicator}&maximumcandidatelistsize=${maximumcandidatelistsize}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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
  } catch (error: any) {
    console.error("Error in label recovery:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
