import React from "react";
import ContactPage from "./components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — RealSoul Photography | Book a Session in Melbourne",
  description:
    "Get in touch with RealSoul Photography in Melbourne. Enquire about newborn, baby, family, school events, engagements, and wedding photography. Email contact@realsoul.com or call +89 123456789 to check availability and pricing.",
  keywords: [
    "Contact RealSoul Photography",
    "Melbourne photographer contact",
    "baby photographer Melbourne",
    "newborn photography enquiry",
    "family photos Melbourne booking",
    "wedding photographer Melbourne contact",
    "school event photography Victoria",
    "portrait photographer contact",
  ],
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://your-domain.com/contact",
    siteName: "RealSoul Photography",
    title: "Contact — RealSoul Photography | Book a Session in Melbourne",
    description:
      "Enquire about newborn, baby, family, school events, engagements, and wedding photography in Melbourne & Greater Victoria. Email contact@realsoul.com or call +89 123456789.",
    images: [
      {
        url: "/og/contact.jpg", // place a 1200x630 image at /public/og/contact.jpg
        width: 1200,
        height: 630,
        alt: "Contact RealSoul Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — RealSoul Photography | Book a Session in Melbourne",
    description:
      "Message or call RealSoul Photography to book newborn, family, school events, and wedding shoots in Melbourne.",
    images: ["/og/contact.jpg"],
  },
  authors: [{ name: "Dushan Weerashingha" }],
  creator: "RealSoul",
};

function page() {
  return <ContactPage />;
}

export default page;
