import React from "react";
import GalleryPage from "./components/GalleryPage";

// app/gallery/page.tsx (or app/gallery/metadata.ts)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — RealSoul Photography | Melbourne Baby, Family & Wedding",
  description:
    "Browse the RealSoul Photography gallery: newborn and baby sessions, family portraits, couples and weddings across Melbourne & Greater Victoria. Natural, story-driven images with child-safe practices and true-to-life colour.",
  keywords: [
    "RealSoul Photography gallery",
    "Melbourne photography gallery",
    "baby photographer Melbourne",
    "newborn photos Melbourne",
    "family photography gallery",
    "wedding photography Melbourne",
    "portrait photographer Melbourne",
    "couple photos Melbourne",
  ],
  alternates: { canonical: "/gallery" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://your-domain.com/gallery",
    siteName: "RealSoul Photography",
    title: "Gallery — RealSoul Photography | Melbourne Baby, Family & Wedding",
    description:
      "See highlights from newborn, baby, family, couples and wedding shoots in Melbourne & Greater Victoria.",
    images: [
      {
        url: "/og/gallery.jpg", // 1200x630 recommended, place in /public/og/gallery.jpg
        width: 1200,
        height: 630,
        alt: "RealSoul Photography — Gallery highlights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — RealSoul Photography | Melbourne Baby, Family & Wedding",
    description:
      "Explore our latest newborn, family, couples and wedding photography in Melbourne.",
    images: ["/og/gallery.jpg"],
  },
  authors: [{ name: "Dushan Weerashingha" }],
  creator: "RealSoul",
};

function page() {
  return <GalleryPage />;
}

export default page;
