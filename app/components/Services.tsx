"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Reason = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    id: 1,
    icon: "/assets/images/experience.png",
    title: "5+ Years Experience",
    description: "Trusted expertise built through years of capturing moments.",
  },
  {
    id: 2,
    icon: "/assets/images/winner.png",
    title: "Child-Safe Certified",
    description: "Certified to work safely and comfortably with children.",
  },
  {
    id: 3,
    icon: "/assets/images/color.png",
    title: "Multi-Color Profiles",
    description: "Creative color styles tailored to your story and mood.",
  },
  {
    id: 4,
    icon: "/assets/images/equipment.png",
    title: "Pro Equipment",
    description: "High-end cameras and lighting for top-quality results.",
  },
  {
    id: 5,
    icon: "/assets/images/support.png",
    title: "Client-Focused",
    description: "Friendly support and flexible service, every step.",
  },
  {
    id: 6,
    icon: "/assets/images/child-bond.png",
    title: "Natural Child Bonding",
    description: "Kids connect easily, making sessions fun and stress-free.",
  },
];

export default function Services() {
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
            end: "top 10%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      // IMAGES — animate once
      const imgEls = gsap.utils.toArray<HTMLElement>("[data-reveal-img]");
      imgEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            duration: 0.7,
            delay: (i % 3) * 0.05, // mild stagger per row
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
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
      id="services"
      ref={sectionRef}
      className="bg-darkGreen/80 py-16 text-white"
    >
      <div className="mx-auto max-w-screen-xl px-2 md:px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            data-reveal-text
            className="mb-4 font-freight text-2xl font-bold tracking-[0.12em] sm:text-3xl md:text-4xl lg:text-5xl text-gold"
          >
            Why Choose Us
          </h2>
          <p
            data-reveal-text
            className="mx-auto max-w-3xl font-grotesk text-[0.9rem] leading-7 text-[#b0b0b0] sm:text-base md:text-lg"
          >
            Discover the qualities that make us stand out — experience, trust,
            creativity, and a personal touch for every session.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {reasons.map((s) => (
            <div
              key={s.id}
              data-reveal-img
              className="flex flex-col items-center justify-center rounded-lg p-4 text-center transition-transform duration-300 hover:-translate-y-1 md:rounded-xl md:p-6"
            >
              <div className="mb-3">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={80}
                  height={80}
                  className="h-[60px] w-[60px] object-contain sm:h-[50px] sm:w-[50px] lg:h-[80px] lg:w-[80px]"
                  loading="lazy"
                />
              </div>
              <h3 className="font-freight text-[1.1rem] font-bold sm:text-[1.15rem] lg:text-[1.25rem]">
                {s.title}
              </h3>
              <p className="font-grotesk mt-2 text-xs leading-6 text-[#b0b0b0] sm:text-base lg:text-[1.1rem]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
