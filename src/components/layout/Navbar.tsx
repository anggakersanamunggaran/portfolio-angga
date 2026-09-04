"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect, type MouseEvent } from "react";
import { personalInfo } from "@/data/portfolio";

const navLinks: { href: string; label: string }[] = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/career", label: "Career" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section links point to "/#section" so they work from any page.
  // When already on the homepage, smooth-scroll instead of re-navigating.
  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return; // page link, let Next navigate
    const hash = href.slice(hashIndex);
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItemClass =
    "px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5";

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
            href="/"
            onClick={handleLogoClick}
            className="text-lg font-semibold tracking-tight text-brand-primary dark:text-white"
          >
            {personalInfo.shortName}
            <span className="text-brand-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={(e) => handleSectionClick(e, link.href)} className={navItemClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.resumeUrl}
                download
                aria-label="Download CV"
                className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-brand-primary dark:bg-white text-white dark:text-brand-primary hover:bg-brand-accent dark:hover:bg-brand-100 transition-all"
              >
                Check out my resume
                <Download size={15} />
              </a>
            </li>
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
              <Link
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
                className={`block px-4 py-2.5 ${navItemClass}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={personalInfo.resumeUrl}
              download
              onClick={() => setIsOpen(false)}
              aria-label="Download CV"
              className="mt-1 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-brand-primary dark:bg-white text-white dark:text-brand-primary hover:bg-brand-accent dark:hover:bg-brand-100 transition-all"
            >
              Check out my resume
              <Download size={15} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
