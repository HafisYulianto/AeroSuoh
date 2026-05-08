"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SafetyAlert() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulasi kemunculan banner setelah beberapa detik untuk efek "real-time"
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-500 text-amber-950 px-4 py-3 shadow-md relative z-[60] print:hidden">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-1.5 bg-amber-600/20 rounded-lg shrink-0 animate-pulse">
            <AlertTriangle size={20} className="text-amber-900" />
          </div>
          <p className="text-sm font-semibold leading-snug">
            {t("alert_warning" as any)}
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-amber-600/20 rounded-md transition-colors shrink-0"
          aria-label="Tutup Peringatan"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
