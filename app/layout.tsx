import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// === TAMBAHAN: Import LanguageProvider dari folder context ===
import { LanguageProvider } from "../context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// === BAGIAN METADATA YANG DIPERBARUI ===
export const metadata: Metadata = {
  title: "AeroSuoh | Geothermal Eco-Monitor",
  description: "Platform pariwisata ekologis pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh, Lampung Barat.",
  icons: {
    icon: "/logo-aerosuoh2.png",
  },
};
// ======================================

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
        {/* === BUNGKUS SELURUH APLIKASI DENGAN PROVIDER BAHASA === */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}