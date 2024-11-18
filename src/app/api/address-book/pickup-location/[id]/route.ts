import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { PickupLocation } from "@/models/pickup-location.model";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    await connectToMongoDB();

    const updatedPickupLocation = await PickupLocation.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedPickupLocation) {
      return NextResponse.json(
        { message: "Pickup location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Pickup location updated successfully",
        data: updatedPickupLocation,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update pickup location", error: err.message },
      { status: 500 }
    );
  }
}
