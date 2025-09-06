"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Images from "./Images";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const images = [
    "/assets/images/gal1.jpg",
    "/assets/images/gal7.jpg",
    "/assets/images/gal4.jpg",
    "/assets/images/gal3.jpg",
    "/assets/images/gal2.jpg",
    "/assets/images/gal16.png",
    "/assets/images/gal8.jpg",
    "/assets/images/gal9.jpg",
    "/assets/images/gal10.jpg",
    "/assets/images/gal11.png",
    "/assets/images/gal12.png",
    "/assets/images/gal13.png",
    "/assets/images/gal14.png",
    "/assets/images/gal15.png",
    "/assets/images/gal5.jpg",
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // ---------- TEXT: play on enter, reverse on leave ----------
      const textEls = gsap.utils.toArray<HTMLElement>("[data-reveal-text]");
      textEls.forEach((el) => {
        gsap.set(el, {
          y: 30,
          scale: 0.5,
          opacity: 0,
          transformOrigin: "50% 100%",
        });
        gsap.to(el, {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 25%",
            toggleActions: "play reverse play reverse", // ✅ reverse for text
            invalidateOnRefresh: true,
          },
        });
      });

      // ---------- IMAGES: animate once on first enter (no reverse) ----------
      const imgCards = gsap.utils.toArray<HTMLElement>("[data-reveal-img]");
      imgCards.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, scale: 0.5, opacity: 0, transformOrigin: "50% 100%" },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            duration: 1,
            delay: (i % 4) * 0.05, // mild stagger feel per column
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: false, // ✅ play again if re-enter
              toggleActions: "play reverse play reverse", // ❌ no reverse for images
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full bg-darkGreen md:px-8 md:py-12 px-4 py-6 font-freight overflow-hidden"
    >
      <h1
        data-reveal-text
        className="lg:text-5xl md:text-3xl sm:text-2xl text-xl font-bold text-gold text-center will-change-transform will-change-opacity"
      >
        Through Our Lens
      </h1>

      <p
        data-reveal-text
        className="w-full text-center text-white md:mt-8 mt-4 md:text-xl text-md sm:text-lg font-grotesk will-change-transform will-change-opacity"
      >
        Explore a curated collection of our favorite shots—real stories, real
        emotions, and the beauty of life frozen in every frame.
      </p>

      <Images images={images} />
    </section>
  );
}
