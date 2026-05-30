"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { UseCase } from "@/data/usecases";
import { getBestUseCase, searchUseCases } from "@/lib/search";

type SearchState = "idle" | "typing" | "searching" | "result";

const riskTone: Record<UseCase["riskLevel"], string> = {
  Minimal: "from-emerald-300 to-lime-300 text-emerald-950",
  Limited: "from-sky-300 to-cyan-300 text-sky-950",
  High: "from-amber-300 to-orange-300 text-amber-950",
  Prohibited: "from-rose-300 to-red-400 text-rose-950",
};

const theme = {
  page: "bg-[#f7fbff] text-slate-950",
  nav: "border-sky-100 bg-white/75",
  muted: "text-slate-600",
  softMuted: "text-slate-500",
  panel: "border-sky-100 bg-white/80 shadow-xl shadow-sky-100/70",
  panelStrong: "border-sky-100 bg-white/95 shadow-2xl shadow-sky-100/80",
  darkPanel: "border-sky-100 bg-white/90",
  title: "text-slate-950",
  chip: "border-sky-100 bg-white/80 text-sky-700 shadow-xl shadow-sky-100/70",
  searchOuter: "border-sky-100 bg-white/75 shadow-2xl shadow-blue-100/80",
  searchInner: "bg-white",
  input: "text-slate-950 placeholder:text-slate-400",
  primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
  secondaryButton: "border-sky-100 text-slate-700 hover:bg-sky-50 hover:text-slate-950",
  cardText: "text-slate-700",
  icon: "text-blue-600",
};

export function AIGuardExperience() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>("idle");
  const [selected, setSelected] = useState<UseCase | null>(null);
  const [showModal, setShowModal] = useState(false);

  const suggestions = useMemo(() => searchUseCases(query), [query]);
  const score = useMotionValue(0);
  const smoothScore = useSpring(score, { stiffness: 90, damping: 20 });
  const roundedScore = useTransform(smoothScore, (latest) => Math.round(latest));

  function updateQuery(value: string) {
    setQuery(value);
    if (state !== "searching" && state !== "result") {
      setState(value.trim() ? "typing" : "idle");
    }
  }

  function runSearch(event?: FormEvent, suggestion?: UseCase) {
    event?.preventDefault();
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
      <Navigation />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-12 pt-28 sm:px-8 lg:px-10">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className={`mx-auto flex w-full max-w-5xl flex-1 flex-col items-center ${state === "result" ? "justify-start" : "justify-center"}`}
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
            onSubmit={(event) => runSearch(event)}
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
            {state === "typing" && <TypingSuggestions key="typing" suggestions={suggestions} runSearch={runSearch} />}
            {state === "searching" && <SearchProgress key="searching" result={activeResult} />}
            {state === "result" && activeResult && (
              <ResultView
                key="result"
                result={activeResult}
                roundedScore={roundedScore}
                resetSearch={resetSearch}
                openModal={() => setShowModal(true)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>{showModal && <AccessModal close={() => setShowModal(false)} />}</AnimatePresence>
    </main>
  );
}

function Navigation() {
  return (
    <header className={`fixed left-0 right-0 top-0 z-30 border-b backdrop-blur-2xl ${theme.nav}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className={`text-lg font-semibold tracking-tight ${theme.title}`}>AIGUARD</span>
        </div>
        <div className={`hidden items-center gap-7 text-sm md:flex ${theme.muted}`}>
          <a href="#" className="transition hover:text-blue-600">Product</a>
          <a href="#" className="transition hover:text-blue-600">EU AI Act</a>
          <a href="#" className="transition hover:text-blue-600">Use cases</a>
          <a href="#" className={`rounded-full border px-4 py-2 transition ${theme.secondaryButton}`}>Check your use case</a>
        </div>
      </nav>
    </header>
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
          className={`rounded-3xl border p-5 opacity-80 backdrop-blur-xl ${theme.panel}`}
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

function TypingSuggestions({ suggestions, runSearch }: { suggestions: UseCase[]; runSearch: (event?: FormEvent, suggestion?: UseCase) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className={`mt-6 w-full max-w-4xl rounded-[2rem] border p-3 backdrop-blur-2xl ${theme.panelStrong}`}
    >
      <div className={`flex items-center gap-2 px-3 py-2 text-sm ${theme.muted}`}>
        <Zap className={`h-4 w-4 ${theme.icon}`} />
        Matching your use case to AI Act risk patterns
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {suggestions.map((item, index) => (
          <motion.button
            type="button"
            onClick={() => runSearch(undefined, item)}
            key={item.id}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: index * 0.06 }}
            className={`group relative overflow-hidden rounded-3xl border p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50 ${theme.panel}`}
          >
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
            />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <h3 className={`font-semibold ${theme.title}`}>{item.title}</h3>
                <p className={`mt-1 text-sm leading-5 ${theme.cardText}`}>{item.description}</p>
              </div>
              <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold ${riskTone[item.riskLevel]}`}>{item.riskLevel}</span>
            </div>
          </motion.button>
        ))}
      </div>
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
}: {
  result: UseCase;
  roundedScore: ReturnType<typeof useTransform<number, number>>;
  resetSearch: () => void;
  openModal: () => void;
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
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className={`rounded-full bg-gradient-to-r px-4 py-2 text-sm font-bold ${riskTone[result.riskLevel]}`}>
              Likely {result.riskLevel} Risk
            </span>
            <span className={`rounded-full border border-sky-100/60 px-4 py-2 text-sm ${theme.muted}`}>EU AI Act classification preview</span>
          </div>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-5xl ${theme.title}`}>{result.title}</h2>
          <p className={`mt-4 max-w-2xl text-lg leading-8 ${theme.cardText}`}>{result.summary}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {result.indicators.map((indicator) => (
              <div key={indicator} className={`rounded-2xl border p-4 text-sm ${theme.darkPanel}`}>
                <CheckCircle2 className={`mb-3 h-4 w-4 ${theme.icon}`} />
                <span className={theme.cardText}>{indicator}</span>
              </div>
            ))}
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
