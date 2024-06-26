require("dotenv").config();
import type { Metadata } from "next";
import { Days_One } from "next/font/google";
import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";

const days = Days_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "snake_game",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={days.className}>{children}</body>
    </html>
  );
}
