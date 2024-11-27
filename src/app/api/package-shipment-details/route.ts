import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { PackageShipmentDetails } from "@/models/package-shipment-details.model";
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

    const { shipDate, serviceType, packageType, packages } = body;

    if (
      !shipDate ||
      !serviceType ||
      !packageType ||
      !packages ||
      packages.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "All fields (shipDate, serviceType, packageType, and packages) are required",
        },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // Create a new PackageShipmentDetails document
    const newShipmentDetails = await PackageShipmentDetails.create({
      shipDate,
      serviceType,
      packageType,
      packages,
      profileId: token_user._id, // Assuming a profile is linked to the user
    });

    return NextResponse.json(
      {
        message: "Package shipment details created successfully",
        data: newShipmentDetails,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Failed to create package shipment details",
        error: err.message,
      },
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

    // Fetch all package shipment details for the user
    const shipmentProfiles = await PackageShipmentDetails.find({
      profileId: token_user._id, // Assuming the profile is linked to the user
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
