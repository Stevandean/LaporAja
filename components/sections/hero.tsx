"use client";

import { useState } from "react";
import ReportModal from "../modal/ReportModal";

const Hero = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <section id="beranda" className="min-h-[80vh] lg:min-h-screen flex justify-center items-center py-12 lg:py-20 px-8 max-w-6xl mx-auto overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <header className="text-center lg:text-left space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start" data-aos="fade-up" data-aos-duration="1000">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-primary leading-[1.1] tracking-tighter">
                                Satu Laporan,<br className="hidden sm:block" />
                                Beribu<br className="hidden sm:block" />
                                Perubahan
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-500 max-w-md leading-relaxed font-medium">
                                Laporkan kerusakan fasilitas umum di sekitar Anda dengan cepat dan transparan. Bersama kita bangun kota yang lebih baik.
                            </p>
                            <div>
                                <button onClick={() => setOpen(true)} className="open-modal bg-primary text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-bold text-base lg:text-lg hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20">
                                    Mulai Lapor
                                </button>
                            </div>
                        </header>

                        <div className="hidden lg:flex relative h-125 items-center justify-center" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1200">
                            {/* Back Card */}
                            <div className="absolute top-10 right-4 w-[85%] aspect-video bg-white rounded-4xl border border-slate-200 shadow-2xl p-6 z-0 transform rotate-2">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-red-100">Sebelum</span>
                                    <i data-lucide="alert-triangle" className="w-5 h-5 text-red-500"></i>
                                </div>
                                <div className="w-full h-[70%] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                                    <img src="/images/image-before.jpeg" className="w-full h-full object-cover" alt="Foto Sebelum Perbaikan" />
                                </div>
                            </div>

                            {/* Front Card */}
                            <div className="absolute left-0 w-[85%] aspect-video bg-white rounded-4xl border border-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] p-6 z-10 transform -rotate-4 translate-y-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-200">Sesudah</span>
                                    <i data-lucide="check-circle-2" className="w-5 h-5 text-primary"></i>
                                </div>
                                <div className="w-full h-[70%] bg-primary rounded-xl overflow-hidden">
                                    <img src="/images/image-after.jpeg" className="w-full h-full object-cover" alt="Foto Sesudah Perbaikan" />
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <ReportModal isOpen={isOpen} onClose={() => setOpen(false)} />
        
        </>
    )
}

export default Hero
