"use client";

// === TAMBAHAN: Import useRef dan useEffect untuk autoscroll chat ===
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Bot, Ticket, Calendar, Users, Home, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SmartAssistant() {
  const { lang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"chat" | "booking" | null>(null);

  // === STATE UNTUK FORM BOOKING ===
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ date: "", guests: 1, type: "", homestay: "" });

  // === STATE UNTUK AEROBOT (CHATBOT) ===
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: lang === "ID" ? "Halo! Saya AeroBot 🤖. Ada yang bisa saya bantu tentang kunjungan Anda ke Suoh? (Coba ketik: tiket, lokasi, atau keamanan)" : "Hello! I'm AeroBot 🤖. How can I help with your visit to Suoh? (Try typing: ticket, location, or safety)" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // === LOGIKA OTAK AEROBOT ===
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    // 1. Tampilkan pesan user di layar
    const userMsg = chatInput.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    // 2. Simulasi bot sedang "Mikir" selama 1 detik
    setTimeout(() => {
      let botReply = "";
      const inputLower = userMsg.toLowerCase();

      // Deteksi Kata Kunci (Bahasa Indonesia)
      if (lang === "ID") {
        if (inputLower.includes("tiket") || inputLower.includes("harga") || inputLower.includes("bayar")) {
          botReply = "Harga tiket Day Trip Pass adalah Rp 25.000/orang. Untuk paket menginap Eco-Staycation mulai Rp 175.000/malam. Pesan langsung lewat menu 'Pesan Tiket & Homestay' ya! 🎫";
        } else if (inputLower.includes("aman") || inputLower.includes("bahaya") || inputLower.includes("gas") || inputLower.includes("meletus")) {
          botReply = "Kawasan Geotermal Suoh dipantau ketat secara real-time oleh dasbor kami. Selama Anda berada di Zona Hijau dan mematuhi panduan, kunjungan Anda dijamin aman! 🛡️";
        } else if (inputLower.includes("lokasi") || inputLower.includes("dimana") || inputLower.includes("rute")) {
          botReply = "Suoh terletak di Kabupaten Lampung Barat. Anda bisa menggunakan Peta Interaktif di website ini untuk melihat rute panduan langsung. 🗺️";
        } else {
          botReply = "Maaf, AeroBot masih terus belajar. 🙏 Untuk pertanyaan spesifik, silakan gunakan menu pemesanan atau hubungi Admin kami via WhatsApp ya!";
        }
      } 
      // Deteksi Kata Kunci (Bahasa Inggris)
      else {
        if (inputLower.includes("ticket") || inputLower.includes("price") || inputLower.includes("cost")) {
          botReply = "The Day Trip Pass is Rp 25.000/person. Eco-Staycation packages start at Rp 175.000/night. You can book directly using the 'Book Ticket' menu! 🎫";
        } else if (inputLower.includes("safe") || inputLower.includes("danger") || inputLower.includes("gas")) {
          botReply = "The Suoh Geothermal area is strictly monitored in real-time. As long as you stay in the Green Zone, your visit is totally safe! 🛡️";
        } else if (inputLower.includes("location") || inputLower.includes("where") || inputLower.includes("route")) {
          botReply = "Suoh is located in West Lampung. You can use our Interactive Map above to see the route. 🗺️";
        } else {
          botReply = "Sorry, AeroBot is still learning. 🙏 For detailed inquiries, please contact our Admin via WhatsApp!";
        }
      }

      // 3. Tampilkan balasan bot
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 1000); // delay 1 detik
  };

  // === FUNGSI GENERATOR WHATSAPP LINK (Booking) ===
  const handleCheckout = () => {
    const adminPhone = "6282279485813"; // Ganti dengan nomor WhatsApp admin yang asli
    let waMessage = "";
    if (lang === "ID") {
      waMessage = `Halo Admin AeroSuoh, saya ingin konfirmasi pesanan tiket:\n\n*Paket:* ${bookingData.type === "homestay" ? "Eco-Staycation" : "Day Trip Pass"}\n${bookingData.homestay ? `*Homestay:* ${bookingData.homestay}\n` : ""}*Tanggal:* ${bookingData.date || "Belum dipilih"}\n*Jumlah Orang:* ${bookingData.guests} Orang\n\nMohon info selanjutnya untuk pembayaran. Terima kasih.`;
    } else {
      waMessage = `Hello AeroSuoh Admin, I would like to confirm my booking:\n\n*Package:* ${bookingData.type === "homestay" ? "Eco-Staycation" : "Day Trip Pass"}\n${bookingData.homestay ? `*Homestay:* ${bookingData.homestay}\n` : ""}*Date:* ${bookingData.date || "Not selected"}\n*Guests:* ${bookingData.guests} Pax\n\nPlease provide further instructions for payment. Thank you.`;
    }
    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
    setActiveModal(null);
    setBookingStep(1);
  };

  // === MODAL 1: SMART BOOKING ===
  const renderBooking = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 print:hidden">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header Modal Booking */}
        <div className="bg-emerald-900 p-5 flex justify-between items-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <h3 className="font-bold flex items-center gap-2 relative z-10 text-lg">
            <Ticket size={22} className="text-amber-400" /> 
            {lang === "ID" ? "Smart Booking AeroSuoh" : "AeroSuoh Smart Booking"}
          </h3>
          <button onClick={() => {setActiveModal(null); setBookingStep(1);}} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors relative z-10">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Progress Bar (Indikator Langkah) */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 transition-all duration-500" style={{ width: `${(bookingStep - 1) * 33.33}%` }}></div>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${bookingStep >= step ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-white border-slate-300 text-slate-400"}`}>
                {step}
              </div>
            ))}
          </div>

          {/* STEP 1: Tanggal & Jumlah Tamu */}
          {bookingStep === 1 && (
            <div className="space-y-5 animate-in slide-in-from-right-4">
              <h4 className="font-bold text-slate-800 text-lg">{lang === "ID" ? "Kapan Anda berkunjung?" : "When are you visiting?"}</h4>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">{lang === "ID" ? "Tanggal Kunjungan" : "Visit Date"}</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <input type="date" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-700" onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">{lang === "ID" ? "Jumlah Pengunjung" : "Number of Guests"}</label>
                <div className="relative">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <input type="number" min="1" placeholder="1" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-slate-700" onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})} />
                </div>
              </div>
              <button onClick={() => setBookingStep(2)} className="w-full py-3 mt-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg flex justify-center items-center gap-2">
                {lang === "ID" ? "Lanjutkan" : "Next"} <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: Pilih Paket (Mix Tiket & Homestay) */}
          {bookingStep === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <h4 className="font-bold text-slate-800 text-lg mb-4">{lang === "ID" ? "Pilih Pengalaman Anda" : "Choose Your Experience"}</h4>
              
              <div onClick={() => setBookingData({...bookingData, type: "ticket", homestay: ""})} className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${bookingData.type === "ticket" ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-300"}`}>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-bold text-emerald-900 flex items-center gap-2"><Ticket size={18} className="text-emerald-600" /> Day Trip Pass</h5>
                  <span className="text-sm font-bold text-emerald-600">Rp 25.000<span className="text-[10px] font-normal text-slate-500">/org</span></span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{lang === "ID" ? "Akses 1 hari penuh ke Danau Asam dan titik pantau Kawah Geotermal." : "Full 1-day access to Lake Asam and Geothermal viewpoints."}</p>
              </div>

              <div onClick={() => setBookingData({...bookingData, type: "homestay"})} className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${bookingData.type === "homestay" ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-300"}`}>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-bold text-emerald-900 flex items-center gap-2"><Home size={18} className="text-emerald-600" /> Eco-Staycation</h5>
                  <span className="text-sm font-bold text-emerald-600">Rp 175.000<span className="text-[10px] font-normal text-slate-500">/malam</span></span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{lang === "ID" ? "Termasuk Day Trip Pass + Menginap 1 malam di Homestay warga lokal." : "Includes Day Trip Pass + 1 Night local Homestay."}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setBookingStep(1)} className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">{lang === "ID" ? "Kembali" : "Back"}</button>
                <button disabled={!bookingData.type} onClick={() => setBookingStep(bookingData.type === "homestay" ? 3 : 4)} className="w-2/3 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-md">
                  {lang === "ID" ? "Lanjutkan" : "Next"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Katalog Homestay (Muncul Jika Pilih Eco-Staycation) */}
          {bookingStep === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <h4 className="font-bold text-slate-800 text-lg mb-4">{lang === "ID" ? "Katalog Homestay Lokal" : "Local Homestay Catalog"}</h4>
              
              <div onClick={() => setBookingData({...bookingData, homestay: "Homestay Danau Asam"})} className={`p-3 border-2 rounded-xl cursor-pointer flex gap-4 items-center transition-all ${bookingData.homestay === "Homestay Danau Asam" ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-200"}`}>
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0"><Home size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Homestay Danau Asam</h5>
                  <p className="text-xs text-slate-500 mt-1">{lang === "ID" ? "View langsung ke danau, fasilitas air hangat alami." : "Direct lake view, natural hot spring facility."}</p>
                </div>
              </div>

              <div onClick={() => setBookingData({...bookingData, homestay: "Geothermal Cabin"})} className={`p-3 border-2 rounded-xl cursor-pointer flex gap-4 items-center transition-all ${bookingData.homestay === "Geothermal Cabin" ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-200"}`}>
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><Home size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Geothermal Cabin</h5>
                  <p className="text-xs text-slate-500 mt-1">{lang === "ID" ? "Dekat area kawah, nuansa pedesaan yang asri." : "Near crater area, beautiful rustic vibes."}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setBookingStep(2)} className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">{lang === "ID" ? "Kembali" : "Back"}</button>
                <button disabled={!bookingData.homestay} onClick={() => setBookingStep(4)} className="w-2/3 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:bg-slate-300 transition-all shadow-md">
                  {lang === "ID" ? "Lanjutkan" : "Next"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Checkout & Ringkasan */}
          {bookingStep === 4 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 text-center py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-xl text-slate-800">{lang === "ID" ? "Pesanan Hampir Selesai!" : "Booking Almost Ready!"}</h4>
              <p className="text-sm text-slate-500 px-4">
                {lang === "ID" ? "Tinjau pesanan Anda. Kami akan meneruskan data ini ke WhatsApp Pengelola Lokal." : "Review your booking. We will forward this data to the Local Admin's WhatsApp."}
              </p>
              
              {/* Box Ringkasan */}
              <div className="bg-slate-50 p-5 rounded-xl text-left my-6 border border-slate-200 shadow-inner">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">{lang === "ID" ? "Ringkasan Pesanan" : "Order Summary"}</p>
                
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-slate-600">{lang === "ID" ? "Paket" : "Package"}</span>
                  <span className="text-sm font-bold text-slate-800 text-right">{bookingData.type === "homestay" ? "Eco-Staycation" : "Day Trip Pass"}</span>
                </div>
                
                {bookingData.homestay && (
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-slate-600">Homestay</span>
                    <span className="text-sm font-bold text-emerald-700 text-right">{bookingData.homestay}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-slate-600">{lang === "ID" ? "Tanggal" : "Date"}</span>
                  <span className="text-sm font-bold text-slate-800 text-right">{bookingData.date || "-"}</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <span className="text-sm text-slate-600">{lang === "ID" ? "Pengunjung" : "Guests"}</span>
                  <span className="text-sm font-bold text-slate-800 text-right">{bookingData.guests} {lang === "ID" ? "Orang" : "Pax"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={handleCheckout} className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2">
                  <Ticket size={18} /> {lang === "ID" ? "Konfirmasi Pesanan" : "Confirm Booking"}
                </button>
                <button onClick={() => setBookingStep(bookingData.type === "homestay" ? 3 : 2)} className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  {lang === "ID" ? "Edit Pesanan" : "Edit Booking"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );

  // === MODAL 2: AEROBOT (DIREVISI TOTAL) ===
  const renderChatbot = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 print:hidden">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col h-[500px]">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-full"><Bot size={24} /></div>
            <div>
              <h3 className="font-bold">AeroBot</h3>
              <p className="text-xs text-emerald-200">{lang === "ID" ? "Asisten Virtual Suoh" : "Suoh Virtual Assistant"}</p>
            </div>
          </div>
          <button onClick={() => setActiveModal(null)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"><X size={20} /></button>
        </div>
        
        {/* Chat Body (Tempat Balasan Muncul) */}
        <div className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-3 scroll-smooth">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm animate-in fade-in slide-in-from-bottom-2 ${
                msg.sender === "bot" 
                  ? "bg-white border border-slate-200 text-slate-700 rounded-tl-none self-start" 
                  : "bg-emerald-600 text-white rounded-tr-none self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {/* Elemen kosong untuk target auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Field */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={lang === "ID" ? "Ketik pesan..." : "Type a message..."}
            className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-slate-700"
          />
          <button 
            type="submit" 
            disabled={!chatInput.trim()} 
            className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500 transition-colors shadow-md"
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );

  return (
    <>
      {activeModal === "booking" && renderBooking()}
      {activeModal === "chat" && renderChatbot()}

      {/* === FLOATING ACTION BUTTON (FAB) KANAN BAWAH === */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
        
        {/* Dropdown Menu (Hanya 2 Menu Sekarang) */}
        {isMenuOpen && (
          <div className="flex flex-col gap-3 mb-2 animate-in fade-in slide-in-from-bottom-4 items-end">
            <button onClick={() => {setActiveModal("booking"); setIsMenuOpen(false);}} className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-100 hover:scale-105 transition-transform group">
              <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">{lang === "ID" ? "Pesan Tiket & Homestay" : "Book Ticket & Homestay"}</span>
              <div className="bg-amber-100 p-2.5 rounded-full text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors"><Ticket size={20} /></div>
            </button>

            <button onClick={() => {setActiveModal("chat"); setIsMenuOpen(false);}} className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-100 hover:scale-105 transition-transform group">
              <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">{lang === "ID" ? "Tanya AeroBot" : "Ask AeroBot"}</span>
              <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Bot size={20} /></div>
            </button>
          </div>
        )}

        {/* Tombol Utama Melayang */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center text-white ${isMenuOpen ? "bg-slate-800 rotate-90 scale-90" : "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:scale-110 hover:shadow-emerald-500/50 animate-pulse"}`}
        >
          {isMenuOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </>
  );
}