import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { ShipmentProfile } from "@/models/shipment-profile.model";
import { getUserFromToken } from "@/lib/helper";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TOKEN USER
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header is missing" },
        { status: 400 }
      );
    }

    const header_token = authHeader.split(" ")[1];
    if (!header_token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }

    // Get user data from token
    const token_user = await getUserFromToken(header_token);
    // TOKEN USER

    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const newShipmentProfile = await ShipmentProfile.create({
      name,
      userId: token_user._id,
    });

    return NextResponse.json(
      {
        message: "Shipment profile created successfully",
        data: newShipmentProfile,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create shipment profile", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // TOKEN USER
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header is missing" },
        { status: 400 }
      );
    }

    const header_token = authHeader.split(" ")[1];
    if (!header_token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }

    // Get user data from token
    const token_user = await getUserFromToken(header_token);
    // TOKEN USER

    if (!token_user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMongoDB();

    const shipmentProfiles = await ShipmentProfile.find({
      userId: token_user._id,
    });

    return NextResponse.json(
      {
        message: "Shipment profiles retrieved successfully",
        data: shipmentProfiles,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to retrieve shipment profiles", error: err.message },
      { status: 500 }
    );
  }
}
