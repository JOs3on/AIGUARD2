"use client";

import { useState } from "react";
import Link from "next/link";
import {
  demoCompany,
  demoNavLinks,
  type DemoSection,
} from "@/data/demoDashboard";
import { ChevronDown, Menu, X, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

interface DashboardSidebarProps {
  active: DemoSection;
  onSelect: (section: DemoSection) => void;
}

export function DashboardSidebar({ active, onSelect }: DashboardSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (section: DemoSection) => {
    onSelect(section);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={40} />
          <span className="text-sm font-semibold tracking-tight text-white">
            AIRISKS
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-[#000f2d] via-[#001437] to-[#001335] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Logo size={40} />
                <span className="text-sm font-semibold tracking-tight text-white">
                  AIRISKS
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="grid gap-2.5">
              {demoNavLinks.map((link) => (
                <SidebarNavLink
                  key={link.id}
                  label={link.label}
                  active={active === link.id}
                  onClick={() => handleSelect(link.id)}
                />
              ))}
            </nav>
            <CompanyCard />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-[277px] shrink-0 flex-col self-stretch p-6 lg:flex">
        <Link
          href="/"
          className="mb-12 flex items-center gap-2.5 px-2"
          aria-label="Back to AIRISKS"
        >
          <Logo size={48} />
          <span className="text-lg font-semibold tracking-tight text-white">
            AIRISKS
          </span>
        </Link>

        <nav className="grid gap-2.5">
          {demoNavLinks.map((link) => (
            <SidebarNavLink
              key={link.id}
              label={link.label}
              active={active === link.id}
              onClick={() => onSelect(link.id)}
            />
          ))}
        </nav>

        <div className="mt-auto">
          <BackToSiteLink />
          <CompanyCard />
        </div>
      </aside>
    </>
  );
}

function SidebarNavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-16 items-center rounded-xl px-7 text-[17px] font-medium tracking-tight transition-all ${
        active
          ? "overflow-hidden bg-gradient-to-br from-[#104afc] to-[#1038ef] pl-8 text-white shadow-lg shadow-blue-900/40"
          : "text-white/80 hover:translate-x-0.5 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      {active && (
        <>
          <span className="absolute inset-y-0 left-0 w-[17px] bg-blue-950/40" />
          <span className="absolute left-3.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(25,199,255,0.7)]" />
        </>
      )}
      {label}
    </button>
  );
}

function CompanyCard() {
  return (
    <div className="mt-4 rounded-xl border border-white/15 p-4 text-white">
      <div className="flex items-center justify-between gap-3 text-[15px] font-medium">
        <span>{demoCompany.name}</span>
        <ChevronDown className="h-3 w-3 rotate-45 -translate-y-0.5" />
      </div>
      <small className="mt-2.5 block text-sm text-slate-300">
        {demoCompany.useCaseCount} AI Use Cases
      </small>
    </div>
  );
}

function BackToSiteLink() {
  return (
    <Link
      href="/"
      className="mb-2 flex items-center gap-1.5 rounded-lg px-2 text-sm text-slate-400 transition hover:text-white"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to site
    </Link>
  );
}


