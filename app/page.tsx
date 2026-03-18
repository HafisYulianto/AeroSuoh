"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AerialExplorer from "../components/AerialExplorer"; // Import komponen baru

export default function Home() {
  return (
    // Tambahan: print:bg-white agar background kertas putih bersih saat dicetak
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-x-hidden print:bg-white">
      
      {/* Tambahan: Bungkus Navbar dengan print:hidden agar tidak ikut tercetak */}
      <div className="print:hidden">
        <Navbar />
      </div>
      
      {/* Hero Section dengan Background Foto */}
      {/* Tambahan: Tambahkan print:hidden di className Hero */}
      <div 
        id="home" 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-16 bg-cover bg-center bg-no-repeat print:hidden"
        style={{ backgroundImage: "url('/hero-suoh.png')" }}
      >
        {/* Overlay Gelap agar teks dan foto sama-sama terlihat jelas */}
        <div className="absolute inset-0 bg-slate-900/70 -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Warna teks diubah menjadi text-white agar kontras dengan background gelap */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-md">
            Menjaga Harta Karun <br />
            {/* Gradien dicerahkan sedikit agar lebih menyala di layar gelap */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
              Lampung Barat
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Warna teks deskripsi diubah menjadi text-slate-200 */}
          <p className="max-w-2xl text-lg md:text-xl text-slate-200 mb-10 drop-shadow">
            Platform pariwisata ekologis pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#explorer" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-900/50 transition-all border border-emerald-500">
            Mulai Eksplorasi
          </a>
          {/* Tombol kedua dibuat efek kaca (glassmorphism) transparan agar menyatu dengan foto */}
          <a href="#dashboard" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full shadow-sm transition-all cursor-pointer">
            Lihat Dasbor
          </a>
        </motion.div>
      </div>

      {/* Bagian Peta Interaktif */}
      {/* Tambahan: print:hidden agar peta 3D tidak ikut di-print */}
      <div className="relative z-10 bg-slate-50 print:hidden">
        <AerialExplorer />
      </div>

      {/* Bagian Dasbor Sensor */}
      {/* INI SATU-SATUNYA BAGIAN YANG AKAN DITAMPILKAN DI PDF */}
      <div className="relative z-10 bg-slate-50 print:bg-white print:m-0 print:p-0">
        <Dashboard />
      </div>

    </main>
  );
}