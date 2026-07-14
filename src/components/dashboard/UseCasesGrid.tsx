import { demoUseCaseCards } from "@/data/demoDashboard";
import { RiskBadge } from "./RiskBadge";
import { ChevronRight } from "lucide-react";

export function UseCasesGrid() {
  return (
    <section className="mt-5 rounded-xl border border-slate-200 bg-white/96 px-5 py-7 shadow-lg shadow-slate-300/10">
      <div className="flex items-center justify-between gap-5 px-2 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
          AI Use Cases
        </h2>
        <button type="button" className="inline-flex items-center gap-4 text-sm text-slate-600 transition hover:text-blue-600">
          View all use cases
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoUseCaseCards.map((card) => (
          <article
            key={card.id}
            className="min-h-[184px] rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
          >
            <h3 className="mb-2 text-lg font-semibold leading-tight tracking-tight text-slate-900">
              {card.title}
            </h3>
            <p className="mb-3 text-sm font-medium text-slate-500">{card.department}</p>
            <p className="mb-4 text-sm leading-relaxed text-slate-400 line-clamp-2">
              {card.description}
            </p>
            <div className="mb-5 h-px bg-slate-200" />
            <RiskBadge level={card.level} />
          </article>
        ))}
      </div>
    </section>
  );
}
