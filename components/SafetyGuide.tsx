"use client";

import { ShieldAlert, Footprints, Wind, Users } from "lucide-react";

const rules = [
  { 
    id: 1, 
    icon: <Wind size={28} className="text-amber-500" />, 
    title: "Wajib Masker Gas", 
    desc: "Beberapa area kawah menghasilkan gas sulfur pekat. Gunakan masker respirator khusus untuk pernapasan." 
  },
  { 
    id: 2, 
    icon: <Footprints size={28} className="text-amber-500" />, 
    title: "Sepatu Trekking Tertutup", 
    desc: "Suhu permukaan tanah (seperti di Keramikan) bisa sangat panas. Dilarang keras memakai sandal." 
  },
  { 
    id: 3, 
    icon: <Users size={28} className="text-amber-500" />, 
    title: "Didampingi Pemandu", 
    desc: "Jalur ekologis dan geotermal rawan ambles jika tidak hafal medan. Selalu patuhi arahan pemandu lokal." 
  },
  { 
    id: 4, 
    icon: <ShieldAlert size={28} className="text-amber-500" />, 
    title: "Patuhi Zona Aman", 
    desc: "Jangan pernah melewati batas rambu peringatan zona merah atau mendekati pusat letupan lumpur." 
  },
];

export default function SafetyGuide() {
  return (
    <section className="py-16 bg-white border-b border-slate-200 print:hidden" id="safety">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-bold tracking-wide uppercase mb-4 border border-amber-200">
            <ShieldAlert size={16} /> Perhatian Pengunjung
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Panduan Keselamatan Jelajah
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Kawasan Suoh adalah alam liar yang memukau sekaligus menyimpan potensi bahaya panas bumi. Demi keselamatan dan kenyamanan bersama, mohon patuhi protokol berikut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule) => (
            <div 
              key={rule.id} 
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {rule.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{rule.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}