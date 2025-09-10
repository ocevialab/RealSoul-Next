"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import plus from "../../public/assets/images/plus.png";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "Do you only do client work, or personal photography too?",
    answer:
      "I do both! While I focus on client projects professionally, I also enjoy wildlife photography as a personal hobby.",
  },
  {
    question: "What type of photography do you specialize in?",
    answer:
      "Wedding, family portraits, individual portraiture, and couple photography. I also have experience with wildlife and nature.",
  },
  {
    question: "Where are you based?",
    answer:
      "I'm based in Sri Lanka, but I'm available for destination sessions and travel for special projects.",
  },
  {
    question: "How can I book a session?",
    answer:
      "Fill out the form, call me directly, or send an email. I'll get back to you within 24 hours to discuss your project.",
  },
  {
    question: "Do you offer edited photos?",
    answer:
      "Yes — all packages include professional editing and retouching. You'll receive high-quality images ready for print or digital use.",
  },
] as const;

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // TEXT — play + reverse (same as Services)
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

      // ITEMS — animate once (reusing Services' img pattern)
      const itemEls = gsap.utils.toArray<HTMLElement>("[data-reveal-img]");
      itemEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            duration: 0.7,
            delay: (i % 3) * 0.05,
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
    <section ref={sectionRef} className="bg-darkGreen/95 py-16 text-white">
      <div className="mx-auto max-w-screen-xl px-2 md:px-4">
        {/* Header (styles match Services) */}
        <div className="mb-12 text-center">
          <h2
            data-reveal-text
            className="mb-4 font-freight text-2xl font-bold tracking-[0.12em] sm:text-3xl md:text-4xl lg:text-5xl text-gold"
          >
            Quick Answers
          </h2>
          <p
            data-reveal-text
            className="mx-auto max-w-3xl font-grotesk text-[0.9rem] leading-7 text-[#b0b0b0] sm:text-base md:text-lg"
          >
            Find helpful details about services, locations, editing, and how to
            book—right here.
          </p>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
          {FAQS.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={i} data-reveal-img>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : i)}
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between px-4 py-4 text-left   transition-transform hover:bg-white/5"
                >
                  <span className="font-grotesk text-sm font-semibold sm:text-base">
                    {item.question}
                  </span>
                  {/* <Plus
                    className={`h-5 w-5 transition-transform ${
                      expanded ? "rotate-45" : ""
                    }`}
                  /> */}
                  <Image
                    src={plus}
                    alt="expand icon"
                    className={`h-5 w-5 transition-transform ${
                      expanded ? "rotate-45" : ""
                    }`}
                  />
                </button>

                {/* Smooth height transition using grid rows */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 font-grotesk text-sm leading-7 text-[#b0b0b0] sm:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
