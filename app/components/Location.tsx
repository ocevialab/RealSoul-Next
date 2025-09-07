"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import React, { useLayoutEffect, useRef } from "react";
import { Carousel } from "./carousel";

function Location() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // TEXT — play + reverse
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
            start: "top 85%",
            end: "top 0%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const slideData = [
    {
      title: "This spot offers the perfect winter backdrop for photography",
      // button: "Explore Component",
      src: "assets/images/location1.jpg",
    },
    {
      title: "This spot offers the perfect winter backdrop for photography",
      // button: "Explore Component",
      src: "assets/images/location2.jpg",
    },
    {
      title: "This spot offers the perfect winter backdrop for photography",
      // button: "Explore Component",
      src: "assets/images/location4.jpg",
    },
    {
      title: "This spot offers the perfect winter backdrop for photography",
      // button: "Explore Component",
      src: "assets/images/location3.jpg",
    },
  ];
  return (
    <div
      className="relative overflow-hidden w-full h-full py-20 bg-darkGreen/30 "
      ref={sectionRef}
    >
      <h2
        data-reveal-text
        className="mb-4 font-freight text-2xl font-bold tracking-[0.12em] sm:text-3xl md:text-4xl lg:text-5xl text-gold w-full text-center md:p-8"
      >
        Perfect Setting, Perfect Picture
      </h2>
      <Carousel slides={slideData} />
    </div>
  );
}

export default Location;
