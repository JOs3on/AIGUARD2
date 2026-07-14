"use client";

import { useId } from "react";

interface LogoProps {
  /** Pixel size of the square logo container. */
  size?: number;
  /** Optional extra classes for the wrapper. */
  className?: string;
  /** Accessible title; defaults to "AIRISKS". */
  title?: string;
}

/**
 * AIRISKS shield logo (extracted from index.html).
 * Uses `useId` so multiple instances on the same page never share
 * the same `<linearGradient>` ids (which would break the second logo).
 */
export function Logo({ size = 40, className = "", title = "AIRISKS" }: LogoProps) {
  const rawId = useId();
  // Sanitize React's useId output (it can contain ":") for safe SVG id use.
  const safe = rawId.replace(/:/g, "");
  const leftId = `logoLeft-${safe}`;
  const rightId = `logoRight-${safe}`;

  return (
    <div
      className={`shrink-0 drop-shadow-[0_7px_13px_rgba(0,71,255,0.24)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={title ? undefined : true}
    >
      <svg
        viewBox="0 0 64 64"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={leftId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0b40e8" />
            <stop offset="1" stopColor="#1162ff" />
          </linearGradient>
          <linearGradient id={rightId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0e4bff" />
            <stop offset="1" stopColor="#08a9ff" />
          </linearGradient>
        </defs>
        <path
          d="M8 51 26 11c2.6-5.7 10.7-5.7 13.3 0L56 51c1.5 3.5-.2 7.5-3.7 8.9-3.4 1.4-7.3-.2-8.8-3.6L32.6 29 20.4 56.3c-1.5 3.4-5.5 5-8.9 3.5C8 58.3 6.5 54.4 8 51Z"
          fill={`url(#${leftId})`}
        />
        <path
          d="M32.6 29 44 56c1.5 3.5 5.5 5.1 8.9 3.6 3.4-1.5 5-5.4 3.5-8.9L39.3 11c-1.2-2.8-3.8-4.4-6.7-4.4Z"
          fill={`url(#${rightId})`}
        />
        <circle cx="32.5" cy="45.4" r="6.4" fill="#0aaeff" />
      </svg>
    </div>
  );
}
