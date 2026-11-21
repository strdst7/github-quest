import type { ReactNode } from "react";

export type Accent = "coral" | "aqua" | "gold" | "violet" | "lime";

export const ACCENTS: Record<
  Accent,
  {
    hex: string;
    text: string;
    bg: string;
    border: string;
    chip: string;
    glow: string;
    solid: string;
    dot: string;
    glowClass: string;
  }
> = {
  coral: {
    hex: "magenta",
    text: "text-magenta2",
    bg: "bg-magenta/10",
    border: "border-magenta/45",
    chip: "border-magenta/45 bg-magenta/12 text-magenta2",
    glow: "shadow-[0_0_26px_var(--p-glow-magenta)]",
    solid: "bg-magenta text-ondark border-magenta",
    dot: "bg-magenta",
    glowClass: "glow-magenta",
  },
  aqua: {
    hex: "cyan",
    text: "text-cyan2",
    bg: "bg-cyan/10",
    border: "border-cyan/45",
    chip: "border-cyan/45 bg-cyan/12 text-cyan2",
    glow: "shadow-[0_0_26px_var(--p-glow-cyan)]",
    solid: "bg-cyan text-ondark border-cyan",
    dot: "bg-cyan",
    glowClass: "glow-cyan",
  },
  gold: {
    hex: "amber",
    text: "text-amber2",
    bg: "bg-amber/10",
    border: "border-amber/45",
    chip: "border-amber/45 bg-amber/12 text-amber2",
    glow: "shadow-[0_0_26px_var(--p-glow-amber)]",
    solid: "bg-amber text-ondark border-amber",
    dot: "bg-amber",
    glowClass: "glow-amber",
  },
  violet: {
    hex: "violet",
    text: "text-violet2",
    bg: "bg-violet/10",
    border: "border-violet/45",
    chip: "border-violet/45 bg-violet/12 text-violet2",
    glow: "shadow-[0_0_26px_var(--p-glow-violet)]",
    solid: "bg-violet text-ondark border-violet",
    dot: "bg-violet",
    glowClass: "glow-phos",
  },
  lime: {
    hex: "phos",
    text: "text-phos2",
    bg: "bg-phos/10",
    border: "border-phos/45",
    chip: "border-phos/45 bg-phos/12 text-phos2",
    glow: "shadow-[0_0_26px_var(--p-glow)]",
    solid: "bg-phos text-ondark border-phos",
    dot: "bg-phos",
    glowClass: "glow-phos",
  },
};

const BLOCKS = 18;

/** ASCII block meter: [████████░░░░░░░░░░] 44% */
export function Bar({
  percent,
  accent = "lime",
  blocks = BLOCKS,
  showValue = true,
}: {
  percent: number;
  accent?: Accent;
  blocks?: number;
  showValue?: boolean;
}) {
  const a = ACCENTS[accent];
  const pct = Math.max(0, Math.min(100, percent));
  const filled = Math.round((pct / 100) * blocks);
  return (
    <span
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="flex items-center gap-2 font-mono text-[12px] leading-none"
    >
      <span className="text-dim">[</span>
      <span className={a.text} style={{ textShadow: `0 0 8px ${a.hex}66` }}>
        {"█".repeat(filled)}
      </span>
      <span className="text-dim3">{"░".repeat(Math.max(0, blocks - filled))}</span>
      <span className="text-dim">]</span>
      {showValue ? <span className="text-dim">{String(Math.round(pct)).padStart(3, " ")}%</span> : null}
    </span>
  );
}

export function Kicker({
  children,
  accent = "lime",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  const a = ACCENTS[accent];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${a.chip} ${className}`}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className = "",
  tone = "default",
  title,
  right,
  accent = "lime",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "raised" | "flat";
  title?: ReactNode;
  right?: ReactNode;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  const shell = tone === "flat" ? "term-flat" : "term";
  return (
    <section className={`${shell} ${tone === "raised" ? "term-hover" : ""} ${className}`}>
      {title ? (
        <div className="term-title">
          <span className={a.text}>▮</span>
          <span className="truncate font-bold">{title}</span>
          {right ? <span className="ml-auto shrink-0 normal-case tracking-normal text-dim">{right}</span> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border border-phos/25 bg-phos/6 px-2 py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-dim ${className}`}
    >
      {children}
    </span>
  );
}

