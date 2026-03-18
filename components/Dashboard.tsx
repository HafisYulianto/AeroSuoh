"use client";

import { useState, useEffect } from "react";
import { Thermometer, Wind, AlertTriangle, Activity, Droplets } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data simulasi grafik fluktuasi harian
const chartData = [
  { time: '00:00', h2s: 15, gempa: 2 },
  { time: '04:00', h2s: 18, gempa: 1 },
  { time: '08:00', h2s: 25, gempa: 4 },
  { time: '12:00', h2s: 45, gempa: 8 }, // Puncak aktivitas siang
  { time: '16:00', h2s: 30, gempa: 5 },
  { time: '20:00', h2s: 20, gempa: 2 },
  { time: '24:00', h2s: 16, gempa: 1 },
];

export default function Dashboard() {
  // State untuk menyimpan data REAL dari API
  const [realTemp, setRealTemp] = useState<number | string>("...");
  const [realWind, setRealWind] = useState<number | string>("...");
  const [lastUpdate, setLastUpdate] = useState<string>("Memuat...");

  // Fungsi untuk menarik data cuaca asli dari satelit
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Mengambil data cuaca berdasarkan koordinat Suoh (Lat: -5.25, Lng: 104.27)
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-5.25&longitude=104.27&current=temperature_2m,wind_speed_10m");
        const data = await res.json();
        
        setRealTemp(data.current.temperature_2m);
        setRealWind(data.current.wind_speed_10m);
        
        // Format waktu update terakhir
        const now = new Date();
        setLastUpdate(`${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} WIB`);
      } catch (error) {
        console.error("Gagal mengambil data satelit", error);
        setRealTemp(28.5); // Fallback jika internet mati
        setRealWind(12);
      }
    };

    fetchRealData();
    // Update data otomatis setiap 5 menit (300000 ms)
    const interval = setInterval(fetchRealData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="dashboard">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Real-Time Eco-Monitor</h2>
        <p className="text-slate-600">Pemantauan data satelit dan sensor geotermal kawasan Kecamatan Suoh, Lampung Barat.</p>
        <p className="text-xs text-emerald-600 mt-2 font-mono bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-100">
          Last API Sync: {lastUpdate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Panel Kartu Sensor */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* KARTU 1: SUHU UDARA (DATA API ASLI) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
              <Thermometer size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Suhu Permukaan (Live)</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800">{realTemp}</h3>
                <span className="text-lg font-bold text-slate-400 mb-1">°C</span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 font-medium bg-emerald-50 inline-block px-2 py-0.5 rounded">Satelit: Open-Meteo</p>
            </div>
          </div>

          {/* KARTU 2: ANGIN (DATA API ASLI) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
            <div className="p-3 bg-sky-50 rounded-xl text-sky-500">
              <Wind size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Kecepatan Angin (Live)</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800">{realWind}</h3>
                <span className="text-sm font-bold text-slate-400 mb-1.5">km/h</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Mempengaruhi sebaran gas kawah.</p>
            </div>
          </div>

          {/* KARTU 3: GAS H2S (SIMULASI SENSOR LOKAL) */}
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm flex items-start gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-bl-full -z-10 opacity-50"></div>
            <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
              <AlertTriangle size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Gas Belerang (H2S)</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800">45</h3>
                <span className="text-sm font-bold text-slate-400 mb-1.5">ppm</span>
              </div>
              <p className="text-xs text-amber-600 mt-1 font-bold">Waspada: Kawah Nirwana</p>
            </div>
          </div>

          {/* KARTU 4: pH AIR (SIMULASI SENSOR LOKAL) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
              <Droplets size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Keasaman Air (pH)</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800">2.1</h3>
                <span className="text-sm font-bold text-slate-400 mb-1.5">pH</span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 font-bold">Danau Asam (Tinggi)</p>
            </div>
          </div>

        </div>

        {/* Kolom Kanan: Grafik Aktivitas Geotermal */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
            <Activity className="text-emerald-500" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Tren Aktivitas Geotermal & Emisi Gas</h3>
          </div>
          
          <div className="flex-grow w-full h-[300px] min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorH2S" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGempa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                />
                <Area type="monotone" name="Gas H2S (ppm)" dataKey="h2s" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorH2S)" />
                <Area type="monotone" name="Getaran Mikro (Skala)" dataKey="gempa" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGempa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Gas Belerang (Kawah Nirwana)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Getaran Gempa Mikro (Seismik)</div>
          </div>
        </div>

      </div>
    </section>
  );
}