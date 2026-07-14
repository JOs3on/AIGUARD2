"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  Database,
  FileCheck2,
  Minus,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "./Navigation";

/* ─── Data ─── */

interface AssessmentPlan {
  id: string;
  name: string;
  price: string;
  priceUnit?: string;
  useCaseLimit: string;
  description: string;
  cta: string;
  ctaStyle: "outline" | "primary";
  features: string[];
  bestFor: string;
  highlighted?: boolean;
  badge?: string;
}

const assessmentPlans: AssessmentPlan[] = [
  {
    id: "discover",
    name: "Discover",
    price: "€0",
    useCaseLimit: "Up to 3 AI use cases",
    description: "Browse the library and classify a few systems.",
    cta: "Get started",
    ctaStyle: "outline",
    features: ["AI Use Case Library"],
    bestFor: "Exploration",
  },
  {
    id: "starter",
    name: "Starter",
    price: "€990",
    priceUnit: "/ one-time",
    useCaseLimit: "Up to 10 AI use cases",
    description: "Classify use cases and produce your first reports.",
    cta: "Choose Starter",
    ctaStyle: "outline",
    features: [
      "AI Use Case Library",
      "Risk Classification",
      "AI Compliance Report",
    ],
    bestFor: "Single team assessment",
  },
  {
    id: "business",
    name: "Business",
    price: "€2,490",
    priceUnit: "/ one-time",
    useCaseLimit: "Up to 10 AI Compliance Reports",
    description: "Portfolio-ready remediation guidance.",
    cta: "Choose Business",
    ctaStyle: "primary",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Includes Starter",
      "Risk Score",
      "Checklists",
      "Template Texts",
      "Consolidated Compliance Report",
      "AI Portfolio Overview",
    ],
    bestFor: "Portfolio readiness",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Quote",
    useCaseLimit: "10+ AI use cases",
    description: "Tailored to your org's specific AI risk landscape.",
    cta: "Contact sales",
    ctaStyle: "outline",
    features: [
      "Everything in Business",
      "Custom AI assessment",
      "Custom reporting",
      "Legal review options",
    ],
    bestFor: "Custom needs",
  },
];

interface MonitoringFeature {
  icon: typeof Bell;
  title: string;
  description: string;
}

const monitoringFeatures: MonitoringFeature[] = [
  {
    icon: TrendingUp,
    title: "Regulatory Updates",
    description: "Track new AI guidance and updates.",
  },
  {
    icon: Bell,
    title: "Risk Change Alerts",
    description: "Stay notified when risk classifications change.",
  },
  {
    icon: Calendar,
    title: "Deadline Reminders",
    description: "Don't miss compliance deadlines.",
  },
  {
    icon: FileCheck2,
    title: "AI Portfolio Status",
    description: "Monitor all assessed AI systems.",
  },
  {
    icon: Database,
    title: "Documentation Vault",
    description: "Store reports and compliance evidence.",
  },
];

type ComparisonRow =
  | { label: string; included: [boolean, boolean, boolean, boolean] }
  | { label: string; values: [string, string, string, string] };

const comparisonFeatures: ComparisonRow[] = [
  { label: "AI Use Case Library", included: [true, true, true, true] },
  { label: "Risk Classification", included: [false, true, true, true] },
  { label: "AI Compliance Report", included: [false, true, true, true] },
  { label: "Risk Score", included: [false, false, true, true] },
  { label: "Checklists", included: [false, false, true, true] },
  { label: "Template Texts", included: [false, false, true, true] },
  {
    label: "Consolidated Compliance Report",
    included: [false, false, true, true],
  },
  { label: "AI Portfolio Overview", included: [false, false, true, true] },
  { label: "Custom AI assessment", included: [false, false, false, true] },
  { label: "Custom reporting", included: [false, false, false, true] },
  { label: "Legal review options", included: [false, false, false, true] },
  {
    label: "Best for",
    values: [
      "Exploration",
      "Single team assessment",
      "Portfolio readiness",
      "Custom needs",
    ],
  },
];

