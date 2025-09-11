"use client";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Head from "next/head";
import Heading from "@/app/components/ui/Heading";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
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
            start: "top 90% || bottom 10%",
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
            start: "top 90%",
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
      ref={sectionRef}
      className="pointer-events-none inset-x-0 bottom-0 bg-gradient-to-b from-darkGreen to-darkGreen/95"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center items-center gap-10 px-4 md:py-16 py-4 md:flex-row md:items-start">
        {/* Left: Image cluster */}
        <div
          className="relative flex md:h-[600px] h-[300px] w-full max-w-sm flex-col gap-4 md:mt-0 md:max-w-xl pointer-events-auto"
          data-reveal-image
        >
          {/* Image A wrapper */}
          <div
            data-photo
            className="absolute bottom-0 left-0 md:h-[280px] h-[180px] w-auto"
          >
            <Image
              src="/assets/images/about1.png"
              alt="Dushan Weerashingha - Photographer"
              width={800}
              height={1000}
              className="h-full w-auto rounded-none object-cover"
              priority
            />
          </div>

          {/* Image B wrapper */}
          <div
            data-photo
            className="absolute right-0 top-0 md:h-[400px] h-[220px] w-auto"
          >
            <Image
              src="/assets/images/about2.png"
              alt="Dushan Weerashingha - Photographer"
              width={400}
              height={1000}
              className="h-full w-auto rounded-none object-cover"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full max-w-2xl pointer-events-auto">
          <Heading HeaderText="About Me" />

          <div className="md:mt-4 mt-2 space-y-6" data-para-root>
            <p
              className="font-grotesk md:text-3xl text-xl text-center font-bold leading-8 text-[#b0b0b0]"
              data-para
            >
              Hi, I am Dushan Weerashingha. I&apos;m a photographer.
            </p>
            <p
              className="font-grotesk md:text-lg text-sm leading-8 text-[#b0b0b0] text-justify"
              data-para
            >
              Photography, for me, is more than just capturing images —
              it&apos;s about freezing moments in time that would otherwise slip
              away. I&apos;m drawn to the raw emotions, the small details, and
              the honest beauty in everyday life. Whether it&apos;s a quiet
              glance, a joyful celebration, or the elegance of natural light, I
              believe every photograph holds a story waiting to be told.
            </p>
            <p
              className="font-grotesk md:text-lg text-sm leading-8 text-[#b0b0b0] text-justify"
              data-para
            >
              With every project I take on, I aim to create visuals that feel
              genuine, timeless, and deeply personal. I approach each shot not
              just as a photographer, but as a visual storyteller — someone who
              listens, observes, and translates your moments into meaningful
              frames.
            </p>
            <p
              className="font-grotesk md:text-lg text-sm leading-8 text-[#b0b0b0] text-justify"
              data-para
            >
              From intimate portraits to wide-open landscapes, I love working
              closely with people to create imagery that resonates. Whether
              you&apos;re celebrating love, documenting life, or simply chasing
              beauty — I&apos;m here to capture it in the most authentic way
              possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
