import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { AddressBook } from "@/models/address-book.model";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectToMongoDB();

    const newAddressBookEntry = await AddressBook.create({
      texIdentificationNumber: body.texIdentificationNumber,
      fullName: body.fullName,
      contactName: body.contactName,
      addressLineOne: body.addressLineOne,
      zipCode: body.zipCode,
      city: body.city,
      state: body.state,
      email: body.email,
      phoneNumber: body.phoneNumber,
      country: body.country,
      profileId: body.profileId,
    });

    return NextResponse.json(
      {
        message: "Address book entry created successfully",
        data: newAddressBookEntry,
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

    const froms = await AddressBook.find({ profileId });

    return NextResponse.json(froms, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tos", error: error.message },
      { status: 500 }
    );
  }
}
