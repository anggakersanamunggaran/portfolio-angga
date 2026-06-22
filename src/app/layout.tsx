import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Angga Kersana Munggaran — Full-Stack Engineer",
    template: "%s — Angga Kersana Munggaran",
  },
  description:
    "Full-stack engineer building AI-powered hiring platforms, e-commerce monitoring systems, and developer tools. Specializing in Next.js, React, Node.js, and Cloud Infrastructure.",
  keywords: [
    "full-stack engineer",
    "next.js developer",
    "react developer",
    "typescript",
    "AI integration",
    "portfolio",
    "web developer indonesia",
  ],
  authors: [{ name: "Angga Kersana Munggaran" }],
  creator: "Angga Kersana Munggaran",
  metadataBase: new URL("https://portfolio-angga.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Angga Kersana Munggaran",
    title: "Angga Kersana Munggaran — Full-Stack Engineer",
    description:
      "Full-stack engineer building AI-powered hiring platforms, e-commerce monitoring systems, and developer tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angga Kersana Munggaran — Full-Stack Engineer",
    description:
      "Full-stack engineer building AI-powered hiring platforms, e-commerce monitoring systems, and developer tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
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
      <body className="min-h-full flex flex-col bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
