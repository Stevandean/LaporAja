'use client'

import { motion } from 'motion/react';
import { Target, Eye, Users, Zap, Shield, Globe } from 'lucide-react';

export default function About() {
  return (
    <main className="bg-surface pt-32 pb-24 px-6 md:px-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
            Our Journey
          </span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-primary leading-[1.1] mb-8">
            Mentransformasi <br className="hidden md:block" /> Pelayanan Publik.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            AduanKita hadir sebagai jembatan digital yang menghubungkan aspirasi masyarakat dengan transparansi tata kelola lingkungan untuk masa depan yang lebih baik.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-primary mb-6 tracking-tight">
            Kenapa AduanKita Dibuat?
          </h2>
          <div className="space-y-6 text-gray-500 text-lg font-light leading-relaxed">
            <p>
              Kami melihat kesenjangan komunikasi antara masyarakat dan pengelola infrastruktur umum. Proses pelaporan yang konvensional seringkali memakan waktu dan kurang memberikan kepastian.
            </p>
            <p>
              AduanKita lahir dari visi untuk menciptakan ekosistem dimana setiap suara warga dihargai. Kami menyederhanakan birokrasi menjadi sebuah platform intuitif yang mengedepankan kecepatan dan akuntabilitas.
            </p>
          </div>
          
          <div className="mt-10 flex gap-12">
            <div>
              <div className="text-3xl font-bold text-accent mb-1 tracking-tighter">10k+</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Reports Handled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1 tracking-tighter">98%</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Fast Response</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-3" />
          <div className="absolute inset-0 bg-white border border-border rounded-[40px] -rotate-3 overflow-hidden flex items-center justify-center text-8xl shadow-sm">
            <Globe className="w-32 h-32 text-primary/10 stroke-1" />
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-primary text-white py-24 rounded-[48px] px-8 md:px-16 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          <div className="group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/20 transition-colors">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Visi Kami</h3>
            <p className="text-white/70 text-lg font-light leading-relaxed">
              Menjadi standar emas global dalam aplikasi partisipasi publik yang transparan, aman, dan inklusif demi terciptanya lingkungan hunian yang berkelanjutan.
            </p>
          </div>

          <div className="group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/20 transition-colors">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Misi Kami</h3>
            <ul className="space-y-4 text-white/70 text-lg font-light">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                Demokratisasi akses pelaporan bagi seluruh lapisan masyarakat.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                Menyediakan analitik data real-time untuk pengambilan keputusan yang lebih cepat.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                Menjamin integritas data melalui sistem keamanan berlapis.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary uppercase tracking-tight">Nilai Inti Kami</h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Transparansi Mutlak",
              desc: "Setiap langkah resolusi laporan bersifat publik dan dapat dilacak oleh pelapor.",
              icon: <Shield className="w-6 h-6" />,
            },
            {
              title: "Efisiensi Tinggi",
              desc: "Arsitektur digital kami dirancang untuk meminimalkan waktu respon dan aksi lapangan.",
              icon: <Zap className="w-6 h-6" />,
            },
            {
              title: "Kolaborasi Warga",
              desc: "Kekuatan sejati kami terletak pada partisipasi aktif masyarakat sebagai kontributor.",
              icon: <Users className="w-6 h-6" />,
            },
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="panel p-10 hover:border-accent/40 transition-all duration-500 group text-center"
            >
              <div className="w-14 h-14 bg-surface border border-border rounded-2xl flex items-center justify-center text-accent mb-6 mx-auto group-hover:scale-110 transition-transform shadow-sm">
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
    </main>
  );
}
