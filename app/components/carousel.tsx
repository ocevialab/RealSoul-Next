"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useRef, useId, useEffect } from "react";

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
}

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  onOpenGallery,
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
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title } = slide;

  // Click behavior:
  // - center slide => open gallery
  // - side slide   => navigate to that slide
  const onClick = () => {
    if (current === index) onOpenGallery(slide);
    else handleSlideClick(index);
  };

  // Custom cursor (use your own SVGs in /public/cursors/)
  const cursor =
    current === index
      ? 'url("/cursors/zoom.svg") 16 16, zoom-in'
      : 'url("/cursors/arrow.svg") 8 8, pointer';

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative mx-[4vmin] flex h-[70vmin] w-[70vmin] flex-1 list-none items-center justify-center text-center text-white"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor,
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
        aria-roledescription="slide"
        aria-label={`${index + 1}`}
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

          {/* Gradient overlay: bottom -> transparent (~80%) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          {/* mild extra dim when active */}
          {current === index && (
            <div className="pointer-events-none absolute inset-0 bg-black/10 transition-all duration-700" />
          )}
        </div>

        {/* Title bottom-left */}
        <article
          className={`pointer-events-none absolute inset-0 flex items-end p-[4vmin] transition-opacity duration-700 ${
            current === index ? "opacity-100" : "opacity-0"
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

/** Popup modal (compact 2×2 grid) */
function GalleryModal({
  images,
  title,
  onClose,
}: {
  images: string[];
  title?: string;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} gallery` : "Image gallery"}
      onClick={onBackdrop}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* Smaller container on all screens */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-[1001] rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-black shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Close
        </button>

        {title && (
          <h3 className="mb-3 pr-20 text-left text-base font-semibold text-white sm:text-lg">
            {title}
          </h3>
        )}

        {/* Smaller tiles: center them and keep tight gaps */}
        <div className="grid grid-cols-2 place-items-center gap-5">
          {images.slice(0, 4).map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg"
              // narrow widths to keep them small; aspect ratio preserved
              style={{ width: "20rem", aspectRatio: "4/3" }} // 120px
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
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

      {/* Modal */}
      {modalOpen && (
        <GalleryModal
          images={modalImages}
          title={modalTitle}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
