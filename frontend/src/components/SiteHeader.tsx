"use client";

import Link from "next/link";
import { MaterialIcon } from "./MaterialIcon";

/**
 * Shared top bar: solid primary blue to match the brand “dark blue” across landing + app.
 */
export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center border-b border-black/10 bg-primary shadow-md">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-headline text-xl font-bold tracking-tight text-on-primary md:text-2xl"
        >
          Sanctuary Health
        </Link>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-full p-2 text-on-primary transition-colors hover:bg-white/15 active:scale-95"
            aria-label="Account"
          >
            <MaterialIcon name="account_circle" className="text-on-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
