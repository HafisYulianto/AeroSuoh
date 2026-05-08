"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const destinations = [
  { id: "lebar", name: "Danau Lebar", img: "/images/danau-lebar-hd.png" },
  { id: "asam", name: "Danau Asam", img: "/images/danau-asam-hd.png" },
  { id: "minyak", name: "Danau Minyak", img: "/images/danau-minyak-hd.png" },
  { id: "nirwana", name: "Kawah Nirwana", img: "/images/kawah-nirwana-hd.png" },
  { id: "keramikan", name: "Kawah Keramikan", img: "/images/kawah-keramikan-hd.png" },
  { id: "pasir", name: "Pasir Kuning", img: "/images/pasir-kuning-hd.png" },
];

export default function VirtualTour() {
  const { t } = useLanguage();
  const [activeDest, setActiveDest] = useState(destinations[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden print:hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #10b981 0%, transparent 50%)',
        backgroundSize: '100% 100%'
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-emerald-900/50 text-emerald-300 text-sm font-bold tracking-widest uppercase rounded-full mb-4 border border-emerald-700/50"
          >
            {t("virtual_badge" as any)}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            {t("virtual_title" as any)}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            {t("virtual_desc" as any)}
          </motion.p>
        </div>

        {/* Location Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveDest(dest)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                activeDest.id === dest.id 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105" 
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <MapPin size={16} />
              {dest.name}
            </button>
          ))}
        </div>

        {/* Panoramic Viewer (Faux 360) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-800"
        >
          {/* Instruction Overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold z-20 flex items-center gap-3 pointer-events-none animate-pulse">
            <MoveHorizontal size={18} />
            {t("virtual_instruction" as any)}
          </div>

          {/* Draggable Container */}
          <div 
            ref={containerRef}
            className={`w-full h-[50vh] md:h-[70vh] overflow-x-auto overflow-y-hidden hide-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* The Panorama Image */}
            <div 
              className="h-full w-[250%] md:w-[150%] transition-opacity duration-500 ease-in-out"
              style={{
                backgroundImage: `url(${activeDest.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            ></div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
