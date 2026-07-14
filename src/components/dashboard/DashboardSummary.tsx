import { demoSummary } from "@/data/demoDashboard";
import { RiskDot } from "./RiskBadge";

export function DashboardSummary() {
  return (
    <section
      aria-label="Assessment summary"
      className="rounded-xl border border-slate-200 bg-white/96 p-8 shadow-lg shadow-slate-300/10"
    >
      <div className="grid items-center gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1.55fr]">
        {/* Total assessed */}
        <div className="flex flex-col items-start lg:pr-5">
          <div className="mb-1 -mt-1 text-blue-600 text-[clamp(82px,8vw,116px)] font-bold leading-[0.85] tracking-[-0.08em] drop-shadow-[0_7px_12px_rgba(17,72,255,0.14)]">
            {demoSummary.totalAssessed}
          </div>
          <div className="mt-3 text-base font-semibold tracking-wide">
            AI USE CASES ASSESSED
          </div>
        </div>

        {/* High risk */}
        <div className="flex h-24 flex-col items-center justify-center border-slate-200 border-t px-5 sm:border-t-0 lg:border-l">
          <div className="mb-4 text-[53px] font-semibold leading-[0.7]">
            {demoSummary.high}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
            <RiskDot level="High" />
            HIGH RISK
          </div>
        </div>

        {/* Medium risk */}
        <div className="flex h-24 flex-col items-center justify-center border-slate-200 border-t px-5 sm:border-t-0 lg:border-l">
          <div className="mb-4 text-[53px] font-semibold leading-[0.7]">
            {demoSummary.medium}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
            <RiskDot level="Medium" />
            MEDIUM RISK
          </div>
        </div>

        {/* Low risk */}
        <div className="flex h-24 flex-col items-center justify-center border-slate-200 border-t px-5 sm:border-t-0 lg:border-l">
          <div className="mb-4 text-[53px] font-semibold leading-[0.7]">
            {demoSummary.low}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
            <RiskDot level="Low" />
            LOW RISK
          </div>
        </div>

        {/* Assessment date */}
        <div className="flex flex-col items-start gap-3 border-slate-200 border-t px-5 text-sm leading-relaxed text-slate-500 sm:border-t-0 lg:border-l">
          <span>Last assessment: {demoSummary.lastAssessment}</span>
          <span>Reassess in {demoSummary.reassessInDays} days</span>
        </div>
      </div>
    </section>
  );
}
