import { connectToMongoDB } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(request: Request) {
  try {
    await connectToMongoDB();

    const { username, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Send JWT token in the response body
    return NextResponse.json(
      { message: "User registered successfully", token },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  }
}
