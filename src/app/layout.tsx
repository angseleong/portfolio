import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { cv } from "@/data/cv";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: cv.name,
  description: cv.headline,
  openGraph: { title: cv.name, description: cv.headline, type: "website" },
  twitter: { card: "summary_large_image" },
};

// ADR-0012: the same rule as read() in mode.tsx, run before the first paint so CSS can show the right first screen.
const pickMode = `(function(){var m;try{m=localStorage.getItem("mode")}catch(e){}if(m!=="full"&&m!=="compact")m=matchMedia("(prefers-reduced-motion: reduce)").matches?"compact":"full";document.documentElement.dataset.mode=m})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickMode }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
