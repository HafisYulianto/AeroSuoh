"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inisialisasi audio saat komponen dimuat (hanya di sisi client)
  useEffect(() => {
    // Memanggil file dari folder public
    audioRef.current = new Audio("/suoh-ambient.mp3"); 
    audioRef.current.loop = true; // Audio diputar berulang-ulang
    audioRef.current.volume = 0.4; // Volume diatur 40% agar elegan, tidak menutupi suara presentasi
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(error => console.log("Audio play blocked:", error));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }} // Muncul belakangan dengan elegan
      className="fixed bottom-6 right-6 z-[100] print:hidden"
    >
      <button
        onClick={toggleAudio}
        className={`relative flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-300 border backdrop-blur-md group ${
          isPlaying 
            ? "bg-emerald-600/90 border-emerald-400 hover:bg-emerald-500/90 text-white" 
            : "bg-slate-900/80 border-slate-700 hover:bg-slate-800 text-slate-300"
        }`}
        title={isPlaying ? "Matikan Suara Alam" : "Nyalakan Suara Alam"}
      >
        {isPlaying ? (
          <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX size={24} className="group-hover:scale-110 transition-transform" />
        )}

        {/* Efek denyut radar (Pulse) yang elegan saat suara menyala */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping border border-emerald-400 opacity-50 duration-1000"></span>
        )}
      </button>
    </motion.div>
  );
}