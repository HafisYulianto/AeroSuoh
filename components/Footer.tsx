import { MapPin, Mail, Home, Map, Activity, Camera, ShieldAlert } from "lucide-react";
// === TAMBAHAN: Import context bahasa global ===
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  // === Panggil kekuatan Global State ===
  const { t } = useLanguage();

  return (
    <footer className="bg-[#013220] text-emerald-100 py-12 border-t border-emerald-900 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Kolom Kiri: Brand & Deskripsi */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo-aerosuoh2.png" alt="Logo AeroSuoh" className="h-10 w-auto object-contain" />
              <span className="text-2xl font-bold text-white tracking-tight">Aero<span className="text-emerald-400">Suoh</span></span>
            </div>
            {/* Menggunakan terjemahan dari deskripsi Hero agar konsisten */}
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm">
              {t("hero_desc")}
            </p>
          </div>

          {/* Kolom Tengah: Navigasi Sistem */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("foot_nav_title")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="flex items-center gap-2 text-sm hover:text-white hover:translate-x-1 transition-transform">
                  <Home size={16} className="text-emerald-500" /> {t("nav_home")}
                </a>
              </li>
              <li>
                <a href="#gallery" className="flex items-center gap-2 text-sm hover:text-white hover:translate-x-1 transition-transform">
                  <Camera size={16} className="text-emerald-500" /> {t("nav_gallery")}
                </a>
              </li>
              <li>
                <a href="#safety" className="flex items-center gap-2 text-sm hover:text-white hover:translate-x-1 transition-transform">
                  <ShieldAlert size={16} className="text-emerald-500" /> {t("foot_nav_safety")}
                </a>
              </li>
              <li>
                <a href="#explorer" className="flex items-center gap-2 text-sm hover:text-white hover:translate-x-1 transition-transform">
                  <Map size={16} className="text-emerald-500" /> {t("nav_map")}
                </a>
              </li>
              <li>
                <a href="#dashboard" className="flex items-center gap-2 text-sm hover:text-white hover:translate-x-1 transition-transform">
                  <Activity size={16} className="text-emerald-500" /> {t("nav_dash")}
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom Kanan: Pusat Kendali */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("foot_loc_title")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t("foot_loc_1")}<br />{t("foot_loc_2")}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Garis Bawah & Copyright */}
        <div className="mt-12 pt-6 border-t border-emerald-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-emerald-100/60">
            {t("foot_copy")}
          </p>
          <Activity size={16} className="text-emerald-500/50" />
        </div>
      </div>
    </footer>
  );
}