"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AerialExplorer from "../components/AerialExplorer"; // Import komponen baru

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/50 to-slate-50 -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
            Menjaga Harta Karun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
              Lampung Barat
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10">
            Platform pariwisata ekologis pintar dan dasbor pemantauan geotermal masa depan untuk kawasan Suoh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#explorer" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/30 transition-all">
            Mulai Eksplorasi
          </a>
          <a href="#dashboard" className="px-8 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold rounded-full shadow-sm transition-all cursor-pointer">
            Lihat Dasbor
          </a>
        </motion.div>
      </div>

      {/* Bagian Peta Interaktif (Baru ditambahkan) */}
      <div className="relative z-10 bg-slate-50">
        <AerialExplorer />
      </div>

      {/* Bagian Dasbor Sensor */}
      <div className="relative z-10 bg-slate-50">
        <Dashboard />
      </div>

    </main>
  );
}