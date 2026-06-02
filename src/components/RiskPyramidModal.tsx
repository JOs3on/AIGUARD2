"use client";

import { motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { useState } from "react";

type RiskTierId = "Prohibited" | "High" | "Limited" | "Minimal";

interface RiskTier {
  id: RiskTierId;
  name: string;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  gradientId: string;
  path: string;
  textY: number;
  description: string;
  obligations: string;
}

const Tiers: RiskTier[] = [
  {
    id: "Prohibited",
    name: "Prohibited Risk",
    label: "BANNED",
    color: "#f43f5e", // Bright Rose-500
    bgColor: "bg-rose-50/40 hover:bg-rose-50/70 border-rose-100 hover:border-rose-300 shadow-rose-100/30",
    textColor: "text-rose-950",
    gradientId: "grad-prohibited",
    path: "M 160 15 L 195 75 L 125 75 Z",
    textY: 57,
    description: "AI practices that are considered unacceptable and are banned under the EU AI Act.",
    obligations: "Complete ban with very limited law enforcement exceptions.",
  },
  {
    id: "High",
    name: "High Risk",
    label: "HIGH RISK",
    color: "#f97316", // Bright Orange-500
    bgColor: "bg-orange-50/40 hover:bg-orange-50/70 border-orange-100 hover:border-orange-300 shadow-orange-100/30",
    textColor: "text-orange-950",
    gradientId: "grad-high",
    path: "M 120 85 L 200 85 L 235 135 L 85 135 Z",
    textY: 114,
    description: "AI systems that can significantly impact health, safety or fundamental rights. Strict requirements apply.",
    obligations: "Mandatory conformity assessments, logging, and human oversight.",
  },
  {
    id: "Limited",
    name: "Limited Risk",
    label: "LIMITED",
    color: "#eab308", // Bright Yellow-500
    bgColor: "bg-yellow-50/30 hover:bg-yellow-50/60 border-yellow-100 hover:border-yellow-300 shadow-yellow-100/30",
    textColor: "text-yellow-950",
    gradientId: "grad-limited",
    path: "M 80 145 L 240 145 L 275 195 L 45 195 Z",
    textY: 174,
    description: "AI systems with limited transparency obligations, such as informing users they are interacting with AI.",
    obligations: "Disclosure requirement so users know they are interacting with AI.",
  },
  {
    id: "Minimal",
    name: "Minimal Risk",
    label: "MINIMAL",
    color: "#10b981", // Bright Emerald-500
    bgColor: "bg-emerald-50/40 hover:bg-emerald-50/70 border-emerald-100 hover:border-emerald-300 shadow-emerald-100/30",
    textColor: "text-emerald-950",
    gradientId: "grad-minimal",
    path: "M 40 205 L 280 205 L 315 255 L 5 255 Z",
    textY: 234,
    description: "AI systems with minimal or no risk. No specific obligations under the EU AI Act.",
    obligations: "No regulatory obligations, but voluntary codes of conduct are welcomed.",
  },
];

interface RiskPyramidModalProps {
  close: () => void;
}

export function RiskPyramidModal({ close }: RiskPyramidModalProps) {
  const [hoveredTier, setHoveredTier] = useState<RiskTierId | null>(null);

  // Close on Escape key
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm overflow-y-auto"
      onClick={close}
    >
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        onClick={(event) => event.stopPropagation()}
        className="relative my-8 w-full max-w-4xl rounded-[2rem] border border-slate-100 bg-white/95 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl sm:p-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              How AI risk levels work
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
              The EU AI Act classifies AI systems into four risk categories. Your obligations depend on the risk level.
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_1.9fr] items-center">
          {/* Pyramid Diagram Column */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] sm:max-w-[290px] aspect-[320/260] select-none">
              <svg
                viewBox="0 0 320 260"
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  {/* Prohibited Sophisticated Gradient - 20% Brighter */}
                  <linearGradient id="grad-prohibited" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity="0.75" />
                  </linearGradient>

                  {/* High Sophisticated Gradient - 20% Brighter */}
                  <linearGradient id="grad-high" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff8c3a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.7" />
                  </linearGradient>

                  {/* Limited Sophisticated Gradient - 20% Brighter */}
                  <linearGradient id="grad-limited" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.68" />
                  </linearGradient>

                  {/* Minimal Sophisticated Gradient - 20% Brighter */}
                  <linearGradient id="grad-minimal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.65" />
                  </linearGradient>
                </defs>

                {/* SVG Pyramid Polygons */}
                {Tiers.map((tier) => {
                  const isHovered = hoveredTier === tier.id;
                  const isAnyHovered = hoveredTier !== null;
                  const opacity = isAnyHovered ? (isHovered ? 1.0 : 0.35) : 0.85;

                  return (
                    <g key={tier.id}>
                      <motion.path
                        d={tier.path}
                        fill={`url(#${tier.gradientId})`}
                        stroke={tier.color}
                        strokeWidth={isHovered ? "2.5" : "1.25"}
                        strokeOpacity={isHovered ? "1.0" : "0.5"}
                        className="cursor-pointer transition-all duration-300"
                        initial={{
                          opacity: 0.85,
                          scale: 1,
                          y: 0
                        }}
                        animate={{
                          opacity: opacity,
                          scale: isHovered ? 1.03 : 1,
                          y: isHovered ? (tier.id === "Prohibited" ? -2 : tier.id === "High" ? -1 : tier.id === "Limited" ? 1 : 2) : 0,
                        }}
                        style={{ transformOrigin: "160px 130px" }}
                        onMouseEnter={() => setHoveredTier(tier.id)}
                        onMouseLeave={() => setHoveredTier(null)}
                      />
                      {/* Embedded Text Label inside the Pyramid Tier */}
                      <text
                        x="160"
                        y={tier.textY}
                        textAnchor="middle"
                        className="fill-white font-bold text-[8.5px] sm:text-[9px] tracking-widest pointer-events-none select-none shadow-sm"
                        style={{
                          opacity: isAnyHovered ? (isHovered ? 1.0 : 0.4) : 0.95,
                          transition: "opacity 300ms ease",
                          textShadow: "0px 1px 2px rgba(15, 23, 42, 0.4)"
                        }}
                      >
                        {tier.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Explanation Text Column */}
          <div className="flex flex-col space-y-3">
            {Tiers.map((tier) => {
              const isHovered = hoveredTier === tier.id;
              const isAnyHovered = hoveredTier !== null;
              
              // Apply border shadow matching color when hovered, standard soft shadow otherwise
              const opacityClass = isAnyHovered 
                ? (isHovered ? "opacity-100 border-slate-200/80 shadow-lg scale-[1.005]" : "opacity-45") 
                : "opacity-100 shadow-md";

              return (
                <div
                  key={`text-${tier.id}`}
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`flex flex-col rounded-2xl border-l-[5px] border-y border-r p-4 transition-all duration-300 cursor-pointer ${tier.bgColor} ${opacityClass}`}
                  style={{ borderLeftColor: tier.color }}
                >
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold tracking-tight ${tier.textColor}`}>
                      {tier.name}
                    </h4>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {tier.description}
                  </p>
                  <div className="mt-2.5 border-t border-slate-100 pt-2 flex items-start gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mt-0.5">Obligations:</span>
                    <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                      {tier.obligations}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info card */}
        <div className="mt-8 flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-500">
          <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-slate-400" />
          <p className="text-xs leading-relaxed">
            Risk classification depends on the <strong className="text-slate-700">purpose and specific use</strong> of the AI system, not the technology itself. Ensure your application is reviewed against full legislative criteria.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
