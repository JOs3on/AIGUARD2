"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Navigation } from "./Navigation";

/* ─── Data ─── */

const riskTiers = [
  {
    id: "prohibited",
    title: "Prohibited",
    color: "#f43f5e",
    borderColor: "border-rose-200",
    bgColor: "bg-rose-50/60",
    textColor: "text-rose-700",
    dotColor: "bg-rose-500",
    description:
      "AI systems considered a threat to people. Includes social scoring, cognitive manipulation, and real-time biometric identification in public spaces.",
  },
  {
    id: "high",
    title: "High Risk",
    color: "#f97316",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50/60",
    textColor: "text-orange-700",
    dotColor: "bg-orange-500",
    description:
      "AI systems that can negatively affect safety or fundamental rights. Requires strict obligations like bias mitigation, logging, and human oversight.",
  },
  {
    id: "limited",
    title: "Limited Risk",
    color: "#0ea5e9",
    borderColor: "border-sky-200",
    bgColor: "bg-sky-50/60",
    textColor: "text-sky-700",
    dotColor: "bg-sky-500",
    description:
      "AI systems with transparency obligations. Users must be informed they are interacting with AI, such as chatbots and deepfakes.",
  },
  {
    id: "minimal",
    title: "Minimal Risk",
    color: "#10b981",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50/60",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-500",
    description:
      "AI systems with minimal or no risk. No mandatory obligations, but voluntary codes of conduct are encouraged.",
  },
];

const faqs = [
  {
    question: "What is the EU AI Act?",
    answer:
      "The EU AI Act is a comprehensive regulatory framework proposed by the European Union to govern the development, deployment, and use of artificial intelligence systems. It aims to ensure AI is safe, transparent, and respects fundamental rights.",
  },
  {
    question: "Who does the EU AI Act apply to?",
    answer:
      "The Act applies to all providers and deployers of AI systems operating within the EU, regardless of where they are established. It also applies to providers outside the EU if their AI systems are used within the EU market.",
  },
  {
    question: "When does the EU AI Act come into force?",
    answer:
      "The EU AI Act entered into force on 1 August 2024. Prohibited practices are banned after 6 months, general-purpose AI model obligations after 12 months, and full application after 36 months.",
  },
  {
    question: "What are the penalties for non-compliance?",
    answer:
      "Penalties can reach up to €35 million or 7% of global annual turnover for prohibited AI practices. High-risk system violations can result in fines up to €15 million or 3% of global turnover.",
  },
  {
    question: "How do I know if my AI system is high-risk?",
    answer:
      "High-risk AI systems are defined in Annex III of the Act and include systems used in critical infrastructure, education, employment, essential services, law enforcement, migration, and administration of justice.",
  },
];

/* ─── Components ─── */

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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition hover:text-slate-900"
      >
        <span className="text-sm font-medium text-slate-800 sm:text-base">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 shrink-0 text-slate-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ─── */

export function EUAIActPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <BackgroundAtmosphere />
      <Navigation variant="light" />

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs text-blue-700 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            EU AI Act Guidelines
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Understand the EU AI Act
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-slate-600 sm:text-lg">
            The EU AI Act classifies AI systems into four risk categories.
            These dictate your compliance obligations.
          </p>
        </motion.div>
      </section>

      {/* ── Risk Cards ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {riskTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border ${tier.borderColor} ${tier.bgColor} p-6 shadow-md shadow-slate-100/30 transition duration-300 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5`}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${tier.dotColor}`} />
                <h3 className={`text-lg font-semibold tracking-tight ${tier.textColor}`}>
                  {tier.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {tier.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-20 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-500 sm:text-base">
            Everything you need to know about the EU AI Act.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl sm:p-8"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50/60 p-8 text-center shadow-xl shadow-slate-200/40 sm:p-12"
        >
          <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-600 border border-blue-200/50">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Ready to check your specific use case?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
            Get a preliminary risk assessment in seconds. Understand your
            obligations and stay compliant.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Check your use case
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-5 text-center text-xs text-slate-400 sm:px-8 lg:px-10">
          AIRISKS — Preliminary EU AI Act clarity checks. Not legal advice.
        </div>
      </footer>
    </main>
  );
}
