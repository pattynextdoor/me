import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Patrick Tumbucon",
  description: "Personal portfolio of Patrick Tumbucon",
  keywords: ["Patrick Tumbucon", "Senior Software Engineer", "Full Stack Developer", "Portfolio"],
  metadataBase: new URL("https://patricktumbucon.com"),
  openGraph: {
    title: "Patrick Tumbucon - Software Engineer",
    description: "Patrick Tumbucon's personal website",
    url: "https://patricktumbucon.com",
    siteName: "Patrick Tumbucon",
    images: [
      {
        url: "/linkPreview.png",
        width: 1200,
        height: 630,
        alt: "Patrick Tumbucon - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Tumbucon - Software Engineer",
    description: "Personal website of Patrick Tumbucon, Software Engineer",
    images: ["/linkPreview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="font-mono bg-background text-primary antialiased grain-overlay">
        <CustomCursor />
        <main className="relative z-10">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
