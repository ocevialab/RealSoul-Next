"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const DESKTOP_IMAGES = [
  "/assets/images/Hero.jpg",
  "/assets/images/Hero3.jpg",
  "/assets/images/Hero4.jpg",
];

const MOBILE_IMAGES = [
  "/assets/images/Hero2.jpg",
  "/assets/images/Hero5.jpg",
  "/assets/images/Hero6.jpg",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // pick image set based on screen width (md = 768px)
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mql.matches);
    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  const IMAGES = useMemo(
    () => (isDesktop ? DESKTOP_IMAGES : MOBILE_IMAGES),
    [isDesktop]
  );

  // Build the GSAP slideshow
  useEffect(() => {
    if (!containerRef.current) return;

    // Kill any previous timeline when changing between mobile/desktop
    tlRef.current?.kill();

    // Ensure refs list matches slides
    slideRefs.current = slideRefs.current.slice(0, IMAGES.length);

    // Start with all hidden except the first
    gsap.set(slideRefs.current, { opacity: 0, scale: 1.05 });
    if (slideRefs.current[0])
      gsap.set(slideRefs.current[0], { opacity: 1, scale: 1.05 });

    const DURATION = 6; // zoom duration per slide (seconds)
    const FADE = 0.9; // crossfade duration (seconds)
    const SCALE_FROM = 1.05; // start scale
    const SCALE_TO = 1.16; // end scale

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.out" } });

    // For each slide, create a zoom-in + crossfade to the next
    IMAGES.forEach((_, i) => {
      const curr = slideRefs.current[i];
      const next = slideRefs.current[(i + 1) % IMAGES.length];

      // zoom the current one
      tl.fromTo(
        curr,
        { scale: SCALE_FROM },
        { scale: SCALE_TO, duration: DURATION },
        // position label
        `slide-${i}`
      );

      // crossfade near the end of the zoom
      tl.to(
        curr,
        { opacity: 0, duration: FADE },
        `slide-${i}+=${DURATION - FADE}`
      );
      tl.to(
        next,
        {
          opacity: 1,
          duration: FADE,
          onStart: () => {
            gsap.set(next, { scale: SCALE_FROM });
          },
        },
        `slide-${i}+=${DURATION - FADE}` // align fades
      );
    });

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, [IMAGES]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Slides */}
      {IMAGES.map((src, idx) => (
        <div
          // store each slide div ref
          ref={(el) => {
            if (el) slideRefs.current[idx] = el;
          }}
          key={src}
          className="absolute inset-0 will-change-transform will-change-opacity"
        >
          <Image
            src={src}
            alt={`Hero slide ${idx + 1}`}
            fill
            priority={idx === 0}
            className={
              // keep subject a bit higher on desktop like your original
              isDesktop ? "object-cover object-top" : "object-cover"
            }
          />
        </div>
      ))}

      {/* Optional: gradient at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-b from-transparent to-darkGreen" />

      {/* Optional: overlay content layer */}
      {/* <div className="relative z-10 flex h-full items-end p-6 md:p-12">
        <div className="text-white max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold">Your Headline</h1>
          <p className="mt-3 text-white/80">Some sub copy here…</p>
        </div>
      </div> */}
    </section>
  );
}
