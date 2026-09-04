"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";

const navLinks: { href: string; label: string; page?: boolean }[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "/career", label: "Career", page: true },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl border-b border-neutral-200 dark:border-border-dark-subtle shadow-xs"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#"
            className="text-lg font-semibold tracking-tight text-brand-primary dark:text-white"
          >
            {personalInfo.shortName}
            <span className="text-brand-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.page ? (
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-white transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-white dark:bg-surface-dark border-b border-neutral-200 dark:border-border-dark-subtle px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.page ? (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
