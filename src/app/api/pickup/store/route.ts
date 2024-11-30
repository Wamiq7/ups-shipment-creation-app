import { connectToMongoDB } from "@/lib/db";
import { Pickup } from "@/models/pickups.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refNo, pickUpLocationId } = await req.json();

    if (!refNo || !pickUpLocationId) {
      throw new Error("Reference No or Pickup Location Id not found");
    }

    await connectToMongoDB();

    const newPickup = await Pickup.create({
      refNo,
      pickUpLocationId,
    });

    return NextResponse.json(
      {
        message: "pickup reference created successfully",
        data: newPickup,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create pickup reference entry", error: err },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();

    const pickups = await Pickup.find();

    if (pickups.length === 0) {
      return NextResponse.json(
        { message: "No pickup references found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pickups fetched successfully", data: pickups },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch pickup references", error: err },
      { status: 500 }
    );
  }
}
