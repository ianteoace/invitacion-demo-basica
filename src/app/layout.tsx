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

export const metadata: Metadata = {
  title: "Sofía & Mateo | Invitación Básica",
  description: "Modelo demo de invitación web básica de casamiento",
  openGraph: {
    title: "Sofía & Mateo | Invitación Básica",
    description: "Modelo demo de invitación web básica de casamiento",
    siteName: "Sofía & Mateo | Invitación Básica",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title: "Sofía & Mateo | Invitación Básica",
    description: "Modelo demo de invitación web básica de casamiento",
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
