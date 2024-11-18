import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { AddressBook } from "@/models/address-book.model";

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

    const updatedAddressBookEntry = await AddressBook.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedAddressBookEntry) {
      return NextResponse.json(
        { message: "Address book entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Address book entry updated successfully",
        data: updatedAddressBookEntry,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update address book entry", error: err.message },
      { status: 500 }
    );
  }
}
