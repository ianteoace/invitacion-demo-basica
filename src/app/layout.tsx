import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const melodrama = localFont({
  variable: "--font-melodrama",
  src: "./fonts/Melodrama-Medium.woff",
  weight: "500",
  style: "normal",
});

const reciaRegular = localFont({
  variable: "--font-recia-regular",
  src: "./fonts/Recia-Regular.otf",
  weight: "400",
  style: "normal",
});

const heroImagePath = path.join(process.cwd(), "public", "hero", "infantil.jpg");
const ogImagePath = path.join(process.cwd(), "public", "og-image.jpg");
const shareImageUrl = existsSync(heroImagePath)
  ? "/hero/infantil.jpg"
  : existsSync(ogImagePath)
    ? "/og-image.jpg"
    : undefined;

const shareTitle = "Cumple de Emma | Invitación Demo";
const shareDescription = "Modelo demo de invitación web para eventos infantiles";

export const metadata: Metadata = {
  metadataBase: new URL("https://demo-invitacion.example"),
  title: shareTitle,
  description: shareDescription,
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: "https://demo-invitacion.example",
    siteName: shareTitle,
    images: shareImageUrl
      ? [
          {
            url: shareImageUrl,
            width: 1200,
            height: 630,
            alt: "Cumple de Emma",
          },
        ]
      : [],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: shareImageUrl ? [shareImageUrl] : [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${melodrama.variable} ${reciaRegular.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
