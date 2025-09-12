// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  applicationName: "RealSoul Photography",
  title: {
    default: "RealSoul Photography — Melbourne Baby, Family & Wedding",
    template: "%s | RealSoul Photography",
  },
  description:
    "Story-driven photography in Melbourne. Newborn & baby, family, couples and weddings across Greater Victoria. Gentle direction, child-safe practices, true-to-life colour.",
  keywords: [
    "Melbourne photographer",
    "baby photographer Melbourne",
    "newborn photography",
    "family photos",
    "wedding photographer Melbourne",
    "portrait photography",
    "school event photography",
    "Victoria photographer",
  ],
  category: "Photography",
  robots: { index: true, follow: true, googleBot: "index,follow" },
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://your-domain.com/",
    siteName: "RealSoul ",
    title: "RealSoul  — Melbourne Baby, Family & Wedding",
    description:
      "Natural, story-first photography in Melbourne: newborn & baby, family, couples and weddings.",
    images: [
      {
        url: "/og/home.jpg", // 1200x630 in /public/og/home.jpg
        width: 1200,
        height: 630,
        alt: "RealSoul Photography — Featured gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle", // optional
    creator: "@yourhandle", // optional
    title: "RealSoul Photography — Melbourne Baby, Family & Wedding",
    description:
      "Newborn, family, couples and wedding photography across Melbourne & Greater Victoria.",
    images: ["/og/home.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest", // optional if you have a PWA manifest
  authors: [{ name: "Dushan Weerashingha" }],
  creator: "RealSoul",
  publisher: "RealSoul",
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_TOKEN", // optional
    other: { "facebook-domain-verification": "FB_VERIFICATION_TOKEN" }, // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
