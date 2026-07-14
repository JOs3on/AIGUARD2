"use client";

import { motion } from "framer-motion";
import { Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DashboardPreview } from "./dashboard/DashboardPreview";

export function DashboardDemo() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <BackgroundAtmosphere />

      {/* Page-level back link */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AIRISKS
        </Link>
      </div>

      {/* Demo banner */}
      <div className="relative z-10 mx-auto mt-4 max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-2 text-sm text-amber-800 backdrop-blur-sm">
          <Eye className="h-4 w-4 shrink-0" />
          <span className="font-semibold">Sandboxed Demo Preview</span>
          <span className="hidden text-amber-600 sm:inline">
            — Interactive mock data only. No data is saved or sent.
          </span>
        </div>
      </div>

      {/* Device frame */}
      <div className="relative z-10 mx-auto mt-6 max-w-[1400px] px-5 pb-12 sm:px-8">
        <DashboardPreview />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-5 text-center text-xs text-slate-400 sm:px-8 lg:px-10">
          AIRISKS — Demo preview. Interactive mock data only. Not legal advice.
        </div>
      </footer>
    </main>
  );
}

function BackgroundAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 30, 0], y: [0, 50, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-16rem] right-[-8rem] h-[42rem] w-[42rem] rounded-full bg-indigo-300/15 blur-[130px]"
      />
    </div>
  );
}
