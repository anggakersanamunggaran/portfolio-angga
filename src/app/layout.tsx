import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Inter is a variable font, so weights 800/900 for the display type cost
// nothing extra to load.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Single weight, used only for the italic emphasis word inside headlines.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
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
  /*
   * Icons are not declared here on purpose. `favicon.ico`, `icon.png` and
   * `apple-icon.png` in this directory are file conventions, so Next emits the
   * link tags itself. Declaring them as well produced a duplicate set, and the
   * generated one for a stale `favicon.ico` was winning, which is how the
   * create-next-app default icon survived a full restyle unnoticed.
   */
};

export const viewport: Viewport = {
  // Single fixed theme now, so no prefers-color-scheme pair. Black matches the
  // hero, which fills the first viewport.
  themeColor: "#000000",
  // Stops the browser rendering dark native UI (scrollbars, form controls,
  // select popups) for visitors whose OS is in dark mode.
  colorScheme: "light",
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
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-body font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
