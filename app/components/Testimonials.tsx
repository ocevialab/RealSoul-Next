"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import Image from "next/image";

type GalleryImage = { id: number; src: string; alt: string };
type Testimonial = {
  id: number;
  name: string;
  image: string;
  text: string;
  galleryImages: GalleryImage[];
};

interface TestimonialsProps {
  autoplayMs?: number;
  testimonials?: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Emily & Jason",
    image: "/assets/images/testa1.jpg",
    text: "We couldn't be happier with how the photos turned out. The team was incredibly friendly, patient, and knew exactly how to guide us without making anything feel staged. Every photo felt natural and full of emotion.",
    galleryImages: [
      {
        id: 1,
        src: "/assets/images/testa1-a.jpg",
        alt: "Wedding couple",
      },
      {
        id: 2,
        src: "/assets/images/testa1-b.jpg",
        alt: "Wedding ceremony",
      },
      {
        id: 3,
        src: "/assets/images/testa1-c.jpg",
        alt: "Wedding rings",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah & Michael",
    image: "/assets/images/testa2.jpg",
    text: "The attention to detail was incredible. Every moment was captured beautifully, and the final photos exceeded our expectations. The photographer made us feel so comfortable throughout the entire process.",
    galleryImages: [
      {
        id: 1,
        src: "/assets/images/testa2-a.jpg",
        alt: "Beach wedding",
      },
      {
        id: 2,
        src: "/assets/images/testa2-b.jpg",
        alt: "First dance",
      },
      {
        id: 3,
        src: "/assets/images/testa2-c.jpg",
        alt: "Reception",
      },
    ],
  },
  {
    id: 3,
    name: "Jessica ",
    image: "/assets/images/testa3-c.jpg",
    text: "Our wedding photos are absolutely stunning! The photographer has an amazing eye for capturing those perfect moments. We couldn't have asked for a better experience or more beautiful memories.",
    galleryImages: [
      {
        id: 1,
        src: "/assets/images/testa3-a.jpg",
        alt: "Garden wedding",
      },
      {
        id: 2,
        src: "/assets/images/testa3-b.jpg",
        alt: "Couple portrait",
      },
      {
        id: 3,
        src: "/assets/images/testa3-c.jpg",
        alt: "Wedding details",
      },
    ],
  },
  {
    id: 4,
    name: "Anna & Lucas",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    text: "Professional from start to finish. They captured the day exactly how we felt it—joyful, relaxed, and unforgettable.",
    galleryImages: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=500&fit=crop",
        alt: "Church wedding",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1525772764200-be829ab4612e?w=400&h=250&fit=crop",
        alt: "Wedding party",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop",
        alt: "Celebration",
      },
    ],
  },
  {
    id: 5,
    name: "Maria & James",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
    text: "Absolutely magical experience! Every photo tells our story perfectly. The quality and creativity exceeded all our expectations.",
    galleryImages: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=500&fit=crop",
        alt: "Sunset wedding",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=250&fit=crop",
        alt: "Romantic moment",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1526472518851-75624ce04f6a?w=400&h=250&fit=crop",
        alt: "Wedding cake",
      },
    ],
  },
  {
    id: 6,
    name: "Lisa & Tom",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    text: "The most beautiful wedding photos we could have asked for. Every moment was captured with such artistry and emotion.",
    galleryImages: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=500&fit=crop",
        alt: "Vineyard wedding",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1460978812857-470ed1c2e91d?w=400&h=250&fit=crop",
        alt: "Wedding bouquet",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1605216123436-91a2bab76904?w=400&h=250&fit=crop",
        alt: "Dancing",
      },
    ],
  },
];

