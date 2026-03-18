"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Thermometer, Wind } from 'lucide-react';

const mockData = [
  { time: '06:00', h2s: 15, temp: 28 },
  { time: '09:00', h2s: 20, temp: 32 },
  { time: '12:00', h2s: 45, temp: 38 },
  { time: '15:00', h2s: 30, temp: 35 },
  { time: '18:00', h2s: 18, temp: 30 },
  { time: '21:00', h2s: 12, temp: 27 },
];

export default function Dashboard() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="dashboard">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Real-Time Eco-Monitor</h2>
        <p className="text-slate-600">Pemantauan simulasi aktivitas geotermal dan kualitas udara kawasan Suoh.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kartu Indikator */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-amber-100 rounded-lg text-amber-600"><Wind size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Gas Belerang (H2S)</p>
                <h3 className="text-2xl font-bold text-slate-900">45 <span className="text-sm font-normal text-slate-500">ppm</span></h3>
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-2 font-medium">Status: Waspada (Simulasi)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600"><Thermometer size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Suhu Danau Lebar</p>
                <h3 className="text-2xl font-bold text-slate-900">38 <span className="text-sm font-normal text-slate-500">°C</span></h3>
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">Status: Normal (Simulasi)</p>
          </div>
        </div>

        {/* Grafik Utama */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="text-emerald-600" size={20} /> Fluktuasi H2S & Suhu
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorH2s" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="h2s" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorH2s)" />
                <Area type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={2} fillOpacity={0.1} fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}