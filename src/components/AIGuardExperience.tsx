"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, Info, Lock, Search, Sparkles, Zap } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { UseCase } from "@/data/usecases";
import { getBestUseCase, searchUseCases } from "@/lib/search";
import { RiskPyramidModal } from "./RiskPyramidModal";
import { Navigation } from "./Navigation";
import { DashboardPreview } from "./dashboard/DashboardPreview";

type SearchState = "idle" | "typing" | "searching" | "result";

const riskBadgeStyle: Record<UseCase["riskLevel"], string> = {
  Minimal: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Limited: "bg-amber-100 text-amber-700 border-amber-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Prohibited: "bg-rose-100 text-rose-700 border-rose-200",
};

const riskCardStyle: Record<UseCase["riskLevel"], { bg: string; border: string; text: string; dot: string; label: string }> = {
  Minimal: {
    bg: "bg-emerald-50/70",
    border: "border-emerald-100",
    text: "text-emerald-950",
    dot: "bg-emerald-500",
    label: "Potential Minimal Risk",
  },
  Limited: {
    bg: "bg-sky-50/60",
    border: "border-sky-100",
    text: "text-sky-950",
    dot: "bg-sky-500",
    label: "Potential Limited Risk",
  },
  High: {
    bg: "bg-orange-50/60",
    border: "border-orange-100",
    text: "text-orange-950",
    dot: "bg-orange-500",
    label: "Potential High Risk",
  },
  Prohibited: {
    bg: "bg-rose-50/70",
    border: "border-rose-100",
    text: "text-rose-950",
    dot: "bg-rose-500",
    label: "Potential Prohibited Risk",
  },
};

const theme = {
  page: "bg-[#f7fbff] text-slate-950",
  nav: "border-slate-200 bg-white/75",
  muted: "text-slate-600",
  softMuted: "text-slate-500",
  panel: "border-slate-200 bg-white/90 shadow-lg shadow-slate-200/45",
  panelStrong: "border-slate-200 bg-white/95 shadow-xl shadow-slate-200/50",
  darkPanel: "border-slate-200 bg-slate-50/50",
  title: "text-slate-950",
  chip: "border-slate-200 bg-white/90 text-blue-700 shadow-lg shadow-slate-200/40",
  searchOuter: "border-slate-200 bg-white/75 shadow-2xl shadow-blue-100/40",
  searchInner: "bg-white",
  input: "text-slate-950 placeholder:text-slate-400",
  primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
  secondaryButton: "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950",
  cardText: "text-slate-700",
  icon: "text-blue-600",
};

