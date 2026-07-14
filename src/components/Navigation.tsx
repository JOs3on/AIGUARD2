"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./brand/Logo";

interface NavigationProps {
  variant?: "light" | "dark";
}

export function Navigation({ variant = "light" }: NavigationProps) {
  const pathname = usePathname();
  const isDark = variant === "dark";

  const styles = isDark
    ? {
        nav: "border-slate-800/60 bg-[#05070d]/75",
        title: "text-slate-50",
        link: "text-slate-400 hover:text-blue-400",
        activeLink: "text-blue-400",
        secondaryButton:
          "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100",
      }
    : {
        nav: "border-slate-200 bg-white/75",
        title: "text-slate-950",
        link: "text-slate-600 hover:text-blue-600",
        activeLink: "text-blue-600",
        secondaryButton:
          "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950",
      };

  const linkClass = (href: string) =>
    pathname === href ? styles.activeLink : styles.link;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 border-b backdrop-blur-2xl ${styles.nav}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={40} />
          <span
            className={`text-lg font-semibold tracking-tight ${styles.title}`}
          >
            AIRISKS
          </span>
        </Link>
        <div className="hidden items-center gap-7 text-sm md:flex">
          <Link href="/" className={`transition ${linkClass("/")}`}>
            Product
          </Link>
          <Link href="/eu-ai-act" className={`transition ${linkClass("/eu-ai-act")}`}>
            EU AI Act
          </Link>
          <Link href="/pricing" className={`transition ${linkClass("/pricing")}`}>
            Pricing
          </Link>
          <Link href="/demo" className={`transition ${linkClass("/demo")}`}>
            Dashboard Demo
          </Link>
          <Link href="/" className={`transition ${linkClass("/use-cases")}`}>
            Use cases
          </Link>
          <Link
            href="/"
            className={`rounded-full border px-4 py-2 transition ${styles.secondaryButton}`}
          >
            Check your use case
          </Link>
        </div>
      </nav>
    </header>
  );
}
