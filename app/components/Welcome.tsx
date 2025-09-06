"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      // initial state
      gsap.set(items, {
        y: 30,
        scale: 0.5,
        opacity: 0,
        transformOrigin: "50% 100%",
      });

      gsap.to(items, {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        duration: 0.9,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 80%",
          end: "bottom 0%",
          toggleActions: "play reverse play reverse",
          // play when enter, reverse when leave
          // re-play when re-enter, reverse again when leave back
          markers: false, // set true if you want to debug
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-fit items-center justify-center bg-darkGreen md:px-8 md:py-12 px-4 py-6 font-freight overflow-hidden"
    >
      <h1
        data-reveal
        className="lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-bold text-gold text-center will-change-transform will-change-opacity"
      >
        Warmly Welcome to RealSoul
      </h1>

      <p
        data-reveal
        className="w-full text-center text-white md:mt-8 mt-4 md:text-xl text-md sm:text-lg font-grotesk will-change-transform will-change-opacity"
      >
        I believe every photograph holds a story — a moment frozen in time,
        filled with emotion, beauty, and meaning. Whether it’s a fleeting
        glance, a quiet smile, or a
        <span className="text-gold"> once-in-a-lifetime</span> celebration, I’m
        here to capture it all with artistic depth and heartfelt detail. Let me
        turn your most cherished memories into timeless visuals that speak
        louder than words.
      </p>
    </section>
  );
}
