import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { AddressBook } from "@/models/address-book.model";
import { getUserFromToken } from "@/lib/helper";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectToMongoDB();

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

    const newAddressBookEntry = await AddressBook.create({
      texIdentificationNumber: body.texIdentificationNumber,
      fullName: body.fullName,
      contactName: body.contactName,
      addressLineOne: body.addressLineOne,
      zipCode: body.zipCode,
      city: body.city,
      state: body.state,
      faxNumber: body.faxNumber,
      phoneNumber: body.phoneNumber,
      country: body.country,
      userId: token_user._id,
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

// export async function GET() {
//   try {
//     await connectToMongoDB();
//     const users = await User.find({ role: 'user' });
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to fetch users', error }, { status: 500 });
//   }
// }
