"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useRef, useId, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import CustomCursor from "./CustomCursor";

export interface SlideData {
  title: string;
  src: string;
  /** 4 related images for popup */
  gallery?: string[];
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onOpenGallery: (slide: SlideData) => void;
  setCursorVisible: (show: boolean) => void;
}

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  onOpenGallery,
  setCursorVisible,
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  // parallax state
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (slideRef.current) {
        slideRef.current.style.setProperty("--x", `${xRef.current}px`);
        slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
    setCursorVisible(false);
  };

  const { src, title } = slide;
  const isActive = current === index;

  // center => open gallery; side => navigate
  const onClick = () =>
    isActive ? onOpenGallery(slide) : handleSlideClick(index);

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d] cursor-auto">
      <li
        ref={slideRef}
        className="relative mx-[4vmin] flex h-[70vmin] w-[70vmin] flex-1 list-none items-center justify-center text-center text-white"
        onClick={onClick}
        onMouseMove={(e) => {
          handleMouseMove(e);
          if (isActive) setCursorVisible(true);
        }}
        onMouseEnter={() => isActive && setCursorVisible(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isActive
            ? "scale(1) rotateX(0deg)"
            : "scale(0.98) rotateX(8deg)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
          // no custom native cursor; keep default
        }}
        aria-roledescription="slide"
        aria-label={`${index + 1}`}
      >
        {/* Card/image */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[12px] bg-[#1D1F2F]"
          style={{
            transform: isActive
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
            transition: "transform 150ms ease-out",
          }}
        >
          <img
            className="absolute inset-0 h-[120%] w-[120%] object-cover opacity-100 transition-opacity duration-700 ease-in-out"
            style={{ opacity: isActive ? 1 : 0.55 }}
            alt={title}
            src={src}
            loading="eager"
            decoding="sync"
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          {/* mild extra dim when active */}
          {isActive && (
            <div className="pointer-events-none absolute inset-0 bg-black/10 transition-all duration-700" />
          )}
        </div>

        {/* Title bottom-left (only on active) */}
        <article
          className={`pointer-events-none absolute inset-0 flex items-end p-[4vmin] transition-opacity duration-700 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-[80%] text-left">
            <h2 className="text-base font-normal font-grotesk md:text-xl lg:text-2xl">
              {title}
            </h2>
          </div>
        </article>
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick,
}: {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`mx-2 flex h-10 w-10 items-center justify-center rounded-full border-3 border-transparent bg-neutral-200 transition duration-200 hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:border-[#6D64F7] dark:bg-neutral-800 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      aria-label={title}
      onClick={handleClick}
      type="button"
    >
      <FaArrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

/** GSAP-animated popup (2×2 grid with stagger) */
function GalleryModal({
  images,
  title,
  onClose,
}: {
  images: string[];
  title?: string;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLDivElement>(".js-modal-tile");

      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(panelRef.current, { opacity: 0, y: 10, scale: 0.98 });
      gsap.set(tiles, { opacity: 0, scale: 0.92 });

      if (reduce) {
        gsap.set(backdropRef.current, { opacity: 1 });
        gsap.set(panelRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(tiles, { opacity: 1, scale: 1 });
      } else {
        tlRef.current = gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(backdropRef.current, { opacity: 1, duration: 0.22 })
          .to(
            panelRef.current,
            { opacity: 1, y: 0, scale: 1, duration: 0.28 },
            "-=0.05"
          )
          .to(
            tiles,
            {
              opacity: 1,
              scale: 1,
              duration: 0.18,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.10"
          );
      }
    });

    panelRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
      ctx.revert();
    };
  }, []);

  const animateClose = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (tlRef.current && !reduce) {
      tlRef.current.eventCallback("onReverseComplete", () => onClose());
      tlRef.current.reverse();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && animateClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) animateClose();
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} gallery` : "Image gallery"}
      onClick={onBackdropClick}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-lg outline-none sm:max-w-xl md:max-w-4xl"
      >
        <button
          onClick={animateClose}
          className="absolute right-2 top-2 z-[1001] rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-black shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Close
        </button>

        {title && (
          <h3 className="mb-3 pr-20 text-left text-base font-semibold text-white sm:text-lg">
            {title}
          </h3>
        )}

        <div className="grid md:grid-cols-2 grid-col-1 place-items-center gap-3">
          {images.slice(0, 4).map((src, i) => (
            <div
              key={i}
              className="js-modal-tile relative md:overflow-hidden rounded-lg md:w-[400px] md:h-[340px] w-full h-[120px]"
              // style={{ width: "20rem", aspectRatio: "5/3" }}
            >
              <img
                src={src}
                alt={`${title ?? "image"} ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  // custom cursor state
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);

  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // global mouse tracking (only while inside wrapper)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };
    const el = wrapperRef.current;
    if (!el) return;

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", () => setCursorVisible(false));
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", () => setCursorVisible(false));
    };
  }, []);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  const onOpenGallery = (slide: SlideData) => {
    const fourImages =
      slide.gallery && slide.gallery.length >= 4
        ? slide.gallery.slice(0, 4)
        : [slide.src, slide.src, slide.src, slide.src];

    setModalImages(fourImages);
    setModalTitle(slide.title);
    setModalOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto h-[70vmin] w-[70vmin]"
      aria-labelledby={`carousel-heading-${id}`}
      aria-roledescription="carousel"
    >
      {/* Track */}
      <ul
        className="absolute mx-[-4vmin] flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            onOpenGallery={onOpenGallery}
            setCursorVisible={setCursorVisible}
          />
        ))}
      </ul>

      {/* Bottom-centered controls */}
      <div className="absolute top-[calc(100%+1rem)] flex w-full justify-center">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>

      {/* GSAP-animated Modal */}
      {modalOpen && (
        <GalleryModal
          images={modalImages}
          title={modalTitle}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Custom Cursor (only appears when hovering active slide) */}
      <CustomCursor x={cursorX} y={cursorY} show={cursorVisible} label="view" />
    </div>
  );
}
