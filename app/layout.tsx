import type { Metadata } from "next";
import { Libre_Franklin, Space_Grotesk, Oxanium } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
  title: "Patrick Tumbucon - Software Engineer",
  description: "Personal portfolio of Patrick Tumbucon, Identity Governance Software Engineer at Microsoft",
  keywords: ["Patrick Tumbucon", "Software Engineer", "Microsoft", "Identity Governance", "Portfolio"],
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
      </body>
    </html>
  );
}
