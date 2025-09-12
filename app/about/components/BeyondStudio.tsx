"use client";

import Heading from "@/app/components/ui/Heading";
import SubHeading from "@/app/components/ui/SubHeading";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = { src: string; alt: string };

function BeyondStudio() {
  const images: GalleryItem[] = [
    { src: "/assets/images/wild1.png", alt: "Elephant close-up" },
    { src: "/assets/images/wild2.png", alt: "Deer in meadow" },
    { src: "/assets/images/wild3.png", alt: "Tiger in forest" },
    { src: "/assets/images/wild4.png", alt: "Butterfly on flower" },
    { src: "/assets/images/wild5.png", alt: "Kingfisher over water" },
    { src: "/assets/images/wild6.png", alt: "Scarlet ibis in wetland" },
  ];

  const section2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!section2Ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Headings/Subheading
      const textEls = gsap.utils.toArray<HTMLElement>("[data-reveal-text]");
      textEls.forEach((el) => {
        gsap.set(el, { y: 30, scale: 0.9, opacity: 0 });
        gsap.to(el, {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      // Images — sequential scale-in
      const imgWrap = section2Ref.current!.querySelector<HTMLElement>(
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
    }, section2Ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-darkGreen/95 to-darkGreen py-16 text-center"
      ref={section2Ref}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div data-reveal-text>
          <Heading HeaderText="Beyond the Studio" />
        </div>
        <div data-reveal-text>
          <SubHeading text="Outside of client work, I find peace behind the lens in nature. Wildlife photography is a personal hobby and creative escape — a way to capture untamed beauty and reconnect with the raw world around us." />
        </div>

        {/* Masonry-like column layout */}
        <div className="mx-auto mt-10 max-w-6xl" data-reveal-image>
          <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 md:columns-4">
            {images.map((item, index) => (
              <div
                key={item.src}
                data-reveal-img
                className="mb-2 break-inside-avoid overflow-hidden shadow-md sm:mb-3 sm:shadow-lg"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={800}
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw"
                  className="h-auto w-full object-cover"
                  priority={index < 3}
                  loading={index < 3 ? undefined : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeyondStudio;
