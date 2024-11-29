import { connectToMongoDB } from "@/lib/db";
import { Pickup } from "@/models/pickups.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refNo } = await req.json();

    if (!refNo) {
      throw new Error("Reference No not found");
    }

    await connectToMongoDB();

    const newPickup = await Pickup.create({
      refNo,
    });

    return NextResponse.json(
      {
        message: "Address book entry created successfully",
        data: newPickup,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create address book entry", error: err },
      { status: 500 }
    );
  }
}
