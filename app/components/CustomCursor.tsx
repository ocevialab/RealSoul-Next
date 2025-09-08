"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor({
  x,
  y,
  show,
  label = "view",
  size = 68,
  zIndex = 2000,
}: {
  x: number;
  y: number;
  show: boolean;
  label?: string;
  size?: number;
  zIndex?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    xTo.current = gsap.quickTo(ref.current, "x", {
      duration: 0.18,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(ref.current, "y", {
      duration: 0.18,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (xTo.current) xTo.current(x - size / 2);
    if (yTo.current) yTo.current(y - size / 2);
  }, [x, y, size]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      autoAlpha: show ? 1 : 0,
      scale: show ? 1 : 0.9,
      duration: 0.18,
      ease: "power3.out",
    });
  }, [show]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 select-none"
      style={{ width: size, height: size, opacity: 0, zIndex }}
      aria-hidden
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.85)",
          color: "#fff",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: 12,
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
