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

  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // HEADINGS/TEXT — play + reverse
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
            start: "top 100%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      // IMAGES — scale in sequentially (one after another)
      const imgWrap = sectionRef.current!.querySelector<HTMLElement>(
        "[data-reveal-image]"
      );
      const photos = gsap.utils.toArray<HTMLElement>(
        "[data-reveal-image] [data-photo]"
      );
      if (imgWrap && photos.length) {
        gsap.set(photos, {
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
        });
        gsap.to(photos, {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.9,
          stagger: 0.25, // delay between image 1 -> image 2
          scrollTrigger: {
            trigger: imgWrap,
            start: "top 100%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      }

      // PARAGRAPHS — staggered one after another
      const paraRoot =
        sectionRef.current!.querySelector<HTMLElement>("[data-para-root]");
      const paras = gsap.utils.toArray<HTMLElement>("[data-para]");
      if (paras.length) {
        gsap.set(paras, { y: 30, scale: 0.95, opacity: 0 });
        gsap.to(paras, {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.75,
          stagger: 0.25,
          scrollTrigger: {
            trigger: paraRoot || sectionRef.current!,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-darkGreen/80 to-darkGreen/95 py-16 text-center"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Heading HeaderText="Gear & Tools That Powers My Vision" />
        <SubHeading text="At Realsoul, I believe that exceptional photography is driven by exceptional gear. My carefully curated selection of top-tier equipment ensures that I capture every moment with precision, clarity, and artistry. From cutting-edge cameras to versatile lenses and reliable accessories, my gear empowers me to bring your vision to life in stunning detail." />

        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-6 sm:gap-8 md:gap-12">
          {gearItems.map((item, i) => (
            <Image
              key={i}
              src={item.src}
              alt={item.alt}
              // Intrinsic dimensions (can be any consistent values)
              width={100}
              height={100}
              // Control actual display size with Tailwind
              className="h-3 w-auto object-contain  md:h-6"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gear;
