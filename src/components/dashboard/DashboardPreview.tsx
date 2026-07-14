"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import {
  type DemoSection,
  demoNavLinks,
} from "@/data/demoDashboard";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardSummary } from "./DashboardSummary";
import { TopRisksPanel } from "./TopRisksPanel";
import { UseCasesGrid } from "./UseCasesGrid";

interface DashboardPreviewProps {
  className?: string;
}

export function DashboardPreview({ className = "" }: DashboardPreviewProps) {
  const [active, setActive] = useState<DemoSection>("overview");

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-300/60 shadow-2xl shadow-slate-400/20 ${className}`}
    >
      {/* Frame top bar (window dots) */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-slate-400">
          AIRISKS Dashboard — Demo
        </span>
      </div>

      {/* Dashboard body */}
      <div className="flex min-h-[600px] flex-col bg-gradient-to-br from-[#000f2d] via-[#001437] to-[#001335] lg:flex-row">
        <DashboardSidebar active={active} onSelect={setActive} />

        <div className="min-w-0 flex-1 bg-[#f7fbff] p-6 lg:p-9">
          {/* Account bar */}
          <div className="mb-5 flex h-11 items-center justify-end">
            <button className="inline-flex items-center gap-4 border-0 bg-transparent text-sm font-semibold text-slate-800">
              Acme Corporation
              <span className="h-2.5 w-2.5 rotate-45 border-r-2 border-b-2 border-current -translate-y-0.5" />
            </button>
          </div>

          <div className="mx-auto w-full max-w-[1180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {active === "overview" && <OverviewSection />}
                {active === "assessment" && <AssessmentSection />}
                {active === "use-cases" && <UseCasesSection />}
                {(active === "templates" ||
                  active === "reports" ||
                  active === "settings") && (
                  <PlaceholderSection section={active} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div id="overview">
      <DashboardSummary />
      <TopRisksPanel />
      <UseCasesGrid />
    </div>
  );
}

function AssessmentSection() {
  return (
    <div id="assessment">
      <TopRisksPanel />
      <section className="mt-5 rounded-xl border border-slate-200 bg-white/96 p-6 shadow-lg shadow-slate-300/10">
        <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
          Assessment Schedule
        </h2>
        <div className="grid gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Last assessment", value: "Apr 24, 2026" },
            { label: "Next reassessment", value: "In 90 days" },
            { label: "Status", value: "On track" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </div>
              <div className="mt-2 text-lg font-semibold text-slate-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function UseCasesSection() {
  return (
    <div id="use-cases">
      <UseCasesGrid />
    </div>
  );
}

function PlaceholderSection({ section }: { section: DemoSection }) {
  const label = demoNavLinks.find((l) => l.id === section)?.label ?? section;

  return (
    <div className="grid min-h-[400px] place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-700">
          {label}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          This section is part of the full AIRISKS product and will be available
          in a later release. Explore Overview, Assessment, and AI Use Cases in
          this demo.
        </p>
      </div>
    </div>
  );
}
