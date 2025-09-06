"use client";
import Image from "next/image";
import React from "react";

interface GalleryProps {
  images?: Array<string>;
}

export default function Images({ images }: GalleryProps) {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-darkGreen font-display overflow-hidden">
      {images && images.length > 0 && (
        <div className="columns-3 sm:columns-3 md:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
          {images.map((src, index) => (
            <div
              key={index}
              data-reveal-img
              className="w-full overflow-hidden shadow-md sm:shadow-lg break-inside-avoid cursor-pointer will-change-transform will-change-opacity"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={400}
                height={400}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw"
                className="w-full h-auto object-cover"
                priority={index < 3} // help LCP
                loading={index < 3 ? undefined : "lazy"} // lazy for the rest
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
