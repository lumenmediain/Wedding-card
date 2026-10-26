import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Serif_Gurmukhi,
} from "next/font/google";
import { wedding } from "@/config/wedding.config";
import { formatDate } from "@/lib/wedding";
import "./globals.css";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const punjabi = Noto_Serif_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["400", "500"],
  variable: "--font-punjabi",
  display: "swap",
});
export const metadata: Metadata = {
  title: `${wedding.groom.fullName} & ${wedding.bride.fullName} | Wedding Invitation`,
  description: `Join us on ${formatDate(wedding.date)} at ${wedding.venues.map((v) => `${v.name}, ${v.address}`).join("; ")}.`,
  openGraph: {
    title: `${wedding.groom.fullName} & ${wedding.bride.fullName}`,
    description: `With love, we invite you to celebrate with us · ${formatDate(wedding.date)}`,
    type: "website",
  },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${punjabi.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
