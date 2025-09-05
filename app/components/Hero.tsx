import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="relative h-screen w-screen z-10">
      {/* Landscape / default */}
      <Image
        src="/assets/images/Hero.jpg"
        alt="Hero Image"
        fill
        priority
        className="object-cover object-top  hidden md:block " // show on md+ (landscape)
      />

      {/* Portrait */}
      <Image
        src="/assets/images/Hero2.jpg"
        alt="Hero Image Portrait"
        fill
        priority
        className="object-cover block md:hidden" // show on small screens
      />
    </div>
  );
}

export default Hero;
