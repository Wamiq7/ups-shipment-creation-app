import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { To } from "@/models/to.model";

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

    const updatedToEntry = await To.findByIdAndUpdate(id, body, { new: true });

    if (!updatedToEntry) {
      return NextResponse.json(
        { message: "Address book TO entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Address book TO entry updated successfully",
        data: updatedToEntry,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update address book TO entry", error: err.message },
      { status: 500 }
    );
  }
}
