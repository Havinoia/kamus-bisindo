"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Dictionary", href: "/", active: true },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Regions", href: "#regions" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 glass-nav shadow-ambient">
      <div className="flex justify-between items-center h-20 px-6 lg:px-8 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-primary font-headline"
        >
          Kamus BISINDO
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-headline text-sm tracking-tight transition-all duration-300 ${
                link.active
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 duration-200 ease-in-out">
            Sign In
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-primary text-3xl">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container-lowest/95 glass-nav border-t border-outline-variant/20 animate-fade-in-up">
          <div className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-headline text-base py-2 transition-colors ${
                  link.active
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm mt-2 hover:shadow-lg transition-all active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
