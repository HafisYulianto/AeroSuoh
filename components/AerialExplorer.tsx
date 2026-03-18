"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Navigation, MousePointer2 } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// --- TOKEN MAPBOX ---
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""; 

// Data titik lokasi dengan koordinat presisi
const locations = [
  {
    id: 1,
    name: "Danau Asam",
    type: "Danau Vulkanik",
    status: "Normal",
    lng: 104.27882688457521, lat: -5.238698319624318,
    desc: "Danau dengan tingkat keasaman tinggi. Mengandung belerang, sering digunakan sebagai indikator aktivitas vulkanik pasif.",
  },
  {
    id: 2,
    name: "Danau Lebar",
    type: "Ekowisata",
    status: "Aman Dikunjungi",
    lng: 104.274690, lat: -5.251999,
    desc: "Kawasan danau air tawar terluas di Suoh. Menjadi pusat aktivitas ekonomi lokal dan penyewaan perahu wisata.",
  },
  {
    id: 3,
    name: "Danau Minyak",
    type: "Danau Vulkanik",
    status: "Normal",
    lng: 104.266782, lat: -5.246098,
    desc: "Permukaan airnya terlihat seperti dilapisi minyak. Memiliki aroma khas dan menjadi salah satu daya tarik unik.",
  },
  {
    id: 4,
    name: "Pasir Kuning",
    type: "Area Geotermal",
    status: "Aman (Patuhi Jalur)",
    lng: 104.26727197333017, lat: -5.236056616428336,
    desc: "Hamparan pasir berwarna kuning akibat endapan sulfur (belerang). Spot foto favorit pengunjung namun perlu kehati-hatian.",
  },
  {
    id: 5,
    name: "Kawah Nirwana",
    type: "Geotermal Aktif",
    status: "Waspada (Zona Merah)",
    lng: 104.25928872886739, lat: -5.237142698064301,
    desc: "Area manifestasi panas bumi aktif dengan letupan lumpur panas. Suhu permukaan sangat tinggi, perlu pemantauan ketat.",
  },
  {
    id: 6,
    name: "Kawah Keramikan",
    type: "Geotermal Aktif",
    status: "Waspada (Zona Kuning)",
    lng: 104.2635823976347, lat: -5.239053909820962,
    desc: "Dataran endapan kawah yang mengeras dan retak menyerupai lantai keramik. Mengeluarkan asap belerang tebal.",
  },
];

export default function AerialExplorer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<typeof locations[0] | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  
  // Ref untuk mengontrol animasi rotasi
  const isRotatingRef = useRef(true);
  // Ref untuk menyimpan fungsi "Mulai Putar Kembali" agar bisa dipanggil oleh tombol X
  const startRotationRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [104.2690, -5.2430], // Titik tengah
      zoom: 13,
      pitch: 65,
      bearing: 0,
      antialias: true,
      interactive: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      let animationId: number;

      // Logika putaran kamera (diperbarui agar lebih smooth saat dilanjutkan)
      const rotateCamera = () => {
        if (!isRotatingRef.current) return; 
        const currentBearing = map.getBearing();
        // Menambah 0.15 derajat setiap frame agar putarannya halus
        map.rotateTo(currentBearing + 0.15, { duration: 0 });
        animationId = requestAnimationFrame(rotateCamera);
      };
      
      rotateCamera();

      // Fungsi mengerem putaran kamera
      const stopRotation = () => {
        isRotatingRef.current = false;
        setIsRotating(false);
        if (animationId) cancelAnimationFrame(animationId);
      };

      // Simpan fungsi ke ref agar tombol X di luar useEffect bisa memanggilnya
      startRotationRef.current = () => {
        if (!isRotatingRef.current) {
          isRotatingRef.current = true;
          setIsRotating(true);
          rotateCamera();
        }
      };

      locations.forEach((loc) => {
        const el = document.createElement("div");
        el.className = "w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(52,211,153,0.8)] cursor-pointer animate-pulse";
        
        new mapboxgl.Marker(el)
          .setLngLat([loc.lng, loc.lat])
          .addTo(map);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelectedLoc(loc);
          
          stopRotation(); // Rem kamera
          
          // Terbang ke lokasi
          map.flyTo({
            center: [loc.lng, loc.lat],
            zoom: 15.5,
            pitch: 70,
            essential: true,
          });
        });
      });

      // Berhenti berputar jika user menggeser map manual
      map.on("dragstart", stopRotation);
      map.on("zoomstart", stopRotation);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // FUNGSI BARU: Logika saat tombol X (Tutup) diklik
  const handleClosePopup = () => {
    setSelectedLoc(null); // 1. Hilangkan panel informasinya

    if (mapRef.current) {
      // 2. Terbang (Zoom Out) kembali ke posisi awal
      mapRef.current.flyTo({
        center: [104.2690, -5.2430], // Koordinat tengah awal
        zoom: 13,
        pitch: 65,
        essential: true,
        speed: 1.2, // Kecepatan kembali
      });

      // 3. Setelah animasi terbang selesai, putar kameranya lagi!
      mapRef.current.once("moveend", () => {
        // Cek kembali untuk memastikan tidak ada konflik
        if (startRotationRef.current && !isRotatingRef.current) {
          startRotationRef.current();
        }
      });
    }
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="explorer">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Live 3D Aerial Explorer</h2>
        <p className="text-slate-600">Pemetaan satelit 3D interaktif kawasan Bandar Negeri Suoh. Tahan klik kanan (Right-Click) untuk memutar.</p>
      </div>

      <div className="relative w-full h-[600px] bg-slate-200 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

        <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-2">
          <p className="bg-slate-900/70 backdrop-blur-md text-emerald-400 font-mono text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border border-emerald-500/30">
            <Navigation size={16} className={isRotating ? "animate-spin" : ""} /> 
            {isRotating ? "AUTOPILOT: ACTIVE" : "MANUAL OVERRIDE"}
          </p>
          {!isRotating && (
             <p className="text-xs text-white bg-red-500/80 px-2 py-1 rounded inline-block w-max shadow-lg shadow-red-500/20">
               Auto-rotate dimatikan. Refresh halaman untuk mereset.
             </p>
          )}
        </div>

        <div className="absolute bottom-4 right-4 pointer-events-none z-10 text-white bg-slate-900/60 px-3 py-2 rounded-lg backdrop-blur text-xs flex items-center gap-2 border border-slate-700">
          <MousePointer2 size={14} /> Drag: Geser | Scroll: Zoom | Klik Kanan: Putar 3D
        </div>

        <AnimatePresence>
          {selectedLoc && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute top-6 right-6 w-80 md:w-96 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-200 z-20"
            >
              {/* TOMBOL X SEKARANG MEMANGGIL handleClosePopup */}
              <button 
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedLoc.name}</h3>
              <p className="text-xs font-mono text-emerald-600 mb-4 bg-emerald-50 inline-block px-2 py-1 rounded border border-emerald-100">
                GPS: {selectedLoc.lat.toFixed(5)}, {selectedLoc.lng.toFixed(5)}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-full font-medium shadow-sm">{selectedLoc.type}</span>
                <span className={`px-2 py-1 text-xs rounded-full font-medium shadow-sm border ${selectedLoc.status.includes('Waspada') ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                  {selectedLoc.status}
                </span>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                  <Info size={16} className="mt-0.5 flex-shrink-0 text-amber-500" />
                  {selectedLoc.desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
