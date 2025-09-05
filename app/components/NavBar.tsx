"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 bg-[#0A0E14]/20 backdrop-blur supports-[backdrop-filter]:bg-[#0A0E14]/20 shadow-md"
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 md:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="RealSoul Photography Logo"
            width={130}
            height={30}
            className="h-auto w-[130px] rounded-md object-contain"
            priority
          />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-50 flex h-6 w-8 flex-col items-center justify-between md:hidden"
        >
          <span
            className={`h-[3px] w-full rounded bg-white transition-transform duration-300 ${
              open ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[3px] w-full rounded bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[3px] w-full rounded bg-white transition-transform duration-300 ${
              open ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-[#d4af37]"
                    : "text-white hover:text-[#d4af37]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute left-0 right-0 top-full origin-top bg-[#0A0E14]/40 backdrop-blur supports-[backdrop-filter]:bg-[#0A0E14]/40 shadow-lg transition-all duration-300 ${
            open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-stretch gap-2 px-4 py-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-4 py-3 text-center text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? "text-[#d4af37]"
                      : "text-white hover:text-[#d4af37]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
