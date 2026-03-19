"use client";

import { useState } from "react";
import { Map, Activity, Home, Camera, Globe } from "lucide-react";

export default function Navbar() {
  // State untuk melacak bahasa yang sedang aktif (ID = Indonesia, EN = English)
  const [lang, setLang] = useState<"ID" | "EN">("ID");

  // Fungsi untuk menukar bahasa saat tombol di-klik
  const toggleLang = () => {
    setLang(lang === "ID" ? "EN" : "ID");
  };

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
          
          {/* Menu Navigasi & Tombol Bahasa */}
          <div className="flex items-center gap-6 md:gap-8">
            
            {/* Tautan Menu (Teks berubah sesuai state 'lang') */}
            <div className="hidden lg:flex space-x-8">
              <a href="#home" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Home size={20} /> 
                <span>{lang === "ID" ? "Beranda" : "Home"}</span>
              </a>

              <a href="#gallery" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Camera size={20} /> 
                <span>{lang === "ID" ? "Pesona Suoh" : "Gallery"}</span>
              </a>

              <a href="#explorer" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Map size={20} /> 
                <span>{lang === "ID" ? "Pemetaan Udara" : "Aerial Map"}</span>
              </a>

              <a href="#dashboard" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
                <Activity size={20} /> 
                <span>{lang === "ID" ? "Dasbor Sensor" : "Sensor Dash"}</span>
              </a>
            </div>

            {/* Garis Pemisah Visual */}
            <div className="hidden lg:block h-8 w-px bg-emerald-800"></div>

            {/* Tombol Ganti Bahasa (Desain Input dan Output Interaktif) */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-emerald-100 hover:text-white hover:bg-emerald-700 hover:border-emerald-500 hover:shadow-lg transition-all font-bold text-sm shadow-sm active:scale-95"
              title="Change Language"
            >
              <Globe size={18} className={lang === "EN" ? "text-amber-400" : "text-emerald-400"} />
              {lang}
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}