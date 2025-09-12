"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useRef,
} from "react";

import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaLinkedin,
  FaCamera,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQSection from "@/app/components/FAQSection";
import Footer from "@/app/components/Footer";
import Heading from "@/app/components/ui/Heading";
gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: hook this to your API route / form service
  };

  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // HERO — title + underline accent
      const hero = q("[data-hero]")[0];
      if (hero) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top 85%",
            once: true,
          },
        });
        tl.from(q("[data-hero-title]"), {
          y: 40,
          opacity: 0,
          skewY: 2,
          duration: 0.9,
          ease: "power4.out",
        }).from(
          q("[data-hero-underline]"),
          {
            scaleX: 0,
            opacity: 0.3,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.45"
        );
      }

      // CONTACT INFO — batch for snappy list reveal
      ScrollTrigger.batch(q("[data-info-item]"), {
        start: "top 90%",
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeaveBack: (els) =>
          gsap.to(els, {
            y: 10,
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.06,
            overwrite: true,
          }),
      });
      gsap.set(q("[data-info-item]"), { y: 10, opacity: 0 });

      // SOCIAL BUTTONS — subtle pop
      const socials = q("[data-social] button");
      if (socials.length) {
        gsap.set(socials, { scale: 0.9, opacity: 0 });
        gsap.to(socials, {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.4)",
          duration: 0.5,
          stagger: 0.06,
          scrollTrigger: {
            trigger: q("[data-social]")[0],
            start: "top 92%",
            once: true,
          },
        });
      }

      // FORM FIELDS — cascade in
      const fields = q("[data-field]");
      if (fields.length) {
        gsap.set(fields, { y: 16, opacity: 0 });
        gsap.to(fields, {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.55,
          stagger: 0.12,
          scrollTrigger: {
            trigger: q("[data-form]")[0],
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="md:mt-16 mt-4 min-h-screen bg-darkGreen/95 bg-cover bg-center bg-fixed text-white"
    >
      {/* Hero */}
      <section
        className="mx-auto max-w-6xl px-4 pt-24 md:pb-16 pd-8 text-center"
        data-hero
      >
        <div data-hero-title>
          <Heading HeaderText="Let's Talk About Your Project" />
        </div>
        {/* subtle underline accent for the hero */}
        <div
          data-hero-underline
          className="mx-auto mt-4 h-[2px] w-24 origin-left rounded bg-white/30"
        />
      </section>

      {/* Main */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:pb-24 pb-6 md:grid-cols-2">
        {/* Left: Contact info */}
        <div>
          <h2
            className="mb-10 text-center font-freight md:text-3xl text-xl font-bold text-gold"
            data-hero-title
          >
            Get In Touch
          </h2>

          <div className="space-y-6">
            <div
              className="flex items-start will-change-transform"
              data-info-item
            >
              <span className="mr-4 mt-1 inline-flex h-6 w-6 flex-none items-center justify-center">
                <FaEnvelope className="text-white" />
              </span>
              <p className="font-grotesk text-sm leading-7 text-[#b0b0b0] md:text-lg">
                contact@realsoul.com
              </p>
            </div>

            <div
              className="flex items-start will-change-transform"
              data-info-item
            >
              <span className="mr-4 mt-1 inline-flex h-6 w-6 flex-none items-center justify-center">
                <FaPhone className="text-white" />
              </span>
              <p className="font-grotesk text-sm leading-7 text-[#b0b0b0] md:text-lg">
                +89 123456789
              </p>
            </div>

            <div
              className="flex items-start will-change-transform"
              data-info-item
            >
              <span className="mr-4 mt-1 inline-flex h-6 w-6 flex-none items-center justify-center">
                <FaLocationDot className="text-white" />
              </span>
              <p className="font-grotesk text-sm leading-7 text-[#b0b0b0] md:text-lg">
                123 Address one, street name, city, state, country
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="mt-8 flex gap-4" data-social>
            <button
              aria-label="Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-md border cursor-pointer border-white/20 text-white transition hover:border-white/40"
            >
              <FaFacebook />
            </button>
            <button
              aria-label="Camera"
              className="flex h-12 w-12 items-center justify-center rounded-md border cursor-pointer border-white/20 text-white transition hover:border-white/40"
            >
              <FaCamera />
            </button>
            <button
              aria-label="LinkedIn"
              className="flex h-12 w-12 items-center justify-center rounded-md border cursor-pointer border-white/20 text-white transition hover:border-white/40"
            >
              <FaLinkedin />
            </button>
            <button
              aria-label="Phone"
              className="flex h-12 w-12 items-center justify-center rounded-md border cursor-pointer border-white/20 text-white transition hover:border-white/40"
            >
              <FaPhone />
            </button>
          </div>
        </div>

        {/* Right: Form */}
        <div data-form>
          <h2
            className="mb-10 text-center font-freight md:text-3xl text-xl font-bold text-gold"
            data-hero-title
          >
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div data-field>
              <label
                htmlFor="name"
                className="mb-2 block font-grotesk text-sm font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-2 border-[#333] bg-transparent px-4 py-3 font-grotesk text-sm text-white outline-none transition placeholder:text-[#888] focus:border-[#555]"
              />
            </div>

            <div data-field>
              <label
                htmlFor="email"
                className="mb-2 block font-grotesk text-sm font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@provider.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-2 border-[#333] bg-transparent px-4 py-3 font-grotesk text-sm text-white outline-none transition placeholder:text-[#888] focus:border-[#555]"
              />
            </div>

            <div data-field>
              <label
                htmlFor="phone"
                className="mb-2 block font-grotesk text-sm font-semibold"
              >
                Contact Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+xx xxx xxx xx"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border-2 border-[#333] bg-transparent px-4 py-3 font-grotesk text-sm text-white outline-none transition placeholder:text-[#888] focus:border-[#555]"
              />
            </div>

            <div data-field>
              <label
                htmlFor="message"
                className="mb-2 block font-grotesk text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Type your message"
                value={formData.message}
                onChange={handleInputChange}
                className="min-h-[120px] w-full resize-y border border-[#333] bg-white/5 px-4 py-3 font-grotesk text-sm text-white outline-none transition placeholder:text-[#888] focus:border-[#555]"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer border border-[#333] px-6 py-3 font-grotesk text-base font-semibold text-white transition hover:bg-[#555]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
