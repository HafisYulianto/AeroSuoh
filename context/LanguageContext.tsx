"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.ID) => string;
}

// === BRANKAS KAMUS TERJEMAHAN (UPDATE DASBOR) ===
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
    // Dasbor
    dash_title: "Real-Time Eco-Monitor",
    dash_desc: "Pemantauan data satelit dan sensor geotermal kawasan Kecamatan Suoh, Lampung Barat.",
    dash_sync: "Sinkronisasi API:",
    dash_pdf: "Unduh Laporan PDF",
    dash_temp_title: "Suhu Permukaan (Live)",
    dash_temp_src: "Satelit: Open-Meteo",
    dash_wind_title: "Kecepatan Angin (Live)",
    dash_wind_desc: "Mempengaruhi sebaran gas kawah.",
    dash_h2s_title: "Gas Belerang (H2S)",
    dash_h2s_desc: "Waspada: Kawah Nirwana",
    dash_ph_title: "Keasaman Air (pH)",
    dash_ph_desc: "Danau Asam (Tinggi)",
    dash_chart_title: "Tren Aktivitas Geotermal & Emisi Gas",
    dash_legend_h2s: "Gas Belerang (Kawah Nirwana)",
    dash_legend_gempa: "Getaran Gempa Mikro (Seismik)",
    dash_weather_title: "Status Cuaca Udara Saat Ini",
    dash_weather_loc: "Lokasi Satelit:",
    dash_loading: "Memuat...",
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
    // Dasbor
    dash_title: "Real-Time Eco-Monitor",
    dash_desc: "Satellite data and geothermal sensor monitoring for Suoh District, West Lampung.",
    dash_sync: "Last API Sync:",
    dash_pdf: "Download PDF Report",
    dash_temp_title: "Surface Temp (Live)",
    dash_temp_src: "Satellite: Open-Meteo",
    dash_wind_title: "Wind Speed (Live)",
    dash_wind_desc: "Affects crater gas dispersion.",
    dash_h2s_title: "Sulfur Gas (H2S)",
    dash_h2s_desc: "Alert: Nirwana Crater",
    dash_ph_title: "Water Acidity (pH)",
    dash_ph_desc: "Acid Lake (High)",
    dash_chart_title: "Geothermal Activity & Gas Emission Trends",
    dash_legend_h2s: "Sulfur Gas (Nirwana Crater)",
    dash_legend_gempa: "Micro-Seismic Vibrations",
    dash_weather_title: "Current Weather Status",
    dash_weather_loc: "Satellite Location:",
    dash_loading: "Loading...",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ID");

  const toggleLang = () => {
    setLang((prev) => (prev === "ID" ? "EN" : "ID"));
  };

  const t = (key: keyof typeof translations.ID) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage harus digunakan di dalam LanguageProvider");
  }
  return context;
}