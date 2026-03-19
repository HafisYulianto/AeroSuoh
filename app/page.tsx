"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AerialExplorer from "../components/AerialExplorer"; 
import Footer from "../components/Footer"; 
import PhotoSlider from "../components/PhotoSlider";
import SafetyGuide from "../components/SafetyGuide";
import GeothermalParticles from "../components/GeothermalParticles";
// === TAMBAHAN: Import komponen Audio ===
import AudioButton from "../components/AudioButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-x-hidden print:bg-white">
      
      <div className="print:hidden">
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <div 
        id="home" 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-16 bg-cover bg-center bg-no-repeat print:hidden"
        style={{ backgroundImage: "url('/hero-suoh.png')" }}
      >
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-slate-900/70 -z-10"></div>
        
        {/* === EFEK UAP PANAS BUMI === */}
        <div className="absolute inset-0 z-0"> 
          <GeothermalParticles />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10" 
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-md">
            Menjaga Harta Karun <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-amber-400">
              Lampung Barat
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10" 
        >
          <p className="max-w-2xl text-lg md:text-xl text-slate-200 mb-10 drop-shadow">
            Platform pariwisata ekologis pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="relative z-10 flex flex-wrap justify-center gap-4" 
        >
          <a href="#explorer" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-900/50 transition-all border border-emerald-500">
            Mulai Eksplorasi
          </a>
          <a href="#dashboard" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full shadow-sm transition-all cursor-pointer">
            Lihat Dasbor
          </a>
        </motion.div>
      </div>

      {/* Animasi Scroll Reveal untuk Slider Foto */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 print:hidden"
      >
        <PhotoSlider />
      </motion.div>

      {/* Animasi Scroll Reveal untuk Panduan Keselamatan */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 print:hidden"
      >
        <SafetyGuide />
      </motion.div>

      {/* Animasi Scroll Reveal untuk Peta Interaktif */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-slate-100 border-b border-slate-200 shadow-inner print:hidden"
      >
        <AerialExplorer />
      </motion.div>

      {/* Animasi Scroll Reveal untuk Dasbor Sensor */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-slate-50 print:bg-white print:m-0 print:p-0"
      >
        <Dashboard />
      </motion.div>

      {/* === SENJATA RAHASIA #1: AUDIO IMERSIF === */}
      <AudioButton />

      <Footer />

    </main>
  );
}