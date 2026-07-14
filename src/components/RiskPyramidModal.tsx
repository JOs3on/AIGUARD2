"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type RiskTierId = "Prohibited" | "High" | "Limited" | "Minimal";

interface RiskTier {
  id: RiskTierId;
  name: string;
  label: string;
  color: string;
  textColor: string;
  path: string;
  textY: number;
  description: string;
  connectorX: number;
  connectorY: number;
}

const Tiers: RiskTier[] = [
  {
    id: "Prohibited",
    name: "Prohibited Risk",
    label: "BANNED",
    color: "#f43f5e",
    textColor: "text-rose-700",
    path: "M 160 15 L 195 75 L 125 75 Z",
    textY: 57,
    description:
      "AI practices that are considered unacceptable and are banned under the EU AI Act.",
    connectorX: 195,
    connectorY: 45,
  },
  {
    id: "High",
    name: "High Risk",
    label: "HIGH RISK",
    color: "#f97316",
    textColor: "text-orange-700",
    path: "M 120 85 L 200 85 L 235 135 L 85 135 Z",
    textY: 114,
    description:
      "AI systems that can significantly impact health, safety or fundamental rights. Strict requirements apply.",
    connectorX: 235,
    connectorY: 110,
  },
  {
    id: "Limited",
    name: "Limited Risk",
    label: "LIMITED",
    color: "#eab308",
    textColor: "text-yellow-700",
    path: "M 80 145 L 240 145 L 275 195 L 45 195 Z",
    textY: 174,
    description:
      "AI systems with limited transparency obligations, such as informing users they are interacting with AI.",
    connectorX: 275,
    connectorY: 170,
  },
  {
    id: "Minimal",
    name: "Minimal Risk",
    label: "MINIMAL",
    color: "#10b981",
    textColor: "text-emerald-700",
    path: "M 40 205 L 280 205 L 315 255 L 5 255 Z",
    textY: 234,
    description:
      "AI systems with minimal or no risk. No specific obligations under the EU AI Act.",
    connectorX: 315,
    connectorY: 230,
  },
];

interface RiskPyramidModalProps {
  close: () => void;
}

export function RiskPyramidModal({ close }: RiskPyramidModalProps) {
  const [hoveredTier, setHoveredTier] = useState<RiskTierId>("Prohibited");
  const closeRef = useRef(close);

  useEffect(() => {
    closeRef.current = close;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeTier = Tiers.find((t) => t.id === hoveredTier) ?? Tiers[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        onClick={(event) => event.stopPropagation()}
        className="relative my-8 w-full max-w-4xl rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              How AI risk levels work
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
              The EU AI Act classifies AI systems into four risk categories.
              Your obligations depend on the risk level.
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 items-center gap-4 md:grid-cols-[1.3fr_1fr]">
          {/* Pyramid */}
          <div
            className="flex items-center justify-center"
            onMouseLeave={() => setHoveredTier("Prohibited")}
          >
            <div className="relative aspect-[360/260] w-full max-w-[320px] select-none">
              <svg
                viewBox="0 0 360 260"
                className="h-auto w-full overflow-visible"
              >
                <defs>
                  {/* Glow filters */}
                  <filter
                    id="glow-prohibited"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="5"
                      result="blur"
                    />
                    <feFlood
                      floodColor="#f43f5e"
                      floodOpacity="0.5"
                      result="color"
                    />
                    <feComposite
                      in="color"
                      in2="blur"
                      operator="in"
                      result="shadow"
                    />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter
                    id="glow-high"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="5"
                      result="blur"
                    />
                    <feFlood
                      floodColor="#f97316"
                      floodOpacity="0.5"
                      result="color"
                    />
                    <feComposite
                      in="color"
                      in2="blur"
                      operator="in"
                      result="shadow"
                    />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter
                    id="glow-limited"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="5"
                      result="blur"
                    />
                    <feFlood
                      floodColor="#eab308"
                      floodOpacity="0.5"
                      result="color"
                    />
                    <feComposite
                      in="color"
                      in2="blur"
                      operator="in"
                      result="shadow"
                    />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter
                    id="glow-minimal"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="5"
                      result="blur"
                    />
                    <feFlood
                      floodColor="#10b981"
                      floodOpacity="0.5"
                      result="color"
                    />
                    <feComposite
                      in="color"
                      in2="blur"
                      operator="in"
                      result="shadow"
                    />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {Tiers.map((tier) => {
                  const isActive = hoveredTier === tier.id;
                  return (
                    <g key={tier.id}>
                      {/* Tier shape */}
                      <motion.path
                        d={tier.path}
                        fill={tier.color}
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        className="cursor-pointer"
                        filter={
                          isActive
                            ? `url(#glow-${tier.id.toLowerCase()})`
                            : undefined
                        }
                        animate={{
                          fillOpacity: isActive ? 0.95 : 0.45,
                          scale: isActive ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{ transformOrigin: "160px 130px" }}
                        onMouseEnter={() => setHoveredTier(tier.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${tier.name} tier`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setHoveredTier(tier.id);
                          }
                        }}
                      />

                      {/* Label */}
                      <text
                        x="160"
                        y={tier.textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none select-none fill-white text-[9px] font-bold uppercase tracking-[0.15em]"
                        style={{
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      >
                        {tier.label}
                      </text>

                      {/* Connector dot */}
                      <motion.circle
                        cx={tier.connectorX}
                        cy={tier.connectorY}
                        fill={tier.color}
                        animate={{
                          r: isActive ? 5 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.15 }}
                      />

                      {/* Connector line */}
                      <motion.line
                        x1={tier.connectorX}
                        y1={tier.connectorY}
                        x2={tier.connectorX}
                        y2={tier.connectorY}
                        stroke={tier.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        animate={{
                          x2: isActive ? 360 : tier.connectorX,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Callout */}
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-lg"
                style={{ borderLeft: `4px solid ${activeTier.color}` }}
              >
                {/* Receiving dot */}
                <span
                  className="absolute -left-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: activeTier.color }}
                />

                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: activeTier.color }}
                  />
                  <h4
                    className={`text-base font-bold tracking-tight ${activeTier.textColor}`}
                  >
                    {activeTier.name}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {activeTier.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p className="text-xs leading-relaxed">
            Risk classification depends on the{" "}
            <strong className="text-slate-700">
              purpose and specific use
            </strong>{" "}
            of the AI system, not the technology itself. Ensure your
            application is reviewed against full legislative criteria.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
