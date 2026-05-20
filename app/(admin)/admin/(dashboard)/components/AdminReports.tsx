'use client';

import React, {
  useEffect,
  useMemo,
  useState,
  useOptimistic,
  useTransition,
} from 'react';

import { motion } from 'motion/react';
import { deleteReport } from '@/app/actions/reports/reports';

import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  Trash2,
} from 'lucide-react';

import {
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation';

import {
  Report,
  ReportStatus,
} from '@/app/types/report';

import StatusBadge from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AdminReportsProps {
  reports?: Report[];
}

export default function AdminReports({
  reports = [],
}: AdminReportsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ================= URL PARAMS =================
  const statusParam =
    (searchParams.get('status') as ReportStatus | 'all') || 'all';

  const searchParam = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(searchParam);
  const [filterStatus, setFilterStatus] =
    useState<ReportStatus | 'all'>(statusParam);

  useEffect(() => {
    setSearchInput(searchParam);
    setFilterStatus(statusParam);
  }, [searchParam, statusParam]);

  // ================= URL SYNC =================
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (filterStatus !== 'all') {
        params.set('status', filterStatus);
      } else {
        params.delete('status');
      }

      if (searchInput.trim()) {
        params.set('search', searchInput);
      } else {
        params.delete('search');
      }

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput, filterStatus, pathname, router, searchParams]);

  // ================= SOURCE OF TRUTH =================
  const [reportsState, setReportsState] = useState(
    reports.filter((r) => !r.deleted_at)
  );

  // ================= OPTIMISTIC =================
  const [optimisticReports, removeOptimistic] = useOptimistic(
    reportsState,
    (state, id: string) =>
      state.filter((r) => r.id !== id)
  );

  const [isPending, startTransition] = useTransition();

  // ================= FILTER =================
  const filtered = useMemo(() => {
    return optimisticReports.filter((report) => {
      const matchStatus =
        filterStatus === 'all' || report.status === filterStatus;

      const keyword = searchInput.toLowerCase();

      const matchSearch =
        report.title.toLowerCase().includes(keyword) ||
        report.location.toLowerCase().includes(keyword);

      return matchStatus && matchSearch;
    });
  }, [optimisticReports, filterStatus, searchInput]);

  // ================= SOFT DELETE =================
  const handleDelete = (id: string) => {
    startTransition(async () => {
        // optimistic UI
        removeOptimistic(id);

        // update local state
        setReportsState((prev) =>
        prev.filter((r) => r.id !== id)
        );

        try {
        await deleteReport(id);
        toast.success('Report deleted successfully');
        } catch (err) {
        toast.error('Failed to delete report');

        // rollback kalau gagal
        setReportsState(reports);
        }
    });
  };

  useEffect(() => {
    setReportsState(reports.filter((r) => !r.deleted_at));
  }, [reports]);
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Manajemen Laporan
          </h1>

          <p className="text-gray-500 font-light mt-1">
            Kelola dan pantau semua aduan yang masuk.
          </p>
        </div>
      </div>

      {/* CONTROL BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-border">

        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent transition-colors" />

          <input
            type="text"
            placeholder="Cari Judul atau Lokasi..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-surface border border-border pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {(['all', 'pending', 'process', 'done'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                'px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-2',
                filterStatus === status
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-white text-gray-400 border-border hover:border-gray-300'
              )}
            >
              {status === 'all' ? 'Semua' : status}
            </button>
          ))}
        </div>

      </div>

      {/* TABLE */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  ID & Tanggal
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Detail Laporan
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Status
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">

              {filtered.length > 0 ? (
                filtered.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-surface/30 transition-colors group"
                  >

                    {/* ID */}
                    <td className="px-6 py-6">
                      <div className="font-mono text-[10px] font-bold text-accent mb-1 uppercase tracking-widest">
                        #{report.id.substring(0, 8)}
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase">
                        <Calendar className="w-3 h-3" />
                        {new Date(report.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </div>
                    </td>

                    {/* DETAIL */}
                    <td className="px-6 py-6">
                      <div
                        className="font-bold text-primary hover:text-accent cursor-pointer transition-colors"
                        onClick={() =>
                          router.push(`/admin/reports/${report.id}`)
                        }
                      >
                        {report.title}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 font-light">
                        <MapPin className="w-3 h-3" />
                        {report.location}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-6">
                      <StatusBadge status={report.status as ReportStatus} />
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">

                        <button
                          onClick={() =>
                            router.push(`/admin/reports/${report.id}`)
                          }
                          className="btn-secondary px-3 py-1.5 text-[10px] uppercase tracking-widest flex items-center gap-2"
                        >
                          Detail
                          <ChevronRight className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => handleDelete(report.id)}
                          disabled={isPending}
                          className="px-3 py-1.5 text-[10px] uppercase tracking-widest flex items-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>

                      </div>
                    </td>

                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <p className="text-gray-400 text-sm font-medium">
                      Tidak ada laporan ditemukan
                    </p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}