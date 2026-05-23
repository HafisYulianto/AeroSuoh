"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoPhilosophy() {
  return (
    <section id="logo-philosophy" className="py-16 bg-[#013220] border-b border-emerald-950 print:hidden relative overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Container dengan Rasio 16:9 (Landscape) setara 1920x1080 pada layar lebar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1920px] aspect-video bg-white rounded-3xl shadow-xl border border-slate-200 mx-auto overflow-hidden relative group cursor-pointer"
        >
          {/* Menampilkan foto filosofi logo dengan hover zoom effect */}
          <Image
            src="/images/filosofi-logo.png"
            alt="Filosofi Logo AeroSuoh"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.div>
      </div>
    </section>
  );
}
