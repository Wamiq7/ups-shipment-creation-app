import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { ShipmentProfile } from "@/models/shipment-profile.model";
import { getUserFromToken } from "@/lib/helper";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Find the shipment profile by ID and update it
    const updatedShipmentProfile = await ShipmentProfile.findOneAndUpdate(
      { _id: params.id, userId: token_user._id }, // Ensure the profile belongs to the current user
      { name }, // Update the name
      { new: true } // Return the updated document
    );

    if (!updatedShipmentProfile) {
      return NextResponse.json(
        {
          message:
            "Shipment profile not found or you don't have permission to update it",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Shipment profile updated successfully",
        data: updatedShipmentProfile,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update shipment profile", error: err.message },
      { status: 500 }
    );
  }
}
