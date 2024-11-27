// pages/api/getToken.js
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const url = "https://wwwcie.ups.com/security/v1/oauth/token";
  const params = { "x-merchant-id": process.env.account_number }; // Set this in your .env

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };

  const auth = {
    username: process.env.Client_ID, // Set this in your .env
    password: process.env.Client_Secret, // Set this in your .env
  };

  const data = "grant_type=client_credentials";

  try {
    const response = await axios.post(url, data, { headers, params, auth });
    const token = response.data.access_token;
    const tokenData = response.data;

    cookies().set({
      name: "access_token",
      value: tokenData.access_token,
      maxAge: tokenData.expires_in,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }
}
