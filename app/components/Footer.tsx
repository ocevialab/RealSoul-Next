// components/Footer.tsx
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { JSX } from "react/jsx-runtime";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-darkGreen text-white pt-8 pb-6 font-grotesk">
      <div className="mx-auto max-w-[1800px] px-5">
        {/* Top row: Brand | Nav | Social */}
        <div className="grid min-h-14 grid-cols-1 items-center gap-4 md:grid-cols-3">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold tracking-wide font-freight">
              RealSoul
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex items-center md:justify-center justify-between item-center w-full md:gap-12 gap-4 font-grotesk md:text-md text-xs"
          >
            <a
              href="#home"
              className="text-base opacity-90 transition-opacity hover:opacity-100"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-base opacity-90 transition-opacity hover:opacity-100"
            >
              About Me
            </a>
            <a
              href="#gallery"
              className="text-base opacity-90 transition-opacity hover:opacity-100"
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="text-base opacity-90 transition-opacity hover:opacity-100"
            >
              Contact
            </a>
          </nav>

          <div
            aria-label="Social links"
            className="flex justify-center gap-7 text-2xl md:justify-end"
          >
            <a
              href="#"
              aria-label="Facebook"
              className="opacity-90 transition-opacity hover:opacity-100"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="opacity-90 transition-opacity hover:opacity-100"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="opacity-90 transition-opacity hover:opacity-100"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="opacity-90 transition-opacity hover:opacity-100"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Center logo */}
        <div className="flex items-center justify-center py-4">
          <Image
            src="/logo.png"
            alt="RealSoul logo"
            width={200}
            height={100}
            className="h-24 w-auto opacity-95 md:h-[100px]"
            priority={false}
          />
        </div>

        {/* Bottom row: contacts left | copyright right */}
        <div className="grid grid-cols-1 items-center gap-2 pt-2 md:grid-cols-2">
          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-90 md:justify-start">
            <span className="whitespace-nowrap">+98 123456789</span>
            <span className="whitespace-nowrap">contact@realsoul.com</span>
          </div>

          <div className="text-center md:text-sm text-xs opacity-80 md:text-right">
            © 2025 Realsoul All Rights Reserved. A Ocevialab website
          </div>
        </div>
      </div>
    </footer>
  );
}
