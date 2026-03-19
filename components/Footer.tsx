import { Activity, Map, Home, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    // UBAHAN: Background diganti jadi hijau tua pekat dari image_23.png, border disesuaikan
    <footer className="bg-[#013220] text-slate-300 py-12 border-t border-[#064a31] print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Bagian Kiri: Identitas Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo-aerosuoh2.png" alt="Logo AeroSuoh" className="h-8 w-auto object-contain" />
              <span className="text-2xl font-bold text-white tracking-widest">
                {/* UBAHAN: Teks Suoh disesuaikan jadi emerald-400 agar tetap hijau dan terlihat jelas */}
                Aero<span className="text-emerald-400">Suoh</span>
              </span>
            </div>
            {/* Warna teks deskripsi dipertahankan */}
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Platform pariwisata ekologis pintar dan dasbor pemantauan geotermal real-time masa depan untuk kawasan Suoh, Lampung Barat. 
            </p>
          </div>

          {/* Bagian Tengah: Tautan Cepat */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Navigasi Sistem</h4>
            <ul className="space-y-3 text-sm">
              <li>
                {/* UBAHAN: Link hover color diubah untuk contrast */}
                <a href="#home" className="hover:text-emerald-400 transition-colors flex items-center gap-2 w-max">
                  <Home size={16}/> Beranda
                </a>
              </li>
              <li>
                <a href="#explorer" className="hover:text-emerald-400 transition-colors flex items-center gap-2 w-max">
                  <Map size={16}/> Pemetaan Udara 3D
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-2 w-max">
                  <Activity size={16}/> Dasbor Sensor Live
                </a>
              </li>
            </ul>
          </div>

          {/* Bagian Kanan: Kontak & Lokasi */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Pusat Kendali (GCS)</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                {/* Ikon dipertahankan hijaunya */}
                <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Kawasan Geotermal Suoh,<br/>Kabupaten Lampung Barat,<br/>Lampung, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>system@aerosuoh.tech</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bagian Bawah: Copyright */}
        {/* UBAHAN: Garis pembatas disesuaikan */}
        <div className="mt-12 pt-8 border-t border-[#064a31] text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 AeroSuoh Eco-Monitor. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <Activity size={12} className="text-emerald-500"/> 
          </p>
        </div>
      </div>
    </footer>
  );
}