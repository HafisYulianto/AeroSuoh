"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.ID) => string;
}

// === BRANKAS KAMUS TERJEMAHAN (UPDATE TENTANG & SDGS) ===
const translations = {
  ID: {
    // Navbar & Hero
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_gallery: "Pesona Suoh",
    nav_map: "Pemetaan Udara",
    nav_dash: "Dasbor Sensor",
    hero_title_1: "Menjaga Harta Karun",
    hero_title_2: "Lampung Barat",
    hero_desc: "Platform pariwisata pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh.",
    hero_btn_1: "Mulai Eksplorasi",
    hero_btn_2: "Lihat Dasbor",
    
    // === TAMBAHAN BARU: TENTANG & SDGS ===
    about_badge: "Latar Belakang & Misi",
    about_title: "Mengangkat Surga Tersembunyi Suoh ke Kancah Global",
    about_desc_1: "Kawasan Suoh menyimpan pesona alam yang luar biasa—mulai dari danau vulkanik yang asri hingga fenomena geotermal yang eksotis. Sayangnya, keindahan alami yang masih sangat terjaga ini belum sepenuhnya terekspos ke dunia luar.",
    about_desc_2: "AeroSuoh hadir untuk menjembatani kesenjangan tersebut. Kami memadukan promosi keajaiban alam ini dengan teknologi pemantauan masa depan. Harapan kami, pariwisata Suoh tidak hanya semakin dikenal di tingkat nasional, tetapi juga mampu bersinar di kancah internasional secara aman dan terkendali.",
    sdg_title: "Mendukung Tujuan Pembangunan Berkelanjutan (SDGs)",
    sdg1_title: "SDG 8 & 11: Ekonomi & Komunitas Berkelanjutan",
    sdg1_desc: "Memberdayakan ekonomi masyarakat lokal melalui sektor pariwisata yang aman, inklusif, dan berkelanjutan.",
    sdg2_title: "SDG 13 & 15: Konservasi & Mitigasi Iklim",
    sdg2_desc: "Mengedukasi pengunjung tentang aktivitas geotermal serta pelestarian ekosistem daratan dan danau vulkanik.",

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

    // Galeri & Lokasi
    gal_title: "Pesona Suoh",
    gal_subtitle: "Jelajahi keindahan 6 titik utama di kawasan Lampung Barat",
    gal_click_hint: "Klik untuk melihat sejarah & lokasi",
    gal_open_map: "Buka lokasi di Google Maps →",
    gal_history_title: "Sejarah & Asal-usul",
    loc1_title: "Danau Asam",
    loc1_type: "Danau Vulkanik",
    loc1_desc: "Danau dengan tingkat keasaman tinggi. Mengandung belerang, sering digunakan sebagai indikator aktivitas vulkanik pasif.",
    loc1_hist: "Terbentuk dari letusan freatik (letusan uap panas) maha dahsyat Gunung Ratu yang dipicu oleh Gempa Bumi Suoh tahun 1933...",
    loc2_title: "Danau Lebar",
    loc2_type: "Ekowisata",
    loc2_desc: "Kawasan danau air tawar terluas di Suoh. Menjadi pusat aktivitas ekonomi lokal dan penyewaan perahu wisata.",
    loc2_hist: "Merupakan 'saudara' dari Danau Asam yang juga lahir dari bencana vulkanik dan tektonik tahun 1933...",
    loc3_title: "Danau Minyak",
    loc3_type: "Danau Vulkanik",
    loc3_desc: "Permukaan airnya terlihat seperti dilapisi minyak. Memiliki aroma khas dan menjadi salah satu daya tarik unik.",
    loc3_hist: "Danau vulkanik ini memiliki fenomena alam yang sangat ganjil. Sejak terbentuk pada 1933...",
    loc4_title: "Pasir Kuning",
    loc4_type: "Area Geotermal",
    loc4_desc: "Hamparan pasir berwarna kuning akibat endapan sulfur (belerang). Spot foto favorit pengunjung namun perlu kehati-hatian.",
    loc4_hist: "Bukan pasir biasa dari laut atau sungai. Hamparan pasir ini adalah murni endapan sulfur (belerang) padat...",
    loc5_title: "Kawah Nirwana",
    loc5_type: "Geotermal Aktif",
    loc5_desc: "Area manifestasi panas bumi aktif dengan letupan lumpur panas. Suhu permukaan sangat tinggi, perlu pemantauan ketat.",
    loc5_hist: "Dikenal sebagai kawasan yang 'hidup' dan pernah kembali erupsi pada Mei 2024 lalu...",
    loc6_title: "Kawah Keramikan",
    loc6_type: "Geotermal Aktif",
    loc6_desc: "Dataran endapan kawah yang mengeras dan retak menyerupai lantai keramik. Mengeluarkan asap belerang tebal.",
    loc6_hist: "Ini adalah mahakarya Gempa 1933. Saat letusan terjadi, lumpur vulkanik bersuhu ratusan derajat meluap ke permukaan...",

    // Panduan Keselamatan
    safe_badge: "Perhatian Pengunjung",
    safe_title: "Panduan Keselamatan Jelajah",
    safe_desc: "Kawasan Suoh adalah alam liar yang memukau sekaligus menyimpan potensi bahaya panas bumi. Demi keselamatan dan kenyamanan bersama, mohon patuhi protokol berikut.",
    safe_rule1_title: "Wajib Masker Gas",
    safe_rule1_desc: "Beberapa area kawah menghasilkan gas sulfur pekat. Gunakan masker respirator khusus untuk pernapasan.",
    safe_rule2_title: "Sepatu Trekking Tertutup",
    safe_rule2_desc: "Suhu permukaan tanah (seperti di Keramikan) bisa sangat panas. Dilarang keras memakai sandal.",
    safe_rule3_title: "Didampingi Pemandu",
    safe_rule3_desc: "Jalur dan geotermal rawan ambles jika tidak hafal medan. Selalu patuhi arahan pemandu lokal.",
    safe_rule4_title: "Patuhi Zona Aman",
    safe_rule4_desc: "Jangan pernah melewati batas rambu peringatan zona merah atau mendekati pusat letupan lumpur.",

    // Peta Udara
    map_title: "Penjelajah Udara 3D Live",
    map_desc: "Pemetaan satelit 3D interaktif kawasan Kecamatan Suoh, Lampung Barat. Tahan klik kanan (Right-Click) untuk memutar.",
    map_auto_on: "AUTOPILOT: AKTIF",
    map_auto_off: "KENDALI MANUAL",
    map_auto_warn: "Auto-rotate dimatikan. Refresh halaman untuk mereset.",
    map_therm_on: "THERMAL NYALA",
    map_therm_off: "REKAM / THERMAL",
    map_therm_btn_on: "MATIKAN THERMAL",
    map_therm_btn_off: "AKTIFKAN THERMAL",
    map_ctrl: "Drag: Geser | Scroll: Zoom | Klik Kanan: Putar 3D",
    map_temp: "SUHU",
    map_ph: "pH AIR",
    map_gas: "H2S (GAS)",
    stat_normal: "Normal",
    stat_safe1: "Aman Dikunjungi",
    stat_safe2: "Aman (Patuhi Jalur)",
    stat_warn1: "Waspada (Zona Merah)",
    stat_warn2: "Waspada (Zona Kuning)",

    // Footer
    foot_nav_title: "Navigasi Sistem",
    foot_nav_safety: "Panduan Keselamatan",
    foot_loc_title: "Lokasi",
    foot_loc_1: "Kecamatan Suoh, Kabupaten Lampung Barat,",
    foot_loc_2: "Lampung, Indonesia",
    foot_copy: "© 2026 AeroSuoh Eco-Monitor. Hak Cipta Dilindungi.",
  },
  EN: {
    // Navbar & Hero
    nav_home: "Home",
    nav_about: "About",
    nav_gallery: "Suoh Gallery",
    nav_map: "Aerial Map",
    nav_dash: "Sensor Dash",
    hero_title_1: "Guarding the Treasure of",
    hero_title_2: "West Lampung",
    hero_desc: "Smart ecological tourism platform and future real-time geothermal monitoring dashboard for the Suoh region.",
    hero_btn_1: "Start Exploring",
    hero_btn_2: "View Dashboard",
    
    // === TAMBAHAN BARU: TENTANG & SDGS ===
    about_badge: "Background & Mission",
    about_title: "Elevating Suoh's Hidden Paradise to the Global Stage",
    about_desc_1: "The Suoh region harbors extraordinary natural charm—from pristine volcanic lakes to exotic geothermal phenomena. Unfortunately, this beautifully preserved 'hidden paradise' remains underexposed to the outside world.",
    about_desc_2: "AeroSuoh was created to bridge this gap. We combine the promotion of these pristine natural wonders with futuristic monitoring technology. Our hope is that Suoh's tourism will not only be recognized nationally but will shine internationally in a safe and sustainable manner.",
    sdg_title: "Supporting Sustainable Development Goals (SDGs)",
    sdg1_title: "SDG 8 & 11: Sustainable Economy & Communities",
    sdg1_desc: "Empowering the local community's economy through safe, inclusive, and sustainable tourism.",
    sdg2_title: "SDG 13 & 15: Climate Mitigation & Conservation",
    sdg2_desc: "Educating visitors on climate mitigation, geothermal activity, and the conservation of terrestrial and volcanic lake ecosystems.",

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

    // Galeri & Lokasi
    gal_title: "Suoh Charm",
    gal_subtitle: "Explore the beauty of 6 main spots in the West Lampung region",
    gal_click_hint: "Click to view history & location",
    gal_open_map: "Open location in Google Maps →",
    gal_history_title: "History & Origins",
    loc1_title: "Asam Lake",
    loc1_type: "Volcanic Lake",
    loc1_desc: "A lake with a very high acidity level. Contains sulfur and is often used as an indicator of passive volcanic activity.",
    loc1_hist: "Formed by a massive phreatic (steam) eruption of Mount Ratu triggered by the 1933 Suoh Earthquake...",
    loc2_title: "Lebar Lake",
    loc2_type: "Ecotourism",
    loc2_desc: "The largest freshwater lake in Suoh. Serves as the center for local economic activities and tourist boat rentals.",
    loc2_hist: "A 'sibling' to Asam Lake, also born from the 1933 volcanic and tectonic disaster...",
    loc3_title: "Minyak Lake",
    loc3_type: "Volcanic Lake",
    loc3_desc: "The surface of the water looks as if it is coated with oil. It has a distinct aroma and is a unique attraction.",
    loc3_hist: "This volcanic lake features a very bizarre natural phenomenon. Since its formation in 1933...",
    loc4_title: "Yellow Sand",
    loc4_type: "Geothermal Area",
    loc4_desc: "A stretch of yellow sand caused by sulfur deposits. A favorite photo spot for visitors, but caution is required.",
    loc4_hist: "Not your regular beach or river sand. This stretch of sand is pure solid sulfur deposits...",
    loc5_title: "Nirwana Crater",
    loc5_type: "Active Geothermal",
    loc5_desc: "An active geothermal manifestation area with bubbling hot mud. Extremely high surface temperatures, requires strict monitoring.",
    loc5_hist: "Known as a 'living' area and had recently erupted again in May 2024...",
    loc6_title: "Keramikan Crater",
    loc6_type: "Active Geothermal",
    loc6_desc: "A hardened and cracked crater deposit plain resembling a ceramic floor. Emits thick sulfur smoke.",
    loc6_hist: "This is the masterpiece of the 1933 Earthquake. When the eruption occurred, volcanic mud at hundreds of degrees overflowed...",

    // Panduan Keselamatan
    safe_badge: "Important Notice",
    safe_title: "Exploration Safety Guide",
    safe_desc: "The Suoh area is a stunning wilderness that also holds geothermal hazards. For our mutual safety and comfort, please obey the following protocols.",
    safe_rule1_title: "Gas Mask Required",
    safe_rule1_desc: "Some crater areas produce concentrated sulfur gas. Use a specialized respirator mask for breathing.",
    safe_rule2_title: "Closed Trekking Shoes",
    safe_rule2_desc: "Ground surface temperatures (like in Keramikan) can be extremely hot. Wearing sandals is strictly prohibited.",
    safe_rule3_title: "Accompanied by a Guide",
    safe_rule3_desc: "Ecological and geothermal paths are prone to caving in if you don't know the terrain. Always follow local guide instructions.",
    safe_rule4_title: "Obey Safe Zones",
    safe_rule4_desc: "Never cross the red zone warning signs or approach the center of mud eruptions.",

    // Peta Udara
    map_title: "Live 3D Aerial Explorer",
    map_desc: "Interactive 3D satellite mapping of Suoh District, West Lampung. Hold Right-Click to rotate.",
    map_auto_on: "AUTOPILOT: ACTIVE",
    map_auto_off: "MANUAL OVERRIDE",
    map_auto_warn: "Auto-rotate disabled. Refresh page to reset.",
    map_therm_on: "THERMAL ON",
    map_therm_off: "REC / THERMAL",
    map_therm_btn_on: "DISABLE THERMAL",
    map_therm_btn_off: "ENABLE THERMAL",
    map_ctrl: "Drag: Pan | Scroll: Zoom | Right-Click: Rotate 3D",
    map_temp: "TEMP",
    map_ph: "WATER pH",
    map_gas: "H2S (GAS)",
    stat_normal: "Normal",
    stat_safe1: "Safe to Visit",
    stat_safe2: "Safe (Stay on Path)",
    stat_warn1: "Alert (Red Zone)",
    stat_warn2: "Alert (Yellow Zone)",

    // Footer
    foot_nav_title: "System Navigation",
    foot_nav_safety: "Safety Guide",
    foot_loc_title: "Location",
    foot_loc_1: "Suoh District, West Lampung Regency,",
    foot_loc_2: "Lampung, Indonesia",
    foot_copy: "© 2026 AeroSuoh Eco-Monitor. All Rights Reserved.",
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