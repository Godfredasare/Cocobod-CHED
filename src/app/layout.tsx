import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/components/ched/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHED Ghana | Cocoa Health and Extension Division",
  description: "The Cocoa Health and Extension Division (CHED) is dedicated to ensuring sustainable cocoa production through innovative extension services, disease control, and farmer education across Ghana.",
  keywords: ["CHED", "Cocoa Health", "Extension Division", "Ghana Cocoa", "COCOBOD", "Cocoa Industry", "Agriculture Ghana", "Cocoa Farmers"],
  authors: [{ name: "Cocoa Health and Extension Division" }],
  icons: {
    icon: "/images/ched-logo.png",
  },
  openGraph: {
    title: "CHED Ghana | Cocoa Health and Extension Division",
    description: "Dedicated to sustainable cocoa production through extension services and farmer education.",
    url: "https://www.ched.com.gh",
    siteName: "CHED Ghana",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
