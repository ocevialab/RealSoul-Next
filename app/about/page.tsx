import React from "react";
import Footer from "../components/Footer";
import Services from "../components/Services";

import { JSX } from "react/jsx-runtime";
import AboutSection from "./components/AboutSection";
import Gear from "./components/Gear";
import BeyondStudio from "./components/BeyondStudio";

import EqImages from "./components/EqImages";

export default function page(): JSX.Element {
  return (
    <div className=" text-white min-h-screen mt-16">
      {/* About Me */}
      <AboutSection />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[50px]  md:h-[100px] bg-gradient-to-b from-darkGreen/95 to-darkGreen/80" />
      {/* Values / Services */}
      <Services />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[40px]  md:h-[80px] bg-gradient-to-b from-darkGreen/80 to-darkGreen" />
      <EqImages />
      <div className="pointer-events-none inset-x-0 bottom-0 h-[40px]  md:h-[80px] bg-gradient-to-t from-darkGreen/80 to-darkGreen" />
      {/* Gear Section */}
      <Gear />

      {/* Beyond the Studio */}
      <BeyondStudio />

      <Footer />
    </div>
  );
}
