"use client";

import {
  CheckCircle2,
  Clock3,
  Loader2,
  CircleDashed,
} from "lucide-react";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateReportStatus } from "@/app/actions/reports/update-report-status";
import { cn } from "@/lib/utils";

type Status =
  | "pending"
  | "process"
  | "done";

type Props = {
  id: string;
  currentStatus: Status;
};

const statusConfig = {
  pending: {
    label: "Pending",
    icon: CircleDashed,
    color:
      "bg-yellow-50 text-yellow-700 border-yellow-200",
  },

  process: {
    label: "Diproses",
    icon: Clock3,
    color:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  done: {
    label: "Selesai",
    icon: CheckCircle2,
    color:
      "bg-green-50 text-green-700 border-green-200",
  },
};

export default function StatusUpdater({
  id,
  currentStatus,
}: Props) {
  const [status, setStatus] =
    useState<Status>(currentStatus);

  const [isPending, startTransition] =
    useTransition();

  const handleChange = (
    newStatus: Status
  ) => {
    const previousStatus = status;

    setStatus(newStatus);

    startTransition(async () => {
      const result =
        await updateReportStatus(
          id,
          newStatus
        );

      if (!result.success) {
        setStatus(previousStatus);

        toast.error(result.message);

        return;
      }

      toast.success(
        "Status laporan diperbarui"
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-auto">
      
      {/* CURRENT STATUS */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all",
          statusConfig[status].color
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
          {(() => {
            const Icon =
              statusConfig[status].icon;

            return (
              <Icon className="w-5 h-5" />
            );
          })()}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
            Status Saat Ini
          </p>

          <p className="font-bold text-sm">
            {
              statusConfig[status]
                .label
            }
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-3 gap-2">
        {(
          Object.keys(
            statusConfig
          ) as Status[]
        ).map((item) => {
          const config =
            statusConfig[item];

          const Icon = config.icon;

          const active =
            status === item;

          return (
            <button
              key={item}
              disabled={isPending}
              onClick={() =>
                handleChange(item)
              }
              className={cn(
                "relative overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-200 group",
                active
                  ? config.color +
                      " shadow-md scale-[1.02]"
                  : "bg-white hover:border-primary/20 hover:bg-surface"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                {isPending &&
                active ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}

                <span className="text-xs font-bold">
                  {config.label}
                </span>
              </div>

              {active && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-current opacity-20" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}