import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { To } from "@/models/to.model";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { message: "Query parameter is required" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // Search for addresses containing the query string in addressLineOne
    const matchingAddresses = await To.find(
      {
        addressLineOne: { $regex: query, $options: "i" }, // Case-insensitive search
      },
      { addressLineOne: 1 } // Project only addressLineOne field in results
    ).limit(10); // Limit results to 10 suggestions

    if (matchingAddresses.length === 0) {
      return NextResponse.json(
        { message: "No matching addresses found" },
        { status: 404 }
      );
    }

    // Map results into the desired format
    const formattedSuggestions = matchingAddresses.map((address) => ({
      value: address.addressLineOne,
      label: address.addressLineOne,
    }));

    return NextResponse.json(
      {
        message: "Matching addresses retrieved successfully",
        data: formattedSuggestions,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to search addresses", error: err.message },
      { status: 500 }
    );
  }
}
