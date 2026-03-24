"use client";

import { useState, useEffect } from "react";
import { Thermometer, Wind, AlertTriangle, Activity, Droplets, Printer, CloudSun } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// === TAMBAHAN: Import context bahasa global ===
import { useLanguage } from "../context/LanguageContext";

// Data simulasi grafik fluktuasi harian
const chartData = [
  { time: '00:00', h2s: 15, gempa: 2 },
  { time: '04:00', h2s: 18, gempa: 1 },
  { time: '08:00', h2s: 25, gempa: 4 },
  { time: '12:00', h2s: 45, gempa: 8 }, 
  { time: '16:00', h2s: 30, gempa: 5 },
  { time: '20:00', h2s: 20, gempa: 2 },
  { time: '24:00', h2s: 16, gempa: 1 },
];

export default function Dashboard() {
  const { t, lang } = useLanguage();

  const [realTemp, setRealTemp] = useState<number | string>("...");
  const [realWind, setRealWind] = useState<number | string>("...");
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  
  // State untuk menyimpan waktu real-time
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // === FUNGSI PERTAMA: Tarik data API sensor ASLI dari Open-Meteo ===
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-5.25&longitude=104.27&current=temperature_2m,wind_speed_10m,weathercode&timezone=Asia%2FJakarta");
        const data = await res.json();
        
        setRealTemp(data.current.temperature_2m);
        setRealWind(data.current.wind_speed_10m);
        setWeatherCode(data.current.weathercode); 
      } catch (error) {
        console.error("Gagal mengambil data satelit", error);
        setRealTemp(28.5); 
        setRealWind(12);
        setWeatherCode(999); 
      }
    };

    fetchRealData();
    const intervalData = setInterval(fetchRealData, 300000); // Sinkronisasi tiap 5 menit
    return () => clearInterval(intervalData);
  }, []); 

  // === FUNGSI KEDUA: Jam Real-Time ===
  useEffect(() => {
    setCurrentTime(new Date()); // Set awal
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); // Detak tiap detik untuk presisi menit
    return () => clearInterval(timer);
  }, []);

  // Format Waktu Tanpa Detik
  let syncBadgeText = t("dash_loading");
  let panelDate = "";
  let panelTime = "";

  if (currentTime) {
    const locale = lang === "ID" ? "id-ID" : "en-US";
    
    // Format Tanggal: "Selasa, 24 Maret 2026"
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    const dateStr = new Intl.DateTimeFormat(locale, dateOptions).format(currentTime);
    
    // Format Jam: "20.52" (tanpa detik)
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' };
    let timeStrRaw = new Intl.DateTimeFormat(locale, timeOptions).format(currentTime);
    // Pastikan separator jam dan menit menggunakan titik dua atau titik (menyesuaikan format standar)
    timeStrRaw = timeStrRaw.replace('.', ':'); 
    
    const timeStr = `${timeStrRaw} WIB`;

    syncBadgeText = lang === "ID" ? `${dateStr} pukul ${timeStr}` : `${dateStr} at ${timeStr}`;
    panelDate = dateStr;
    panelTime = timeStr;
  }

  const getWeatherText = () => {
    if (weatherCode === null) return t("dash_loading");
    
    if (lang === "ID") {
      if (weatherCode === 0) return "Cerah Sepenuhnya";
      if (weatherCode >= 1 && weatherCode <= 3) return "Cerah Berawan";
      if (weatherCode >= 45 && weatherCode <= 48) return "Berkabut Tebal";
      if (weatherCode >= 51 && weatherCode <= 67) return "Hujan Ringan/Sedang";
      if (weatherCode >= 71 && weatherCode <= 77) return "Hujan Salju";
      if (weatherCode >= 80 && weatherCode <= 82) return "Hujan Lebat";
      if (weatherCode >= 95 && weatherCode <= 99) return "Badai Petir";
      return "Berawan (Fallback)";
    } else {
      if (weatherCode === 0) return "Clear Sky";
      if (weatherCode >= 1 && weatherCode <= 3) return "Partly Cloudy";
      if (weatherCode >= 45 && weatherCode <= 48) return "Thick Fog";
      if (weatherCode >= 51 && weatherCode <= 67) return "Light/Moderate Rain";
      if (weatherCode >= 71 && weatherCode <= 77) return "Snow (Unlikely)";
      if (weatherCode >= 80 && weatherCode <= 82) return "Heavy Rain";
      if (weatherCode >= 95 && weatherCode <= 99) return "Thunderstorm";
      return "Cloudy (Fallback)";
    }
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto print:py-4 print:px-0 print:max-w-none" id="dashboard">
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: landscape; margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />
      
      <div className="mb-12 flex flex-col items-center justify-center text-center relative print:mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 print:mb-2">{t("dash_title")}</h2>
        <p className="text-slate-600 max-w-2xl print:text-sm">{t("dash_desc")}</p>
        
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 print:mt-3">
          {/* LENCANA ATAS: Waktu tanpa detik */}
          <p className="text-xs text-emerald-600 font-mono bg-emerald-50 inline-block px-3 py-2 rounded-full border border-emerald-100 print:px-2 print:py-1 shadow-inner group">
            <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 group-hover:scale-125 transition-transform"></span>
            {t("dash_sync")} <span className="text-slate-800 font-bold">{syncBadgeText}</span>
          </p>
          
          <button 
            onClick={() => window.print()} 
            className="print:hidden flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 hover:scale-105 transition-all shadow-lg shadow-slate-900/20"
          >
            <Printer size={16} /> {t("dash_pdf")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:grid print:grid-cols-3 print:gap-4 print:w-full">
        
        {/* Kolom Kiri */}
        <div className="lg:col-span-1 space-y-4 print:col-span-1 print:space-y-3">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all print:p-4 print:shadow-none">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500 print:p-2">
              <Thermometer size={28} className="print:w-6 print:h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 print:text-xs">{t("dash_temp_title")}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800 print:text-2xl">{realTemp}</h3>
                <span className="text-lg font-bold text-slate-400 mb-1 print:text-sm">°C</span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 font-medium bg-emerald-50 inline-block px-2 py-0.5 rounded">{t("dash_temp_src")}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all print:p-4 print:shadow-none">
            <div className="p-3 bg-sky-50 rounded-xl text-sky-500 print:p-2">
              <Wind size={28} className="print:w-6 print:h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 print:text-xs">{t("dash_wind_title")}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800 print:text-2xl">{realWind}</h3>
                <span className="text-sm font-bold text-slate-400 mb-1.5 print:text-xs">km/h</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{t("dash_wind_desc")}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm flex items-start gap-4 relative overflow-hidden print:p-4 print:shadow-none print:border-amber-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-bl-full -z-10 opacity-50"></div>
            <div className="p-3 bg-amber-100 rounded-xl text-amber-600 print:p-2">
              <AlertTriangle size={28} className="print:w-6 print:h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 print:text-xs">{t("dash_h2s_title")}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800 print:text-2xl">45</h3>
                <span className="text-sm font-bold text-slate-400 mb-1.5 print:text-xs">ppm</span>
              </div>
              <p className="text-xs text-amber-600 mt-1 font-bold">{t("dash_h2s_desc")}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 print:p-4 print:shadow-none">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500 print:p-2">
              <Droplets size={28} className="print:w-6 print:h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 print:text-xs">{t("dash_ph_title")}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-slate-800 print:text-2xl">2.1</h3>
                <span className="text-sm font-bold text-slate-400 mb-1.5 print:text-xs">pH</span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 font-bold">{t("dash_ph_desc")}</p>
            </div>
          </div>

        </div>

        {/* Kolom Kanan */}
        <div className="lg:col-span-2 flex flex-col gap-4 print:col-span-2 print:gap-3 print:break-inside-avoid">
          
          {/* Panel Grafik */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col grow print:p-6 print:shadow-none print:border-slate-300">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4 print:mb-4 print:pb-2">
              <Activity className="text-emerald-500" size={24} />
              <h3 className="text-xl font-bold text-slate-800 print:text-lg">{t("dash_chart_title")}</h3>
            </div>
            
            <div className="grow w-full h-64 min-h-[250px] print:h-80">
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
                  <Area type="monotone" name="Gempa" dataKey="gempa" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGempa)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs font-medium text-slate-500 print:mt-2">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> {t("dash_legend_h2s")}</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> {t("dash_legend_gempa")}</div>
            </div>
          </div>

          {/* Panel Info Cuaca */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 rounded-2xl shadow-md flex items-center justify-between text-white print:border print:border-slate-300 print:from-white print:to-white print:text-slate-800 print:shadow-none">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full print:bg-emerald-100 print:text-emerald-600">
                <CloudSun size={32} />
              </div>
              <div>
                <p className="text-emerald-100 text-sm font-medium print:text-slate-500">{t("dash_weather_title")}</p>
                <h4 className="text-2xl font-bold tracking-tight">{getWeatherText()}</h4>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-emerald-100 text-xs opacity-80 print:text-slate-500">{t("dash_weather_loc")}</p>
              <p className="text-sm font-semibold font-mono mb-1">Suoh (-5.25°, 104.27°)</p>
              
              {/* PENAMBAHAN WAKTU DI PANEL HIJAU */}
              <div className="flex flex-col items-end">
                <p className="text-xs text-emerald-200 font-medium">{panelDate}</p>
                <p className="text-sm font-bold text-white tracking-wide">{panelTime}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}