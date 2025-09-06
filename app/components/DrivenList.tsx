"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  id: string;
  title: string;
  desc: string;
};

const ALL_ITEMS: Item[] = [
  {
    id: "friendly-service",
    title: "Friendly Service",
    desc: "A relaxed, supportive vibe so you feel natural in front of the camera.",
  },
  {
    id: "location-suggestions",
    title: "Location Suggestions",
    desc: "We recommend spots that match your style, lighting, and story.",
  },
  {
    id: "quality-photos",
    title: "Good Quality Photos",
    desc: "Sharp, well-lit images with careful color and skin tones.",
  },
  {
    id: "child-bonding",
    title: "Natural Child Bonding",
    desc: "Kids connect quickly—sessions become playful, not stressful.",
  },
  {
    id: "color-profiles",
    title: "Creative Color Profiles",
    desc: "Natural, cinematic, or bold—tailored looks that fit your mood.",
  },
  {
    id: "pro-equipment",
    title: "Professional Equipment",
    desc: "Reliable cameras and lighting for consistent, high-end results.",
  },
  {
    id: "fast-turnaround",
    title: "Quick Turnaround",
    desc: "Preview fast, delivery on time—no long waits for your gallery.",
  },
  {
    id: "client-focused",
    title: "Client-Focused Care",
    desc: "Clear communication, flexible scheduling, and helpful guidance.",
  },
  {
    id: "child-safe",
    title: "Child-Safe Certified",
    desc: "Certified and practiced in safe, comfortable family sessions.",
  },
  {
    id: "prep-checklist",
    title: "Preparation Checklist",
    desc: "Simple steps to look and feel your best on shoot day.",
  },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type RowProps = {
  item: Item;
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

function Row({ item, openId, setOpenId }: RowProps) {
  const isOpen = openId === item.id;
  const contentRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (contentRef.current) setH(contentRef.current.scrollHeight);
  }, [isOpen]);

  return (
    <div className="border-t border-white/10" data-reveal-item>
      <button
        className="group flex w-full items-center cursor-pointer justify-between py-3 text-left text-base sm:text-md md:text-xl text-white hover:text-gold transition-colors font-grotesk"
        aria-expanded={isOpen}
        onClick={() => setOpenId(isOpen ? null : item.id)}
      >
        <span className="truncate">{item.title}</span>
        <ArrowUpRight className="h-4 w-4 flex-none opacity-90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {/* reveal panel */}
      <div
        style={{ maxHeight: isOpen ? h : 0 }}
        className="overflow-hidden transition-[max-height] duration-300"
      >
        <div
          ref={contentRef}
          className="pb-3 text-base text-white/80 md:text-md font-grotesk"
        >
          {item.desc}
        </div>
      </div>
    </div>
  );
}

export default function DrivenList() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // split into two columns for md+; single column on mobile
  const [left, right] = useMemo(() => {
    const half = Math.ceil(ALL_ITEMS.length / 2);
    return [ALL_ITEMS.slice(0, half), ALL_ITEMS.slice(half)];
  }, []);

  // GSAP reveals
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Title: play on enter, reverse on leave
      const title = sectionRef.current!.querySelector(
        "[data-reveal-title]"
      ) as HTMLElement | null;
      if (title) {
        gsap.set(title, { y: 24, scale: 0.95, opacity: 0 });
        gsap.to(title, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            end: "top 0%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      }

      // Rows: animate once when they enter
      const rows = gsap.utils.toArray<HTMLElement>("[data-reveal-item]");
      rows.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 20, scale: 0.98, opacity: 0, transformOrigin: "50% 100%" },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: (i % 5) * 0.03, // tiny per-row stagger feel
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play reverse play reverse",
              once: undefined,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="text-white bg-darkGreen/95">
      <div className="mx-auto lg:px-24 md:px-12 px-6 bg-gradient-to-r from-transparent from-[20%] via-darkGreen via-[50%] to-transparent to-[80%]">
        <h2
          data-reveal-title
          className="text-center font-freight text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-gold"
        >
          Driven by Passion, Delivered to You
        </h2>

        <div className=" md:mt-12 mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* left column */}
          <div className="border-t border-white/10">
            {left.map((it) => (
              <Row
                key={it.id}
                item={it}
                openId={openId}
                setOpenId={setOpenId}
              />
            ))}
          </div>

          {/* right column */}
          <div className="border-t border-white/10">
            {right.map((it) => (
              <Row
                key={it.id}
                item={it}
                openId={openId}
                setOpenId={setOpenId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
