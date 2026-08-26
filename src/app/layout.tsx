import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project K1.0 — Dein Campus-System für Studium & Wohlbefinden | MyJourney",
  description:
    "Lernpartner finden, Lernplätze buchen, mentale Gesundheit tracken und KI-gestützt lernen — Project K1.0 ist das smarte System für Studierende an deutschen Hochschulen.",
  keywords: [
    "Studium",
    "Lernpartner",
    "Lernplatz",
    "Mentale Gesundheit",
    "KI Lernen",
    "Campus",
    "Hochschule",
    "MyJourney",
  ],
  openGraph: {
    title: "Project K1.0 — Dein Campus-System | MyJourney",
    description:
      "Vier Module. Ein System. Gebaut für den Campus. Jetzt für die Beta bewerben.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
