"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Camera, MapPin, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// === TAMBAHAN: Import context bahasa global ===
import { useLanguage } from "../context/LanguageContext";

// Data diperbarui dengan menggunakan Kunci Kamus (Key) agar bisa diterjemahkan
const photosData = [
  { 
    id: 1, 
    src: "/images/danau-asam-hd.png", 
    titleKey: "loc1_title", 
    typeKey: "loc1_type",
    descKey: "loc1_desc",
    historyKey: "loc1_hist",
    lng: 104.27882688457521, lat: -5.238698319624318 
  },
  { 
    id: 2, 
    src: "/images/danau-lebar-hd.png", 
    titleKey: "loc2_title", 
    typeKey: "loc2_type",
    descKey: "loc2_desc",
    historyKey: "loc2_hist",
    lng: 104.274690, lat: -5.251999 
  },
  { 
    id: 3, 
    src: "/images/danau-minyak-hd.png", 
    titleKey: "loc3_title", 
    typeKey: "loc3_type",
    descKey: "loc3_desc",
    historyKey: "loc3_hist",
    lng: 104.266782, lat: -5.246098 
  },
  { 
    id: 4, 
    src: "/images/pasir-kuning-hd.png", 
    titleKey: "loc4_title", 
    typeKey: "loc4_type",
    descKey: "loc4_desc",
    historyKey: "loc4_hist",
    lng: 104.26727197333017, lat: -5.236056616428336 
  },
  { 
    id: 5, 
    src: "/images/kawah-nirwana-hd.png", 
    titleKey: "loc5_title", 
    typeKey: "loc5_type",
    descKey: "loc5_desc",
    historyKey: "loc5_hist",
    lng: 104.25928872886739, lat: -5.237142698064301 
  },
  { 
    id: 6, 
    src: "/images/kawah-keramikan-hd.png", 
    titleKey: "loc6_title", 
    typeKey: "loc6_type",
    descKey: "loc6_desc",
    historyKey: "loc6_hist",
    lng: 104.2635823976347, lat: -5.239053909820962 
  },
];

export default function PhotoSlider() {
  // === Panggil kekuatan Global State ===
  const { t } = useLanguage();
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photosData[0] | null>(null);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedPhoto]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#012518] print:hidden" id="gallery"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Judul Bagian */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-900 rounded-lg text-emerald-400 border border-emerald-800">
              <Camera size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">{t("gal_title")}</h2>
              <p className="text-emerald-100/70 mt-1">{t("gal_subtitle")}</p>
            </div>
          </div>
          
          {/* Tombol Navigasi */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-emerald-800 bg-emerald-950 text-emerald-100 hover:text-white hover:bg-emerald-700 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-emerald-800 bg-emerald-950 text-emerald-100 hover:text-white hover:bg-emerald-700 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Area Slider */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {photosData.map((photo) => (
              <div 
                key={photo.id} 
                onClick={() => setSelectedPhoto(photo)}
                className="min-w-[85vw] sm:min-w-[400px] snap-center relative rounded-2xl overflow-hidden shadow-2xl group/card border border-emerald-900 bg-slate-900 cursor-pointer"
              >
                <div className="aspect-[4/3] w-full bg-slate-800">
                  <img 
                    src={photo.src} 
                    alt={t(photo.titleKey as any)} 
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" 
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-emerald-600 text-white rounded-md">
                      {t(photo.typeKey as any)}
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
                    <MapPin size={18} className="text-emerald-400" /> {t(photo.titleKey as any)}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">{t(photo.descKey as any)}</p>
                  
                  <div className="mt-4 text-emerald-400 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <BookOpen size={14} /> {t("gal_click_hint")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === MODAL POP-UP UNTUK SEJARAH === */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)} 
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#012518] border border-emerald-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-emerald-600 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-800">
                <img 
                  src={selectedPhoto.src} 
                  alt={t(selectedPhoto.titleKey as any)} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012518] to-transparent md:hidden"></div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs uppercase tracking-wider font-bold bg-emerald-600 text-white rounded-md">
                    {t(selectedPhoto.typeKey as any)}
                  </span>
                </div>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=$${selectedPhoto.lat},${selectedPhoto.lng}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group/maps flex items-center gap-3 bg-emerald-950 border border-emerald-800 rounded-xl p-3 mb-6 hover:bg-emerald-800 transition-all cursor-pointer shadow-inner"
                >
                  <div className="p-3 bg-emerald-900 rounded-lg text-emerald-400 border border-emerald-800 group-hover/maps:scale-110 transition-transform">
                    <MapPin size={24} className="shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1 leading-tight group-hover/maps:text-white transition-colors">
                      {t(selectedPhoto.titleKey as any)}
                    </h3>
                    <p className="text-emerald-400 text-xs font-semibold group-hover/maps:text-white transition-colors">
                      {t("gal_open_map")}
                    </p>
                  </div>
                </a>
                
                <p className="text-emerald-100/80 text-sm mb-6 pb-6 border-b border-emerald-800/50 leading-relaxed text-justify">
                  {t(selectedPhoto.descKey as any)}
                </p>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-emerald-400" /> {t("gal_history_title")}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed text-justify">
                    {t(selectedPhoto.historyKey as any)}
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}