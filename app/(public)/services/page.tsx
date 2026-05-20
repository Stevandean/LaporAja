'use client'

import { motion } from 'motion/react';
import { Megaphone, Camera, MapPin, ClipboardList, Image, Navigation, BarChart3, CheckSquare, Zap } from 'lucide-react';

export default function Services() {
  return (
    <main className="bg-surface pt-32 pb-24 px-6 md:px-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
            Our Services
          </span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-primary leading-[1.1] mb-8">
            Solusi Digital Untuk <br className="hidden md:block" /> Perubahan Nyata.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Menyediakan platform pelaporan fasilitas umum yang cepat, transparan, dan terintegrasi untuk mendukung pembangunan lingkungan yang lebih responsif.
          </p>
        </motion.div>
      </section>

      {/* Core Services Grid */}
      <section className="max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary uppercase tracking-tight">Apa yang Bisa Kamu Lakukan?</h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Buat Laporan",
              desc: "Laporkan kerusakan fasilitas umum dengan mudah hanya dalam beberapa langkah sederhana melalui interface yang intuitif.",
              icon: <Megaphone className="w-6 h-6" />,
            },
            {
              title: "Upload Bukti",
              desc: "Tambahkan foto berkualitas tinggi sebagai bukti otentik untuk mempercepat proses verifikasi oleh tim terkait.",
              icon: <Camera className="w-6 h-6" />,
            },
            {
              title: "Lokasi Akurat",
              desc: "Gunakan sistem geolocation presisi atau pilih langsung di peta interaktif untuk menentukan titik koordinat kejadian.",
              icon: <MapPin className="w-6 h-6" />,
            },
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="panel p-10 hover:border-accent/40 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-surface border border-border rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-primary tracking-tight">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works - Step Pattern */}
      <section className="bg-white border-y border-border py-24 -mx-6 md:-mx-12 px-6 md:px-12 mb-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-20 uppercase tracking-tight">Alur Kerja Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-7 left-12 right-12 h-px bg-border z-0" />
            
            {[
              { label: "Isi Laporan", icon: <ClipboardList className="w-5 h-5" /> },
              { label: "Lampirkan Foto", icon: <Image className="w-5 h-5" /> },
              { label: "Titik Lokasi", icon: <Navigation className="w-5 h-5" /> },
              { label: "Pantau Status", icon: <BarChart3 className="w-5 h-5" /> },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg mb-6 ring-8 ring-white">
                  {step.icon}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Step 0{i + 1}</div>
                <p className="font-semibold text-primary text-lg">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefit Split Layout */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-primary mb-8 tracking-tight">Kenapa Menggunakan AduanKita?</h2>
          
          <div className="space-y-8">
            {[
              { title: "Respon Cepat & Tanggap", desc: "Sistem notifikasi otomatis memastikan tim terkait langsung menerima laporan Anda." },
              { title: "Geotagging Terintegrasi", desc: "Keakurasian lokasi mencapai 99% dengan bantuan GPS Global." },
              { title: "Transparansi Real-time", desc: "Pantau setiap tahapan resolusi laporan Anda langsung dari genggaman." },
              { title: "Optimasi Multi-Device", desc: "Akses platform kapanpun dan dimanapun melalu mobile maupun desktop." }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <CheckSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h5 className="font-bold text-primary leading-tight mb-1">{benefit.title}</h5>
                  <p className="text-gray-400 text-sm font-light">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border"
        >
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
             <Zap className="w-24 h-24 text-primary/20" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-primary/20 to-transparent">
             <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase rounded">Platform Stats</div>
                <div className="text-xs font-mono text-accent font-bold uppercase tracking-widest">Efficiency +45%</div>
             </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