/* ─── Page ─── */

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

export function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <BackgroundAtmosphere />
      <Navigation variant="light" />

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pt-36 pb-12 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Pricing
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            From{" "}
            <span className="text-blue-600">AI assessment</span> to compliance
            readiness.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
            One-time assessment plans to classify your AI portfolio, plus an
            optional monitoring subscription to stay compliant over time.
          </p>
        </motion.div>
      </section>

      {/* ── Assessment Plans ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
              Assessment Plans
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Pick a one-time plan that matches your portfolio size.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {assessmentPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 sm:p-7 ${
                plan.highlighted
                  ? "border-2 border-blue-500 lg:-translate-y-3"
                  : "border border-slate-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow-md shadow-blue-600/30">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </div>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {plan.description}
              </p>

              <div className="mt-5">
                <span className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {plan.price}
                </span>
                {plan.priceUnit && (
                  <span className="ml-1 text-sm font-medium text-slate-500">
                    {plan.priceUnit}
                  </span>
                )}
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {plan.useCaseLimit}
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm leading-5 text-slate-700"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Best for</span>
                <span className="text-slate-700">{plan.bestFor}</span>
              </div>

              <div className="mt-auto pt-6">
                {plan.ctaStyle === "primary" ? (
                  <Link
                    href="/"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-md shadow-blue-600/25"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className={`inline-flex w-full items-center justify-center rounded-xl border py-3 text-sm font-semibold transition ${
                      plan.id === "discover"
                        ? "border-slate-900 bg-slate-950 text-white hover:bg-slate-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Stay Compliant Over Time (monitoring) ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50/60 to-blue-50/40 shadow-xl shadow-slate-200/40"
        >
          <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1.6fr] lg:p-10">
            {/* Left: copy + price */}
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                Stay Compliant Over Time
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Add ongoing monitoring to any plan.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                The AI Act and your systems both evolve. The monitoring
                subscription keeps you ahead of regulatory shifts, changing
                risk classifications, and compliance deadlines.
              </p>

              <div className="mt-6 inline-flex w-fit items-end gap-2 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
                <RefreshCw className="h-6 w-6 text-blue-600" />
                <span className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  €99
                </span>
                <span className="mb-1.5 text-base font-medium text-slate-500">
                  / month
                </span>
              </div>

              <Link
                href="/"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-md shadow-blue-600/25"
              >
                Add Monitoring
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: feature grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {monitoringFeatures.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/95 p-5 transition hover:border-blue-300 hover:shadow-md hover:shadow-blue-100/40"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-12 sm:px-8 lg:px-10">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Compare Plans
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Everything that&apos;s included at each tier.
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/40"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Features
                  </th>
                  {assessmentPlans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-4 py-4 text-center text-sm font-semibold ${
                        plan.highlighted ? "text-blue-600" : "text-slate-700"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={idx % 2 === 0 ? "bg-slate-50/40" : "bg-white"}
                  >
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-700">
                      {row.label}
                    </td>
                    {"values" in row
                      ? (
                          row as {
                            values: [string, string, string, string];
                          }
                        ).values.map((val, vi) => (
                          <td
                            key={vi}
                            className="px-4 py-3.5 text-center text-sm text-slate-600"
                          >
                            {val}
                          </td>
                        ))
                      : (
                          row as {
                            included: [
                              boolean,
                              boolean,
                              boolean,
                              boolean,
                            ];
                          }
                        ).included.map((inc, vi) => (
                          <td key={vi} className="px-4 py-3.5 text-center">
                            {inc ? (
                              <Check className="mx-auto h-5 w-5 text-blue-500" />
                            ) : (
                              <Minus className="mx-auto h-5 w-5 text-slate-300" />
                            )}
                          </td>
                        ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
