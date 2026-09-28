import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Boxes, Cpu, Layers3, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Station", icon: ScanLine },
  { to: "/pipeline", label: "Pipeline", icon: Cpu },
  { to: "/lots", label: "Lots", icon: Activity },
  { to: "/recipes", label: "Recipes", icon: Boxes },
  { to: "/models", label: "Teach", icon: Layers3 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-bg/95 px-4 backdrop-blur-sm md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="relative grid size-7 place-items-center rounded-xs border border-accent/50">
            <span className="absolute inset-x-1.5 top-1/2 h-px bg-accent" />
            <span className="absolute inset-y-1.5 left-1/2 w-px bg-accent" />
          </span>
          <span className="font-medium tracking-tight">
            LineSight
            <span className="ml-2 hidden text-xs font-normal text-muted sm:inline">QC</span>
          </span>
        </Link>
        <p className="hidden text-xs text-muted md:block">
          HuskyLens 2 · RDK X5 8GB · MSME line
        </p>
        <span className="rounded-full bg-pass-dim px-2.5 py-1 font-mono text-xs text-pass">
          DEMO LINE
        </span>
      </header>

      <div className="mx-auto flex max-w-7xl gap-0 md:gap-6 md:px-6">
        <nav aria-label="Primary" className="hidden w-44 shrink-0 flex-col gap-1 py-6 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150",
                  active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 px-4 py-5 pb-24 md:px-0 md:pb-8">{children}</main>
      </div>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
      >
        {NAV.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-1 text-[11px]",
                active ? "text-fg" : "text-muted",
              )}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
