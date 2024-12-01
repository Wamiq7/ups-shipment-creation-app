import type { Metadata } from "next";
import localFont from "next/font/local";
import StoreProvider from "@/redux/StoreProvider";
import "./globals.css";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "UPS - Shipment",
  description: "Create and track your shipments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-c-light-gray overflow-y-scroll`}
      >
        <StoreProvider>
          <Suspense>{children}</Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
