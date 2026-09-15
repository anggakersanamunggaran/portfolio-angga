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
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();

  /*
   * The homepage opens on a black hero, so while the nav sits over it the
   * links have to be white. Everything else is black on paper.
   *
   * The flip point is measured from the hero element itself rather than from a
   * fixed pixel value or window.innerHeight: the hero is min-h-screen but its
   * content can push it taller than the viewport on short or narrow screens,
   * so a viewport-based threshold would flip the nav to black while the hero
   * is still underneath it.
   */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const onScroll = () => {
      if (!hero) {
        // No hero on this route (/career), so the nav is never over ink.
        setPastHero(false);
        return;
      }
      setPastHero(hero.getBoundingClientRect().bottom <= 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // /career has no black hero, so it stays in the light state from the start.
  const overHero = pathname === "/" && !pastHero;

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

  const navItemClass = `label-micro block px-3 py-2 transition-colors ${
    overHero ? "text-white/65 hover:text-white" : "text-muted hover:text-ink"
  }`;

  const ctaClass = `ml-2 inline-flex items-center gap-1.5 px-4 py-2.5 label-micro transition-colors ${
    overHero
      ? "bg-white text-black hover:bg-white/85"
      : "bg-black text-white hover:bg-neutral-800"
  }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        overHero ? "bg-transparent" : "bg-paper border-b border-rule"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className={`text-base font-bold uppercase tracking-tight transition-colors ${
              overHero ? "text-white" : "text-ink"
            }`}
          >
            {personalInfo.shortName}
            <span className={overHero ? "text-white" : "text-ink"}>.</span>
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
                className={ctaClass}
              >
                Check out my resume
                <Download size={15} />
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              overHero ? "text-white" : "text-ink"
            }`}
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
        <ul
          className={`border-b px-6 py-4 space-y-1 ${
            overHero ? "bg-black border-white/20" : "bg-paper border-rule"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
                className={`py-2.5 ${navItemClass}`}
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
              className={`mt-2 flex items-center justify-between px-4 py-3 ${ctaClass.replace("ml-2 ", "")}`}
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
