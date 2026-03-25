"use client";

import { useState } from "react";
// === TAMBAHAN: Import ikon 'Menu' dan 'X' untuk Mobile Navbar ===
import { Map, Activity, Home, Camera, Globe, Info, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  
  // === STATE BARU: Mengontrol menu HP terbuka atau tertutup ===
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#013220] shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo-aerosuoh2.png" 
              alt="Logo AeroSuoh" 
              className="h-33 w-auto object-contain cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>
          
          {/* Menu Navigasi & Tombol Bahasa (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-6 md:gap-8">
            <div className="flex space-x-8">
              <a href="#home" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Home size={20} /> <span>{t("nav_home")}</span>
              </a>
              <a href="#about" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Info size={20} /> <span>{t("nav_about")}</span>
              </a>
              <a href="#gallery" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Camera size={20} /> <span>{t("nav_gallery")}</span>
              </a>
              <a href="#explorer" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Map size={20} /> <span>{t("nav_map")}</span>
              </a>
              <a href="#dashboard" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Activity size={20} /> <span>{t("nav_dash")}</span>
              </a>
            </div>

            <div className="h-8 w-px bg-emerald-800"></div>

            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-emerald-100 hover:text-white hover:bg-emerald-700 hover:border-emerald-500 hover:shadow-lg transition-all font-bold text-sm shadow-sm active:scale-95"
              title="Change Language"
            >
              <Globe size={18} className={lang === "EN" ? "text-amber-400" : "text-emerald-400"} />
              {lang}
            </button>
          </div>

          {/* === TOMBOL HAMBURGER (KHUSUS MOBILE) === */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Tombol ganti bahasa juga kita taruh di luar menu hamburger agar mudah diakses di HP */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-emerald-100 hover:text-white font-bold text-xs"
            >
              <Globe size={14} className={lang === "EN" ? "text-amber-400" : "text-emerald-400"} />
              {lang}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-100 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* === PANEL MENU DROPDOWN (KHUSUS MOBILE) === */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#013220]/95 backdrop-blur-md border-t border-emerald-800 shadow-2xl">
          <div className="flex flex-col px-4 py-6 space-y-4">
            <a href="#home" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-emerald-100 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-all font-medium">
              <Home size={20} /> <span>{t("nav_home")}</span>
            </a>
            <a href="#about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-emerald-100 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-all font-medium">
              <Info size={20} /> <span>{t("nav_about")}</span>
            </a>
            <a href="#gallery" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-emerald-100 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-all font-medium">
              <Camera size={20} /> <span>{t("nav_gallery")}</span>
            </a>
            <a href="#explorer" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-emerald-100 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-all font-medium">
              <Map size={20} /> <span>{t("nav_map")}</span>
            </a>
            <a href="#dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-emerald-100 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-all font-medium">
              <Activity size={20} /> <span>{t("nav_dash")}</span>
            </a>
          </div>
        </div>
      )}

    </nav>
  );
}