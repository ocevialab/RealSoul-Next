"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/app/components/ui/Heading";
import SubHeading from "@/app/components/ui/SubHeading";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type GearItem = { src: string; alt: string };

function Gear() {
  const gearItems: GearItem[] = [
    { src: "/assets/images/gear1.png", alt: "Sony" },
    { src: "/assets/images/gear2.png", alt: "Canon" },
    { src: "/assets/images/gear3.png", alt: "DJI" },
    { src: "/assets/images/gear4.png", alt: "SanDisk" },
    { src: "/assets/images/gear5.png", alt: "Manfrotto" },
    { src: "/assets/images/gear6.png", alt: "Adobe" },
    { src: "/assets/images/gear7.png", alt: "Capture One" },
  ];

  const section3Ref = useRef<HTMLDivElement>(null);
  const loadedCount = useRef(0);

  const onLogoLoaded = () => {
    loadedCount.current += 1;
    if (loadedCount.current === gearItems.length) {
      // let flex-wrap settle one frame, then refresh
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  };

  useLayoutEffect(() => {
    if (!section3Ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // TEXT
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
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      });

      // LOGOS (sequential scale-in)
      const imgWrap = section3Ref.current!.querySelector<HTMLElement>(
        "[data-reveal-image]"
      );
      const logos = gsap.utils.toArray<HTMLElement>(
        "[data-reveal-image] [data-photo]"
      );
      if (imgWrap && logos.length) {
        gsap.set(logos, {
          scale: 0.9,
          opacity: 0,
          transformOrigin: "center center",
        });
        gsap.to(logos, {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: imgWrap,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }
    }, section3Ref);

    // ---- make sure start positions are correct ----
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(section3Ref.current);

    // refresh after first paint, fonts, and window load
    const t = setTimeout(() => ScrollTrigger.refresh(), 0);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // font metric changes can shift layout

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", onLoad);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-darkGreen/80 to-darkGreen/95 py-16 text-center"
      ref={section3Ref}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* add data hooks so GSAP finds these */}
        <div data-reveal-text>
          <Heading HeaderText="Gear & Tools That Powers My Vision" />
        </div>
        <div data-reveal-text>
          <SubHeading text="At Realsoul, I believe that exceptional photography is driven by exceptional gear. My carefully curated selection of top-tier equipment ensures that I capture every moment with precision, clarity, and artistry. From cutting-edge cameras to versatile lenses and reliable accessories, my gear empowers me to bring your vision to life in stunning detail." />
        </div>

        {/* add data-reveal-image wrapper and data-photo on each logo */}
        <div
          className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-6 sm:gap-8 md:gap-12"
          data-reveal-image
        >
          {gearItems.map((item, i) => (
            <div key={i} data-photo>
              <Image
                src={item.src}
                alt={item.alt}
                width={100}
                height={100}
                className="h-6 w-auto object-contain md:h-8"
                loading="lazy"
                onLoadingComplete={onLogoLoaded}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gear;
