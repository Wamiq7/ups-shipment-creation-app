import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token=req.cookies.get("access_token")?.value;

    return NextResponse.json({ message: "Success", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error occurred while creating shipment",
        error: error,
      },
      { status: 500 }
    );
  }
}
