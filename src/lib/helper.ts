import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connectToMongoDB } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const getUserFromToken = async (token: string) => {
  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;

    if (!userId) {
      throw new Error("User ID is not found in the token");
    }

    await connectToMongoDB();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err: any) {
    console.error("Error fetching user from token:", err.message);
    throw new Error("Failed to fetch user from token");
  }
};

export { getUserFromToken };
