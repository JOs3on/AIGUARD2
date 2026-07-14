import { demoTopRisks } from "@/data/demoDashboard";
import { RiskBadge } from "./RiskBadge";
import { ChevronRight } from "lucide-react";

export function TopRisksPanel() {
  return (
    <section className="mt-5 rounded-xl border border-slate-200 bg-white/96 px-5 py-6 shadow-lg shadow-slate-300/10">
      <div className="flex items-center justify-between gap-5 px-2 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
          Top Risks
        </h2>
      </div>
      <div className="rounded-xl border border-slate-200 px-6">
        {demoTopRisks.map((risk, index) => (
          <button
            type="button"
            key={risk.id}
            className={`grid min-h-[76px] w-full grid-cols-[minmax(0,1fr)_auto_35px] items-center gap-6 text-base font-medium text-slate-800 transition hover:bg-slate-50/60 lg:text-lg ${
              index < demoTopRisks.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <span>{risk.title}</span>
            <RiskBadge level={risk.level} />
            <ChevronRight className="h-3 w-3 justify-self-end text-slate-700" />
          </button>
        ))}
      </div>
    </section>
  );
}
