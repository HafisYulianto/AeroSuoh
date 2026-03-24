"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.ID) => string;
}

// === BRANKAS KAMUS TERJEMAHAN (UPDATE GALERI) ===
const translations = {
  ID: {
    // Navbar & Hero
    nav_home: "Beranda",
    nav_gallery: "Pesona Suoh",
    nav_map: "Pemetaan Udara",
    nav_dash: "Dasbor Sensor",
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

    // === TAMBAHAN BARU: GALERI (PESONA SUOH) ===
    gal_title: "Pesona Suoh",
    gal_subtitle: "Jelajahi keindahan 6 titik utama di kawasan Lampung Barat",
    gal_click_hint: "Klik untuk melihat sejarah & lokasi",
    gal_open_map: "Buka lokasi di Google Maps →",
    gal_history_title: "Sejarah & Asal-usul",
    
    // Lokasi 1
    loc1_title: "Danau Asam",
    loc1_type: "Danau Vulkanik",
    loc1_desc: "Danau dengan tingkat keasaman tinggi. Mengandung belerang, sering digunakan sebagai indikator aktivitas vulkanik pasif.",
    loc1_hist: "Terbentuk dari letusan freatik (letusan uap panas) maha dahsyat Gunung Ratu yang dipicu oleh Gempa Bumi Suoh tahun 1933. Letusan tersebut meninggalkan lubang kawah raksasa yang seiring waktu terisi air hujan. Dinamakan 'Asam' karena airnya memiliki tingkat keasaman (pH) yang ekstrem akibat tingginya kandungan belerang dari dasar kawah.",
    // Lokasi 2
    loc2_title: "Danau Lebar",
    loc2_type: "Ekowisata",
    loc2_desc: "Kawasan danau air tawar terluas di Suoh. Menjadi pusat aktivitas ekonomi lokal dan penyewaan perahu wisata.",
    loc2_hist: "Merupakan 'saudara' dari Danau Asam yang juga lahir dari bencana vulkanik dan tektonik tahun 1933. Dengan luas mencapai 67 hektar, ini adalah danau terluas di Suoh. Keunikannya terletak pada air tawar jernih yang memantulkan warna biru pekat dari kejauhan, serta sebuah pulau kecil yang terbentuk secara alami di tengah-tengahnya.",
    // Lokasi 3
    loc3_title: "Danau Minyak",
    loc3_type: "Danau Vulkanik",
    loc3_desc: "Permukaan airnya terlihat seperti dilapisi minyak. Memiliki aroma khas dan menjadi salah satu daya tarik unik.",
    loc3_hist: "Danau vulkanik ini memiliki fenomena alam yang sangat ganjil. Sejak terbentuk pada 1933, permukaan airnya selalu terlihat mengkilap seolah dilapisi tumpahan minyak, bahkan dulunya sempat tercium aroma seperti minyak tanah. Fenomena ini disebabkan oleh material hidrokarbon dan gas vulkanik yang terperangkap di bawahnya.",
    // Lokasi 4
    loc4_title: "Pasir Kuning",
    loc4_type: "Area Geotermal",
    loc4_desc: "Hamparan pasir berwarna kuning akibat endapan sulfur (belerang). Spot foto favorit pengunjung namun perlu kehati-hatian.",
    loc4_hist: "Bukan pasir biasa dari laut atau sungai. Hamparan pasir ini adalah murni endapan sulfur (belerang) padat yang terakumulasi selama puluhan tahun dari aktivitas panas bumi Suoh. Letaknya yang berada di tepian danau menciptakan ilusi seperti pantai kuning di tengah pegunungan.",
    // Lokasi 5
    loc5_title: "Kawah Nirwana",
    loc5_type: "Geotermal Aktif",
    loc5_desc: "Area manifestasi panas bumi aktif dengan letupan lumpur panas. Suhu permukaan sangat tinggi, perlu pemantauan ketat.",
    loc5_hist: "Dikenal sebagai kawasan yang 'hidup' dan pernah kembali erupsi pada Mei 2024 lalu. Dinamakan 'Nirwana' (surga) karena dari kejauhan, kepulan uap panas bumi yang tebal menutupi area ini hingga terlihat seperti gumpalan awan putih di langit. Berbeda dengan kawah lain yang datar, Nirwana dipenuhi gundukan-gundukan kawah aktif.",
    // Lokasi 6
    loc6_title: "Kawah Keramikan",
    loc6_type: "Geotermal Aktif",
    loc6_desc: "Dataran endapan kawah yang mengeras dan retak menyerupai lantai keramik. Mengeluarkan asap belerang tebal.",
    loc6_hist: "Ini adalah mahakarya Gempa 1933. Saat letusan terjadi, lumpur vulkanik bersuhu ratusan derajat meluap ke permukaan. Selama bertahun-tahun, lumpur tersebut mengendap dan mengeras membentuk lapisan lempengan batu vulkanik berwarna putih kekuningan yang retak-retak. Warga setempat menyebutnya 'Keramikan' karena hamparannya persis seperti lantai keramik raksasa.",
  },
  EN: {
    // Navbar & Hero
    nav_home: "Home",
    nav_gallery: "Suoh Gallery",
    nav_map: "Aerial Map",
    nav_dash: "Sensor Dash",
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

    // === TAMBAHAN BARU: GALERI (PESONA SUOH) ===
    gal_title: "Suoh Charm",
    gal_subtitle: "Explore the beauty of 6 main spots in the West Lampung region",
    gal_click_hint: "Click to view history & location",
    gal_open_map: "Open location in Google Maps →",
    gal_history_title: "History & Origins",
    
    // Lokasi 1
    loc1_title: "Asam Lake",
    loc1_type: "Volcanic Lake",
    loc1_desc: "A lake with a very high acidity level. Contains sulfur and is often used as an indicator of passive volcanic activity.",
    loc1_hist: "Formed by a massive phreatic (steam) eruption of Mount Ratu triggered by the 1933 Suoh Earthquake. The eruption left a giant crater hole that eventually filled with rainwater. Named 'Asam' (Acidic) due to its extreme acidity (pH) caused by the high sulfur content from the crater floor.",
    // Lokasi 2
    loc2_title: "Lebar Lake",
    loc2_type: "Ecotourism",
    loc2_desc: "The largest freshwater lake in Suoh. Serves as the center for local economic activities and tourist boat rentals.",
    loc2_hist: "A 'sibling' to Asam Lake, also born from the 1933 volcanic and tectonic disaster. Covering 67 hectares, it is the widest lake in Suoh. Its uniqueness lies in the clear freshwater that reflects a deep blue color from a distance, along with a naturally formed small island in its center.",
    // Lokasi 3
    loc3_title: "Minyak Lake",
    loc3_type: "Volcanic Lake",
    loc3_desc: "The surface of the water looks as if it is coated with oil. It has a distinct aroma and is a unique attraction.",
    loc3_hist: "This volcanic lake features a very bizarre natural phenomenon. Since its formation in 1933, its surface always looks shiny as if coated with oil spills, and it used to emit a kerosene-like scent. This phenomenon is caused by hydrocarbon materials and volcanic gases trapped beneath it.",
    // Lokasi 4
    loc4_title: "Yellow Sand",
    loc4_type: "Geothermal Area",
    loc4_desc: "A stretch of yellow sand caused by sulfur deposits. A favorite photo spot for visitors, but caution is required.",
    loc4_hist: "Not your regular beach or river sand. This stretch of sand is pure solid sulfur deposits that have accumulated over decades from Suoh's geothermal activity. Its location on the edge of the lake creates the illusion of a yellow beach in the middle of the mountains.",
    // Lokasi 5
    loc5_title: "Nirwana Crater",
    loc5_type: "Active Geothermal",
    loc5_desc: "An active geothermal manifestation area with bubbling hot mud. Extremely high surface temperatures, requires strict monitoring.",
    loc5_hist: "Known as a 'living' area and had recently erupted again in May 2024. Named 'Nirwana' (Heaven) because from afar, the thick geothermal steam covers the area, making it look like white clouds in the sky. Unlike other flat craters, Nirwana is filled with active crater mounds.",
    // Lokasi 6
    loc6_title: "Keramikan Crater",
    loc6_type: "Active Geothermal",
    loc6_desc: "A hardened and cracked crater deposit plain resembling a ceramic floor. Emits thick sulfur smoke.",
    loc6_hist: "This is the masterpiece of the 1933 Earthquake. When the eruption occurred, volcanic mud at hundreds of degrees overflowed to the surface. Over the years, the mud settled and hardened to form layers of cracked yellowish-white volcanic rock plates. Locals call it 'Keramikan' (Ceramics) because the expanse looks exactly like a giant ceramic floor.",
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