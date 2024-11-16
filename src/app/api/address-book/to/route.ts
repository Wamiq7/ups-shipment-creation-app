import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { To } from "@/models/to.model";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectToMongoDB();

    const newAddressBookToEntry = await To.create({
      fullName: body.fullName,
      attentionName: body.attentionName,
      addressLineOne: body.addressLineOne,
      zipCode: body.zipCode,
      city: body.city,
      state: body.state,
      countryCode: body.countryCode,
      profileId: body.profileId,
    });

    return NextResponse.json(
      {
        message: "Address book TO entry created successfully",
        data: newAddressBookToEntry,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create address book entry", error: err.message },
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

    const tos = await To.find({ profileId });

    return NextResponse.json(tos, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tos", error: error.message },
      { status: 500 }
    );
  }
}
