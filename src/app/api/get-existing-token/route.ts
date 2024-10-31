import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let token = cookies().get("access_token")?.value;

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
