"use client";

import React, { useMemo, useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// If these live elsewhere, update the import paths:

import { JSX } from "react/jsx-runtime";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  src: string;
  category: "Wedding" | "Family" | "Individual Portraiture" | "Couple";
  alt: string;
};

const ALL_IMAGES: GalleryItem[] = [
  {
    src: "/assets/images/gall1.png",
    category: "Wedding",
    alt: "Wedding Photo 1",
  },
  {
    src: "/assets/images/gall2.png",
    category: "Family",
    alt: "Family Photo 1",
  },
  {
    src: "/assets/images/gall3.png",
    category: "Individual Portraiture",
    alt: "Portrait 1",
  },
  {
    src: "/assets/images/gall4.png",
    category: "Couple",
    alt: "Couple Photo 1",
  },
  {
    src: "/assets/images/gall5.png",
    category: "Wedding",
    alt: "Wedding Photo 2",
  },
  {
    src: "/assets/images/gall6.png",
    category: "Family",
    alt: "Family Photo 2",
  },
  {
    src: "/assets/images/gall7.png",
    category: "Individual Portraiture",
    alt: "Portrait 2",
  },
  {
    src: "/assets/images/gall8.png",
    category: "Couple",
    alt: "Couple Photo 2",
  },
  {
    src: "/assets/images/gall9.png",
    category: "Wedding",
    alt: "Wedding Photo 3",
  },
  {
    src: "/assets/images/gall10.png",
    category: "Family",
    alt: "Family Photo 3",
  },
  {
    src: "/assets/images/gall11.png",
    category: "Individual Portraiture",
    alt: "Portrait 3",
  },
  {
    src: "/assets/images/gall13.png",
    category: "Couple",
    alt: "Couple Photo 3",
  },
  {
    src: "/assets/images/gall14.png",
    category: "Wedding",
    alt: "Wedding Photo 4",
  },
  {
    src: "/assets/images/gall15.png",
    category: "Family",
    alt: "Family Photo 4",
  },
  {
    src: "/assets/images/gall16.png",
    category: "Individual Portraiture",
    alt: "Portrait 4",
  },
  {
    src: "/assets/images/gall17.png",
    category: "Couple",
    alt: "Couple Photo 4",
  },
  {
    src: "/assets/images/gall18.png",
    category: "Wedding",
    alt: "Wedding Photo 5",
  },
];

const CATEGORIES = [
  "All",
  "Wedding",
  "Family",
  "Individual Portraiture",
  "Couple",
] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_CARDS: { name: Category; image: string }[] = [
  { name: "All", image: "/assets/images/gall1.png" },
  { name: "Wedding", image: "/assets/images/gall3.png" },
  { name: "Family", image: "/assets/images/gall4.png" },
  { name: "Individual Portraiture", image: "/assets/images/gall6.png" },
  { name: "Couple", image: "/assets/images/gall9.png" },
];

export default function GalleryPage(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredImages = useMemo(
    () =>
      activeFilter === "All"
        ? ALL_IMAGES
        : ALL_IMAGES.filter((img) => img.category === activeFilter),
    [activeFilter]
  );

  // Stable random order per filter change (simple shuffle)
  const shuffledImages = useMemo(() => {
    const copy = filteredImages.slice();
    return copy.sort(() => Math.random() - 0.5);
  }, [filteredImages]);

  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP: reveal headings/cards/images
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Title & category row
      const texts = gsap.utils.toArray<HTMLElement>("[data-reveal-text]");
      gsap.set(texts, { y: 24, opacity: 0, scale: 0.98 });
      texts.length &&
        gsap.to(texts, {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: {
            trigger: texts[0],
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        });

      // Category cards
      const catCards = gsap.utils.toArray<HTMLElement>("[data-category-card]");
      gsap.set(catCards, { y: 20, opacity: 0 });
      catCards.length &&
        gsap.to(catCards, {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.5,
          stagger: 0.06,
          scrollTrigger: {
            trigger: "[data-category-wrap]",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        });

      // Masonry images
      const wrap = document.querySelector<HTMLElement>("[data-reveal-image]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-reveal-img]");
      gsap.set(cards, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
      });
      cards.length &&
        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: {
            trigger: wrap || sectionRef.current!,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        });
    }, sectionRef);

    // Re-run animations when filter changes
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-darkGreen text-white mt-16"
    >
      {/* Header */}
      <header className="mx-auto max-w-7xl px-4 pt-16 text-center">
        <h1
          data-reveal-text
          className="mb-6 font-freight text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl"
        >
          The Values Behind the Lens
        </h1>

        {/* Category Cards */}
        <div
          data-category-wrap
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-2 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {CATEGORY_CARDS.map(({ name, image }) => {
            const active = activeFilter === name;
            return (
              <button
                key={name}
                type="button"
                data-category-card
                onClick={() => setActiveFilter(name)}
                aria-pressed={active}
                className={[
                  "group overflow-hidden rounded-xl border transition-all",
                  active
                    ? "border-white/80 ring-2 ring-white/40"
                    : "border-white/10 hover:border-white/30",
                  "bg-[#0F1218]",
                ].join(" ")}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={image}
                    alt={`${name} category`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    priority={name === "All"}
                  />
                </div>
                <div className="px-3 py-3 text-center">
                  <span className="font-grotesk text-base font-semibold">
                    {name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </header>

      {/* Gallery */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16">
        {/* Masonry container */}
        <div
          data-reveal-image
          className="masonry mx-auto columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4"
        >
          {shuffledImages.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
              data-reveal-img
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[#0F1218] shadow-md transition-transform duration-300 hover:-translate-y-0.5"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ breakInside: "avoid" as any }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1000}
                height={1200}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={idx < 3}
                loading={idx < 3 ? undefined : "lazy"}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
