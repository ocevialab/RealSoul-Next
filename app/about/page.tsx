import type { Metadata } from "next";
import Footer from "../components/Footer";
import Services from "../components/Services";
import AboutSection from "./components/AboutSection";
import Gear from "./components/Gear";
import BeyondStudio from "./components/BeyondStudio";
import EqImages from "./components/EqImages";
import { JSX } from "react/jsx-runtime";

export const metadata: Metadata = {
  title: "About — RealSoul Photography",
  description:
    "Learn about Dushan Weerashingha and RealSoul — storytelling photography in Sri Lanka: weddings, portraits, and nature.",
  keywords: [
    "RealSoul Photography",
    "Dushan Weerashingha",
    "Australian photographer",
    "photographer australia",
    "child photography",
    "certified child photographer in australia",
    "wedding photography",
    "portrait photography",
    "nature photography",
    "Melbourne",
  ],
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "About — RealSoul Photography",
    description:
      "Based in Melbourne, Australia, Dushan Weerashingha specialises in baby photography—newborns, sitters and first birthdays—delivering gentle, natural images families treasure. He also covers the full life calendar of events, from kindergarten and primary school concerts to graduations, engagements and weddings. Expect relaxed direction, child-safe practices, and true-to-life colour that feels timeless. Whether it’s a quiet newborn session at home, a lively school celebration or an elegant wedding, Dushan tells each story with care and craft—serving Melbourne and greater Victoria.",
    url: "https://your-domain.com/about",
    siteName: "RealSoul Photography",
    images: [
      {
        url: "/og/about.jpg", // put a 1200x630 image in /public/og/about.jpg
        width: 1200,
        height: 630,
        alt: "About RealSoul Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — RealSoul Photography",
    description:
      "Story-driven photography by Dushan Weerashingha. Weddings, portraits, nature.",
    images: ["/og/about.jpg"],
  },
  authors: [{ name: "Dushan Weerashingha" }],
  creator: "RealSoul",
};

export default function Page(): JSX.Element {
  return (
    <div className="text-white min-h-screen mt-16">
      <AboutSection />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px] md:h-[100px] bg-gradient-to-b from-darkGreen/95 to-darkGreen/80" />
      <Services />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[40px] md:h-[80px] bg-gradient-to-b from-darkGreen/80 to-darkGreen" />
      <EqImages />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[40px] md:h-[80px] bg-gradient-to-t from-darkGreen/80 to-darkGreen" />
      <Gear />
      <BeyondStudio />
      <Footer />
    </div>
  );
}