/** Rotated dashed seal — used for level/clearance stamps. */
export function Stamp({
  children,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "sm" ? "h-14 w-14 text-[9px]" : size === "lg" ? "h-28 w-28 text-[10px]" : "h-20 w-20 text-[9px]";
  return (
    <span
      className={`inline-grid -rotate-6 place-items-center rounded-[3px] border-2 border-dashed px-2 py-2 text-center font-mono font-bold uppercase leading-tight tracking-[0.1em] ${dims} ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  kicker,
  title,
  sub,
  accent = "lime",
  id,
  number,
}: {
  kicker?: string;
  title: ReactNode;
  sub?: string;
  accent?: Accent;
  id?: string;
  number?: string;
}) {
  const a = ACCENTS[accent];
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em]">
        <span className={a.text}>┌─[</span>
        {number ? <span className="text-dim">{number}</span> : null}
        {number && kicker ? <span className="text-dim3">·</span> : null}
        {kicker ? <span className={a.text}>{kicker}</span> : null}
        <span className={a.text}>]</span>
        <span className="h-px flex-1 border-t border-dashed border-phos/25" />
        <span className="text-dim3">─┐</span>
      </div>
      <h2 className={`font-display mt-3 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.02] text-ink ${a.glowClass}`}>
        {title}
      </h2>
      {sub ? <p className="mt-3 max-w-3xl text-[13.5px] leading-relaxed text-dim">{sub}</p> : null}
    </div>
  );
}

export function Callout({
  emoji,
  title,
  children,
  accent = "gold",
}: {
  emoji: string;
  title: string;
  children: ReactNode;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className={`rounded-[3px] border-l-2 ${a.border} ${a.bg} px-4 py-3`}>
      <p className={`font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${a.text}`}>
        {emoji} {title}
      </p>
      <div className="mt-1.5 text-[13px] leading-relaxed text-body">{children}</div>
    </div>
  );
}

export function Stat({
  value,
  label,
  emoji,
  accent = "lime",
}: {
  value: string | number;
  label: string;
  emoji?: string;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="term term-hover px-4 py-3">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
        {emoji ? <span className="mr-1">{emoji}</span> : null}
        {label}
      </p>
      <p className={`font-display mt-1 text-[30px] leading-none ${a.text} ${a.glowClass}`}>{value}</p>
    </div>
  );
}

export function SimpleTable({
  head,
  rows,
  firstColBold = true,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  firstColBold?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-[3px] border border-phos/22">
      <table className="w-full border-collapse text-left font-mono text-[12.5px]">
        <thead>
          <tr className="bg-phos/8">
            {head.map((h, i) => (
              <th
                key={i}
                className="border-b border-dashed border-phos/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-phos2"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-dashed border-phos/12 align-top transition-colors last:border-0 hover:bg-phos/6"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2.5 leading-relaxed ${
                    ci === 0 && firstColBold ? "font-bold text-ink" : "text-dim"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
  accent = "lime",
}: {
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`btn-term group flex w-full items-start gap-3 rounded-[3px] border px-3.5 py-2.5 text-left ${
        checked ? `${a.border} ${a.bg}` : "border-phos/18 bg-screen/70 hover:border-phos/45"
      }`}
    >
      <span
        className={`mt-[1px] shrink-0 font-mono text-[14px] font-bold leading-none ${checked ? a.text : "text-dim3"}`}
        style={checked ? { textShadow: `0 0 10px ${a.hex}88` } : undefined}
      >
        {checked ? "[x]" : "[ ]"}
      </span>
      <span
        className={`text-[13px] leading-relaxed ${
          checked ? "text-ink line-through decoration-phos/40" : "text-body"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function FieldNote({
  n,
  title,
  children,
  accent = "violet",
}: {
  n?: string;
  title: string;
  children: ReactNode;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="term-flat px-3.5 py-3">
      <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
        <span className={a.text}>{n ? `${n}>` : ">"}</span>
        <span className="text-ink">{title}</span>
      </p>
      <div className="mt-1.5 text-[12.5px] leading-relaxed text-dim">{children}</div>
    </div>
  );
}

/** A single shell line: `~/gitquest$ command` */
export function TermLine({
  cmd,
  path = "~/gitquest",
  children,
  accent = "lime",
  className = "",
}: {
  cmd?: string;
  path?: string;
  children?: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  const a = ACCENTS[accent];
  return (
    <div className={`font-mono text-[12.5px] leading-relaxed ${className}`}>
      {cmd ? (
        <p>
          <span className="text-dim">{path}</span>
          <span className={a.text}>$</span> <span className="text-ink">{cmd}</span>
        </p>
      ) : null}
      {children ? <div className="mt-0.5 text-dim">{children}</div> : null}
    </div>
  );
}
