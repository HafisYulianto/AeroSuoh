"use client";

import { createContext, useState, useContext, ReactNode } from "react";

// Tipe data bahasa kita
type Language = "ID" | "EN";

// Struktur data yang akan disiarkan ke seluruh web
interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.ID) => string;
}

// === BRANKAS KAMUS TERJEMAHAN ===
// (Sementara kita isi untuk Navbar dan Hero dulu, nanti kita tambah)
const translations = {
  ID: {
    // Navbar
    nav_home: "Beranda",
    nav_gallery: "Pesona Suoh",
    nav_map: "Pemetaan Udara",
    nav_dash: "Dasbor Sensor",
    // Hero
    hero_title_1: "Menjaga Harta Karun",
    hero_title_2: "Lampung Barat",
    hero_desc: "Platform pariwisata ekologis pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh.",
    hero_btn_1: "Mulai Eksplorasi",
    hero_btn_2: "Lihat Dasbor",
  },
  EN: {
    // Navbar
    nav_home: "Home",
    nav_gallery: "Suoh Gallery",
    nav_map: "Aerial Map",
    nav_dash: "Sensor Dash",
    // Hero
    hero_title_1: "Guarding the Treasure of",
    hero_title_2: "West Lampung",
    hero_desc: "Smart ecological tourism platform and future real-time geothermal monitoring dashboard for the Suoh region.",
    hero_btn_1: "Start Exploring",
    hero_btn_2: "View Dashboard",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ID");

  const toggleLang = () => {
    setLang((prev) => (prev === "ID" ? "EN" : "ID"));
  };

  // Fungsi sakti untuk menerjemahkan teks berdasarkan kunci (key)
  const t = (key: keyof typeof translations.ID) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook kustom agar komponen lain gampang memanggil context ini
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage harus digunakan di dalam LanguageProvider");
  }
  return context;
}