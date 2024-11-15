import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connectToMongoDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await connectToMongoDB();
    const { identifier, password } = await request.json();

    // Check if the identifier is an email or username and query the database accordingly
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Return the token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  }
}
