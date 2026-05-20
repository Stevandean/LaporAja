"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Report = {
  id: string;
  title: string;
  slug: string;
  location: string;
  created_at: string;
};

export default function LatestReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();
        setReports(data.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-accent font-bold text-xs uppercase tracking-[0.2em]">
            Laporan Terbaru
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-3">
            Aduan Masyarakat Terkini
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-4">
            Lihat laporan terbaru dari masyarakat dan bagaimana perubahan dimulai dari satu aksi kecil.
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <Skeleton />
        ) : reports.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/reports/${report.id}`}
                className="group"
              >
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

                  {/* Badge */}
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    Laporan
                  </span>

                  {/* Title */}
                  <h3 className="mt-4 font-bold text-lg text-slate-900 group-hover:text-accent transition">
                    {report.title}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-slate-500 mt-2">
                    📍 {report.location}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-slate-400 mt-4">
                    {new Date(report.created_at).toLocaleDateString("id-ID")}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-accent font-bold text-sm">
                      Lihat Detail
                    </span>

                    <span className="transform group-hover:translate-x-1 transition">
                      →
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-slate-100 animate-pulse h-45"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <h3 className="font-bold text-xl text-slate-700">
        Belum ada laporan
      </h3>
      <p className="text-slate-500 mt-2">
        Jadilah yang pertama membuat laporan 🚀
      </p>
    </div>
  );
}