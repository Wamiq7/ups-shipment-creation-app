import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { PickupLocation } from "@/models/pickup-location.model";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectToMongoDB();

    const newPickupLocation = await PickupLocation.create({
      countryOrTerritory: body.countryOrTerritory,
      fullName: body.fullName,
      contactName: body.contactName,
      addressLineOne: body.addressLineOne,
      zipCode: body.zipCode,
      city: body.city,
      state: body.state,
      email: body.email,
      phone: body.phone,
      extension: body.extension,
      profileId: body.profileId,
    });

    return NextResponse.json(
      {
        message: "Pickup location created successfully",
        data: newPickupLocation,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create pickup location", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectToMongoDB();

    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        { message: "profileId is required in query parameters." },
        { status: 400 }
      );
    }

    const pickupLocations = await PickupLocation.find({ profileId });

    return NextResponse.json(
      {
        message: "Pickup locations fetched successfully",
        data: pickupLocations,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch pickup locations", error: error.message },
      { status: 500 }
    );
  }
}
