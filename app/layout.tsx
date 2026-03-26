import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// === REVISI: METADATA SEO TINGKAT LANJUT (OpenGraph & Twitter Cards) ===
export const metadata: Metadata = {
  title: "AeroSuoh | Geothermal Eco-Monitor",
  description: "Platform pariwisata pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh, Lampung Barat.",
  keywords: ["AeroSuoh", "Suoh", "Lampung Barat", "Geothermal", "Ecotourism", "Danau Asam", "Teknokrat"],
  authors: [{ name: "Hafis Yulianto" }],
  icons: {
    icon: "/logo-aerosuoh2.png", // Favicon sudah aman!
  },
  openGraph: {
    title: "AeroSuoh | Geothermal Eco-Monitor",
    description: "Platform pariwisata pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh, Lampung Barat.",
    url: "https://aerosuoh.vercel.app", // Ganti dengan domain Vercel asli Anda nanti jika perlu
    siteName: "AeroSuoh",
    images: [
      {
        url: "/hero-suoh.png", // Akan menggunakan gambar Hero sebagai thumbnail saat dishare
        width: 1200,
        height: 630,
        alt: "AeroSuoh Dashboard Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroSuoh | Geothermal Eco-Monitor",
    description: "Platform pariwisata pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh, Lampung Barat.",
    images: ["/hero-suoh.png"],
  },
};
// ======================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}