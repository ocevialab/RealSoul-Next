"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  // button?: string; // (optional if you add it later)
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
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
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative mx-[4vmin] flex h-[70vmin] w-[70vmin] flex-1 list-none items-center justify-center text-center text-white"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        {/* Card/image */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[12px] bg-[#1D1F2F]"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
            transition: "transform 150ms ease-out",
          }}
        >
          <img
            className="absolute inset-0 h-[120%] w-[120%] object-cover opacity-100 transition-opacity duration-700 ease-in-out"
            style={{ opacity: current === index ? 1 : 0.55 }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />

          {/* GRADIENT OVERLAY: from bottom (black) to transparent, covering ~80% */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          {/* optional extra dim when active (kept mild) */}
          {current === index && (
            <div className="pointer-events-none absolute inset-0 bg-black/10 transition-all duration-700" />
          )}
        </div>

        {/* Title at bottom-left over the gradient */}
        <article
          className={`pointer-events-none absolute inset-0 flex items-end p-[4vmin] transition-opacity duration-700 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-[80%] text-left">
            <h2 className="text-base font-normal font-grotesk md:text-xl lg:text-2xl">
              {title}
            </h2>
            {/* If you later add a button or subtitle, place it here */}
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
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

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const id = useId();

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

  return (
    <div
      className="relative mx-auto h-[70vmin] w-[70vmin]"
      aria-labelledby={`carousel-heading-${id}`}
      aria-roledescription="carousel"
    >
      {/* Track */}
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
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
    </div>
  );
}
