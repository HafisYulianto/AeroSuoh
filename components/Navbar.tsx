import { Map, Activity, Home } from "lucide-react";

export default function Navbar() {
  return (
    // UBAHAN: bg-emerald-950 diganti menjadi bg-[#013220] agar sama dengan Footer
    <nav className="fixed top-0 w-full z-50 bg-[#013220] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo-aerosuoh2.png" 
              alt="Logo AeroSuoh" 
              className="h-33 w-auto object-contain"
            />
          </div>
          
          {/* Menu Navigasi */}
          <div className="flex space-x-8">
            <a href="#home" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
              <Home size={20} /> 
              <span className="hidden sm:block">Beranda</span>
            </a>

            <a href="#explorer" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
              <Map size={20} /> 
              <span className="hidden sm:block">Pemetaan Udara</span>
            </a>

            <a href="#dashboard" className="flex items-center gap-2 text-emerald-100 hover:text-white hover:scale-105 transition-all font-medium">
              <Activity size={20} /> 
              <span className="hidden sm:block">Dasbor Sensor</span>
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}