const TestimonialsCarousel: React.FC<TestimonialsProps> = ({
  testimonials: testimonialsProp,
}) => {
  const testimonials = testimonialsProp ?? DEFAULT_TESTIMONIALS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cylinder configuration
  const cylinderWidth = isScreenSizeSm ? 1400 : 2200;
  const faceCount = testimonials.length;
  const faceWidth = (cylinderWidth / faceCount) * 1;
  const dragFactor = 0.08;
  const radius = cylinderWidth / (2 * Math.PI);

  // Motion values
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const isAnimatingRef = useRef(false);

  // Transform for smooth rotation
  const transform = useTransform(rotation, (value: number) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  // Handle drag interactions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = (_: any, info: any) => {
    isAnimatingRef.current = false;
    controls.stop();
    rotation.set(rotation.get() + info.delta.x * dragFactor);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (_: any, info: any) => {
    const anglePerCard = 360 / faceCount;
    const currentRot = rotation.get();
    const newRotation = currentRot + info.velocity.x * dragFactor * 0.1;
    const normalizedRotation = ((-newRotation % 360) + 360) % 360;
    const newIndex = Math.round(normalizedRotation / anglePerCard) % faceCount;

    const targetRotation = -newIndex * anglePerCard;

    controls
      .start({
        rotateY: targetRotation,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.8,
        },
      })
      .then(() => {
        isAnimatingRef.current = false;
        setCurrentIndex(newIndex);
      });
  };

  // Navigation functions
  const goToNext = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const newIndex = (currentIndex + 1) % faceCount;
    const targetRotation = rotation.get() - 360 / faceCount;
    controls
      .start({
        rotateY: targetRotation,
        transition: { duration: 0.6, ease: "easeOut" },
      })
      .then(() => {
        isAnimatingRef.current = false;
        setCurrentIndex(newIndex);
      });
  };

  const goToPrev = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const newIndex = (currentIndex - 1 + faceCount) % faceCount;
    const targetRotation = rotation.get() + 360 / faceCount;
    controls
      .start({
        rotateY: targetRotation,
        transition: { duration: 0.6, ease: "easeOut" },
      })
      .then(() => {
        isAnimatingRef.current = false;
        setCurrentIndex(newIndex);
      });
  };

  const goTo = (index: number) => {
    if (isAnimatingRef.current || index === currentIndex) return;
    isAnimatingRef.current = true;
    const anglePerCard = 360 / faceCount;
    const currentRot = rotation.get();
    const targetRotation =
      Math.round(currentRot / anglePerCard) * anglePerCard +
      (currentIndex - index) * anglePerCard;

    controls
      .start({
        rotateY: targetRotation,
        transition: { duration: 0.6, ease: "easeOut" },
      })
      .then(() => {
        isAnimatingRef.current = false;
        setCurrentIndex(index);
      });
  };

  // Effects
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative w-full bg-neutral-950 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center md:mb-16 mb-8">
          <h1
            data-reveal-text
            className="lg:text-5xl md:text-3xl sm:text-2xl text-xl font-bold text-gold text-center will-change-transform will-change-opacity font-freight"
          >
            Kind Words from My Clients
          </h1>
          <p
            data-reveal-text
            className="w-full text-center text-white md:mt-8 mt-4 md:text-xl text-md sm:text-lg font-grotesk will-change-transform will-change-opacity "
          >
            Heartfelt feedback from people I&apos;ve had the honor of working
            with—because their memories mean everything to me.
          </p>
        </div>
        {/* Navigation */}
        <div className="flex justify-center items-center md:gap-6 gap-3 md:mb-16 mb-8 ">
          <button
            onClick={goToPrev}
            className="group md:h-14 md:w-14 h-10 w-10 rounded-full border-2 border-neutral-600/60 bg-neutral-900/80 backdrop-blur-sm text-white hover:bg-neutral-800 hover:border-neutral-500/80 transition-all duration-300 shadow-xl"
            aria-label="Previous testimonial"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              <Image
                src="/assets/images/left-arrow.png"
                alt="Next"
                width={20}
                height={20}
                className="m-auto  "
              />
            </span>
          </button>

          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? "md:w-10 w-6 bg-gradient-to-r from-white to-neutral-300 shadow-lg shadow-white/30"
                    : "md:w-3 w-2  bg-neutral-600 hover:bg-neutral-400 hover:scale-125"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="group md:h-14 md:w-14 h-10 w-10 rounded-full border-2 border-neutral-600/60 bg-neutral-900/80 backdrop-blur-sm text-white hover:bg-neutral-800 hover:border-neutral-500/80 transition-all duration-300 shadow-xl"
            aria-label="Next testimonial"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200 m-auto">
              <Image
                src="/assets/images/right-arrow.png"
                alt="Next"
                width={20}
                height={20}
                className="m-auto"
              />
            </span>
          </button>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[250px] mb-12">
          {/* Gradient overlays
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" /> */}
          {/* 3D Carousel */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              className="relative cursor-grab active:cursor-grabbing"
              style={{
                transform,
                rotateY: rotation,
                width: cylinderWidth,
                height: "100%",
                transformStyle: "preserve-3d",
              }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              animate={controls}
              whileDrag={{ cursor: "grabbing" }}
            >
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${faceWidth}px`,
                    maxWidth: "60vw",
                    transform: `rotateY(${
                      (360 / faceCount) * i
                    }deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-gradient-to-br bg-white/20 shadow-2xl p-6 md:p-8 md:h-[200px] h-[220px] flex flex-col justify-center">
                    <div className="flex items-center mb-6">
                      <div className="md:w-10 md:h-10 h-6 w-6 rounded-full overflow-hidden ring-4 ring-gold shadow-lg">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="ml-4 text-md font-semibold text-white">
                        {testimonial.name}
                      </h3>
                    </div>
                    <blockquote className="text-neutral-200 md:text-xs text-[11px] leading-relaxed italic">
                      &quot;{testimonial.text}&quot;
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Gallery */}
        {/* Gallery */}
        <div className="grid grid-cols-3  md:gap-6 gap-2">
          <motion.figure
            key={`${currentIndex}-main`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/10] col-span-2 overflow-hidden  border border-neutral-800/60 shadow-2xl group"
          >
            <img
              src={testimonials[currentIndex].galleryImages[0].src}
              alt={testimonials[currentIndex].galleryImages[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.figure>

          <div className="grid grid-cols-1 md:gap-6 gap-1">
            <motion.figure
              key={`${currentIndex}-1`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[16/10] overflow-hiddenborder border-neutral-800/60 shadow-2xl group"
            >
              <img
                src={testimonials[currentIndex].galleryImages[1].src}
                alt={testimonials[currentIndex].galleryImages[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.figure>

            <motion.figure
              key={`${currentIndex}-2`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[16/10] overflow-hidden  border border-neutral-800/60 shadow-2xl group"
            >
              <img
                src={testimonials[currentIndex].galleryImages[2].src}
                alt={testimonials[currentIndex].galleryImages[2].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
