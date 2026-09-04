import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anggakersana-dev.vercel.app";

const title = "Angga Kersana Munggaran — Senior Full-Stack Engineer";
const description =
  "Senior full-stack engineer with 7+ years in HR technology. Built ASTRNT's Laravel + React recruiter platform and candidate assessment apps, then led their Next.js / TypeScript ground-up rebuild.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s — Angga Kersana Munggaran",
  },
  description,
  applicationName: "Angga Kersana Munggaran — Portfolio",
  authors: [{ name: "Angga Kersana Munggaran" }],
  creator: "Angga Kersana Munggaran",
  publisher: "Angga Kersana Munggaran",
  category: "technology",
  keywords: [
    "senior full-stack engineer",
    "laravel developer",
    "react developer",
    "next.js",
    "php",
    "typescript",
    "HR technology",
    "product engineer",
    "portfolio",
    "web developer indonesia",
    "video interviewing",
    "hiring platform",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Angga Kersana Munggaran",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angga Kersana Munggaran",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Senior Full-Stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "ASTRNT (Astronaut Technologies)",
    url: "https://astrnt.co",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  email: "mailto:anggakersana@gmail.com",
  sameAs: [
    "https://github.com/anggakersanamunggaran",
    "https://www.linkedin.com/in/angga-munggaran/",
  ],
  knowsAbout: [
    "Laravel",
    "PHP",
    "React",
    "Next.js",
    "TypeScript",
    "MySQL",
    "MongoDB",
    "Redis",
    "HR technology",
    "video interviewing",
    "online proctoring",
    "product engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
