import type { Metadata } from "next";
import { Libre_Franklin, Space_Grotesk, Oxanium } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Patrick Tumbucon",
  description: "Personal portfolio of Patrick Tumbucon",
  keywords: ["Patrick Tumbucon", "Software Engineer", "Microsoft", "Identity Governance", "Portfolio"],
  openGraph: {
    title: "Patrick Tumbucon - Software Engineer",
    description: "Personal portfolio of Patrick Tumbucon, Identity Governance Software Engineer at Microsoft",
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
    description: "Personal portfolio of Patrick Tumbucon, Software Engineer",
    images: ["/linkPreview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${spaceGrotesk.variable} ${oxanium.variable}`}>
      <body className="font-sans bg-dark">
        <Navigation />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
