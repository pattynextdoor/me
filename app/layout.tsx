import type { Metadata } from "next";
import { Space_Grotesk, Oxanium, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patrick Tumbucon",
  description: "Personal portfolio of Patrick Tumbucon",
  keywords: ["Patrick Tumbucon", "Senior Software Engineer", "Full Stack Developer", "Portfolio"],
  metadataBase: new URL("https://patricktumbucon.com"),
  openGraph: {
    title: "Patrick Tumbucon - Software Engineer",
    description: "Patrick Tumbucon\'s personal website",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${oxanium.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-dark">
        <Navigation />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
