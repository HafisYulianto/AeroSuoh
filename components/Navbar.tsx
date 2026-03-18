import { Map, Activity, Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-emerald-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bagian Logo */}
          <div className="flex items-center gap-2">
            <Activity className="text-white" size={24} />
            <span className="text-xl font-bold text-white tracking-widest">
              Aero<span className="text-emerald-200">Suoh</span>
            </span>
          </div>
          
          {/* Bagian Menu Navigasi */}
          <div className="flex space-x-8">
            <a href="#home" className="flex items-center gap-2 text-emerald-50 hover:text-white hover:scale-105 transition-all font-medium">
              <Home size={18} /> <span className="hidden sm:block">Beranda</span>
            </a>
            <a href="#explorer" className="flex items-center gap-2 text-emerald-50 hover:text-white hover:scale-105 transition-all font-medium">
              <Map size={18} /> <span className="hidden sm:block">Pemetaan Udara</span>
            </a>
            <a href="#dashboard" className="flex items-center gap-2 text-emerald-50 hover:text-white hover:scale-105 transition-all font-medium">
              <Activity size={18} /> <span className="hidden sm:block">Dasbor Sensor</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}