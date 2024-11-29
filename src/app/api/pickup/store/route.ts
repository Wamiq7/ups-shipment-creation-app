import { connectToMongoDB } from "@/lib/db";
import { Pickup } from "@/models/pickups.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refNo, pickUpLocationId } = await req.json();

    if (!refNo) {
      throw new Error("Reference No not found");
    }

    if (!pickUpLocationId) {
      throw new Error("Pickup location ID is required");
    }

    await connectToMongoDB();

    const newPickup = await Pickup.create({
      refNo,
      pickUpLocationId
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


export async function GET() {
  try {
    await connectToMongoDB();

    const pickups = await Pickup.find();

    return NextResponse.json({ pickups },{ status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to get pickups", error: err },
      { status: 500 }
    );
  }
}
