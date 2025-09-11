"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function EqImages() {
  const images = [
    "/assets/images/eq1.png",

    "/assets/images/eq2.png",
    "/assets/images/eq3.png",
    "/assets/images/eq4.png",
    "/assets/images/eq5.png",
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Images — sequential scale-in
      const imgWrap = sectionRef.current!.querySelector<HTMLElement>(
        "[data-reveal-image]"
      );
      const cards = gsap.utils.toArray<HTMLElement>("[data-reveal-img]");
      if (imgWrap && cards.length) {
        gsap.set(cards, {
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
        });
        gsap.to(cards, {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.9,
          stagger: 0.25,
          scrollTrigger: {
            trigger: imgWrap,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div
      className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-darkGreen font-display overflow-hidden"
      ref={sectionRef}
    >
      {images && images.length > 0 && (
        <div
          className="columns-3 sm:columns-3 md:columns-3 gap-2 sm:gap-3 space-y-2 sm:space-y-3 max-w-6xl mx-auto"
          data-reveal-image // <-- add this
        >
          {images.map((src, index) => (
            <div
              key={index}
              data-reveal-img
              className="w-full overflow-hidden shadow-md sm:shadow-lg break-inside-avoid cursor-pointer will-change-transform will-change-opacity"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={200}
                height={400}
                sizes="(max-width: 768px) 40vw, (max-width: 1024px) 35vw, 12vw"
                className="w-full h-auto object-cover"
                priority={index < 3}
                loading={index < 3 ? undefined : "lazy"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EqImages;
