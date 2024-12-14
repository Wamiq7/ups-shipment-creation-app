"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Assuming a Button component exists
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "", // This will be username or email
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Clear the localStorage when redirected to the login page
    localStorage.removeItem("token");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function getToken() {
    try {
      const response = await fetch("/api/auth/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      router.push("/");
      // window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to log in");
      console.error("Error fetching token:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth/login", formData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        await getToken();
      }
    } catch (err: any) {
      console.log("err", err);
      setError(err.response?.data?.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid w-full items-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="identifier">Username or Email</Label>
              <Input
                id="identifier"
                name="identifier"
                placeholder="Enter username or email"
                type="text"
                value={formData.identifier}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="underline font-bold">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