export function AIGuardExperience() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>("idle");
  const [selected, setSelected] = useState<UseCase | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRiskPyramid, setShowRiskPyramid] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const suggestions = useMemo(() => searchUseCases(query), [query]);
  const score = useMotionValue(0);
  const smoothScore = useSpring(score, { stiffness: 90, damping: 20 });
  const roundedScore = useTransform(smoothScore, (latest) => Math.round(latest));

  function updateQuery(value: string) {
    setQuery(value);
    setHighlightedIndex(0);
    if (state !== "searching" && state !== "result") {
      setState(value.trim() ? "typing" : "idle");
    }
  }

  function runSearch(suggestion?: UseCase) {
    const result = suggestion ?? getBestUseCase(query);
    setSelected(result);
    setState("searching");
    score.set(0);

    window.setTimeout(() => {
      setState("result");
      score.set(result.riskScore);
    }, 1450);
  }

  function resetSearch() {
    setState(query.trim() ? "typing" : "idle");
    setSelected(null);
    score.set(0);
  }

  const activeResult = selected ?? suggestions[0];

  return (
    <main className={`relative min-h-screen overflow-hidden ${theme.page}`}>
      <BackgroundAtmosphere />
      <Navigation variant="light" />

      {/* ── Hero ── (fills viewport above the fold, dashboard sits just below) */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pb-16 pt-28 sm:px-8 lg:px-10 lg:min-h-[calc(100vh-7rem)]">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className={`mx-auto flex w-full max-w-5xl flex-col items-center`}
        >
          <AnimatePresence mode="popLayout">
            {state !== "result" && (
              <motion.div
                key="hero-copy"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="mb-10 text-center"
              >
                <div className={`mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl ${theme.chip}`}>
                  <Sparkles className={`h-4 w-4 ${theme.icon}`} />
                  Free preliminary EU AI Act clarity check
                </div>
                <h1 className={`mx-auto max-w-4xl text-balance text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-8xl ${theme.title}`}>
                  Understand your AI Act risk in seconds.
                </h1>
                <p className={`mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 sm:text-xl ${theme.muted}`}>
                  Describe your AI use case and get a clear first read on risk level, obligations, and hidden compliance blind spots.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            layout
            onSubmit={(event) => {
              event.preventDefault();
              runSearch();
            }}
            className={`relative w-full ${state === "result" ? "mt-2 max-w-3xl" : "max-w-4xl"}`}
          >
            <motion.div
              animate={{
                boxShadow:
                  state === "typing"
                    ? "0 0 70px rgba(56, 189, 248, 0.15), inset 0 0 0 1px rgba(15, 23, 42, 0.08)"
                    : "0 0 45px rgba(79, 140, 255, 0.06), inset 0 0 0 1px rgba(15, 23, 42, 0.06)",
              }}
              className={`group relative overflow-hidden rounded-[2rem] border p-2 backdrop-blur-2xl ${theme.searchOuter}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-indigo-400/5 opacity-70" />
              <div className={`relative flex items-center gap-3 rounded-[1.45rem] px-4 py-3 sm:px-6 sm:py-5 ${theme.searchInner}`}>
                <Search className={`h-6 w-6 shrink-0 ${theme.icon}`} />
                <input
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (state !== "typing" || suggestions.length === 0) return;
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                    } else if (event.key === "Enter") {
                      event.preventDefault();
                      runSearch(suggestions[highlightedIndex]);
                    }
                  }}
                  placeholder="Describe your AI system, e.g. AI tool for screening job applicants"
                  className={`h-12 flex-1 bg-transparent text-base outline-none sm:text-lg ${theme.input}`}
                />
                <button
                  type="submit"
                  className={`hidden items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition sm:flex ${theme.primaryButton}`}
                >
                  Check risk
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.form>

          <AnimatePresence mode="wait">
            {state === "idle" && <IdleCards key="idle" suggestions={suggestions} />}
            {state === "typing" && (
              <TypingSuggestions
                key="typing"
                suggestions={suggestions}
                highlightedIndex={highlightedIndex}
                setHighlightedIndex={setHighlightedIndex}
                runSearch={runSearch}
              />
            )}
            {state === "searching" && <SearchProgress key="searching" result={activeResult} />}
            {state === "result" && activeResult && (
              <ResultView
                key="result"
                result={activeResult}
                roundedScore={roundedScore}
                resetSearch={resetSearch}
                openModal={() => setShowModal(true)}
                openRiskPyramid={() => setShowRiskPyramid(true)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Sandboxed Dashboard Demo ── (preview, embed below the cards) */}
      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-24 pt-2 sm:px-8">
        {/* Heading animates in — preview itself stays untransformed so the
            sidebar's mobile overlay uses position:fixed against the viewport. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 w-full max-w-3xl text-center"
        >
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-sm font-semibold text-blue-700 backdrop-blur-sm">
            <Eye className="h-4 w-4" />
            Live Preview
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
            See the AIRISKS dashboard in action.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Click through the interactive demo. All data is mocked — explore
            the overview, assessment schedule, and your AI use case portfolio
            to get a feel for the full product.
          </p>
        </motion.div>

        <DashboardPreview />
      </section>

      <AnimatePresence>{showModal && <AccessModal close={() => setShowModal(false)} />}</AnimatePresence>
      <AnimatePresence>{showRiskPyramid && <RiskPyramidModal close={() => setShowRiskPyramid(false)} />}</AnimatePresence>
    </main>
  );
}

function BackgroundAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-cyan-300/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 30, 0], y: [0, 50, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-16rem] right-[-8rem] h-[42rem] w-[42rem] rounded-full bg-indigo-300/15 blur-[130px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
    </div>
  );
}

function IdleCards({ suggestions }: { suggestions: UseCase[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative mt-12 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {suggestions.map((item, index) => (
        <motion.div
          key={item.id}
          animate={{ y: [0, index % 2 ? 12 : -12, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-3xl border border-slate-200 bg-white/95 p-5 opacity-90 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/30 hover:-translate-y-1"
        >
          <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100/50">Example use case</div>
          <h3 className={`text-base font-semibold ${theme.title}`}>{item.title}</h3>
          <p className={`mt-2 text-sm leading-6 ${theme.cardText}`}>{item.description}</p>
          <div className="mt-5 h-2 w-3/4 rounded-full bg-slate-200/60" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-100/60" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function TypingSuggestions({ suggestions, highlightedIndex, setHighlightedIndex, runSearch }: { suggestions: UseCase[]; highlightedIndex: number; setHighlightedIndex: (index: number) => void; runSearch: (suggestion?: UseCase) => void }) {
  if (suggestions.length === 0) return null;

  const selected = suggestions[highlightedIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="mt-3 w-full max-w-4xl"
      role="listbox"
    >
      {/* Dropdown list */}
      <div className={`overflow-hidden rounded-3xl border backdrop-blur-2xl ${theme.panelStrong}`}>
        <div className={`flex items-center gap-2 border-b px-5 py-3 text-xs font-medium uppercase tracking-wider ${theme.muted}`}>
          <Zap className={`h-3.5 w-3.5 ${theme.icon}`} />
          Matching your use case to AI Act risk patterns
        </div>
        <div className="divide-y divide-slate-100">
          {suggestions.map((item, index) => (
            <motion.button
              type="button"
              onClick={() => runSearch(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.04 }}
              className={`flex w-full items-center gap-4 px-5 py-4 text-left transition ${
                index === highlightedIndex
                  ? "bg-blue-50/60"
                  : "bg-white/60 hover:bg-slate-50/60"
              }`}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              <Search className={`h-4 w-4 shrink-0 ${theme.softMuted}`} />
              <span className={`flex-1 text-sm font-medium ${theme.title}`}>{item.title}</span>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${riskBadgeStyle[item.riskLevel]}`}>
                {item.riskLevel} risk
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail preview card */}
      {selected && (
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`mt-4 overflow-hidden rounded-3xl border p-6 backdrop-blur-2xl ${theme.panelStrong}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`text-lg font-semibold ${theme.title}`}>{selected.title}</h3>
              <p className={`mt-1.5 max-w-xl text-sm leading-relaxed ${theme.cardText}`}>{selected.description}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${riskBadgeStyle[selected.riskLevel]}`}>
              {selected.riskLevel} risk
            </span>
          </div>
          <button
            type="button"
            onClick={() => runSearch(selected)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View result
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

function SearchProgress({ result }: { result: UseCase }) {
  const steps = ["Mapping use case", "Checking risk indicators", "Preparing clarity result"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`mt-8 w-full max-w-3xl rounded-[2rem] border p-6 backdrop-blur-2xl ${theme.panel}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className={`h-3 w-3 animate-pulse rounded-full ${theme.icon.replace('text', 'bg')}`} />
        <p className={`text-sm font-medium ${theme.title}`}>Analyzing: {result.title}</p>
      </div>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.32 }}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            <CheckCircle2 className={`h-4 w-4 ${theme.icon}`} />
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ResultView({
  result,
  roundedScore,
  resetSearch,
  openModal,
  openRiskPyramid,
}: {
  result: UseCase;
  roundedScore: ReturnType<typeof useTransform<number, number>>;
  resetSearch: () => void;
  openModal: () => void;
  openRiskPyramid: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-8 w-full max-w-6xl"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className={theme.softMuted}>Preliminary clarity result. Not legal advice.</span>
        <button onClick={resetSearch} className={`rounded-full border px-4 py-2 transition ${theme.secondaryButton}`}>
          New search
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className={`rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-8 ${theme.panel}`}>
          {/* Use Case Header */}
          <h2 className={`text-3xl font-bold tracking-tight sm:text-5xl ${theme.title}`}>{result.title}</h2>
          <p className={`mt-2.5 max-w-2xl text-base ${theme.softMuted}`}>{result.description}</p>

          {/* Redesigned Premium Risk Card with "How risk levels work" button */}
          <div className={`mt-6 rounded-2xl border p-5 sm:p-6 backdrop-blur-md relative ${riskCardStyle[result.riskLevel].bg} ${riskCardStyle[result.riskLevel].border} ${riskCardStyle[result.riskLevel].text}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${riskCardStyle[result.riskLevel].dot}`} />
                <span className="font-bold text-base tracking-tight">{riskCardStyle[result.riskLevel].label}</span>
              </div>
              <Info className="h-5 w-5 text-slate-400 shrink-0" />
            </div>
            
            <p className="mt-3 text-sm leading-relaxed opacity-95">
              This use case is considered <strong className="font-semibold">{result.riskLevel} Risk</strong> under the EU AI Act.
            </p>
            
            <button 
              onClick={openRiskPyramid}
              className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition cursor-pointer hover:underline"
            >
              How risk levels work
              <Info className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 text-sm leading-relaxed text-slate-700">
            <strong className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Risk Summary</strong>
            <p className={theme.cardText}>{result.summary}</p>
          </div>

          <div className="mt-8">
            <strong className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Indicators</strong>
            <div className="grid gap-3 sm:grid-cols-3">
              {result.indicators.map((indicator) => (
                <div key={indicator} className={`rounded-2xl border p-4 text-sm ${theme.darkPanel}`}>
                  <CheckCircle2 className={`mb-3 h-4 w-4 ${theme.icon}`} />
                  <span className={theme.cardText}>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-8 ${theme.panelStrong}`}>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Risk score</p>
          <div className="mt-5 flex items-end gap-3">
            <motion.span className={`text-7xl font-semibold tracking-[-0.08em] ${theme.title}`}>{roundedScore}</motion.span>
            <span className="mb-3 text-xl text-slate-500">/100</span>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.riskScore}%` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-400"
            />
          </div>
          <p className={`mt-5 text-sm leading-6 ${theme.softMuted}`}>
            Score reflects a first-pass match against common AI Act risk patterns and should be validated before compliance decisions.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <LockedPreview title="Recommended compliance steps" items={result.recommendations} openModal={openModal} />
        <LockedPreview title="Things to watch" items={result.watchouts} openModal={openModal} />
      </div>
    </motion.div>
  );
}

function LockedPreview({ title, items, openModal }: { title: string; items: string[]; openModal: () => void }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl ${theme.panel}`}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className={`text-xl font-semibold ${theme.title}`}>{title}</h3>
        <Lock className={`h-5 w-5 ${theme.icon}`} />
      </div>
      <div className="space-y-3 blur-[3px]">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {item}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center bg-white/40 p-6 text-center backdrop-blur-[2px]">
        <div>
          <p className="text-sm font-semibold text-slate-950">Unlock the full compliance roadmap</p>
          <button onClick={openModal} className={`mt-4 rounded-full px-5 py-3 text-sm font-semibold transition ${theme.primaryButton}`}>
            Request access
          </button>
        </div>
      </div>
    </div>
  );
}

function AccessModal({ close }: { close: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-5 backdrop-blur-md"
      onClick={close}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        onClick={(event) => event.stopPropagation()}
        className={`w-full max-w-md rounded-[2rem] border p-7 backdrop-blur-2xl ${theme.panelStrong}`}
      >
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-600 border border-blue-200/50">
          <Lock className="h-5 w-5" />
        </div>
        <h3 className={`text-2xl font-semibold ${theme.title}`}>Unlock the full roadmap</h3>
        <p className={`mt-3 leading-7 ${theme.cardText}`}>
          Enter your email to request the complete compliance recommendations. This is a frontend-only capture for now; no database is connected yet.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-sm leading-6 text-blue-800">
            Thanks. Your email is captured in this session preview. We can wire storage when you are ready.
          </div>
        ) : (
          <form onSubmit={submitEmail} className="mt-6 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="work@email.com"
              className={`w-full rounded-2xl border px-4 py-4 outline-none transition focus:border-blue-500 bg-slate-50/50 ${theme.input}`}
            />
            <button type="submit" className={`w-full rounded-2xl px-5 py-4 font-semibold transition ${theme.primaryButton}`}>
              Request full assessment
            </button>
          </form>
        )}

        <button onClick={close} className={`mt-4 w-full rounded-2xl border px-5 py-3 font-semibold transition ${theme.secondaryButton}`}>
          Continue exploring
        </button>
      </motion.div>
    </motion.div>
  );
}
