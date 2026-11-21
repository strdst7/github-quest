"use client";

import { useEffect, useRef, useState } from "react";

/** Types a single string, character by character, with a blinking caret. */
export function Typed({
  text,
  speed = 22,
  delay = 0,
  className = "",
  caret = true,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  caret?: boolean;
}) {
  const [out, setOut] = useState("");
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {out}
      {caret && out.length < text.length ? <span className="caret" /> : null}
    </span>
  );
}

/** A boot log that prints line by line, like a machine waking up. */
export function BootLog({
  lines,
  speed = 14,
  className = "",
}: {
  lines: { text: string; tone?: "phos" | "cyan" | "amber" | "magenta" | "violet" | "dim" }[];
  speed?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);
  const [buf, setBuf] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let line = 0;
    let char = 0;

    const tick = () => {
      if (line >= lines.length) return;
      const full = lines[line].text;
      char += 1;
      setBuf(full.slice(0, char));
      setShown(line);
      if (char >= full.length) {
        line += 1;
        char = 0;
        setBuf("");
        timers.current.push(window.setTimeout(tick, 190));
      } else {
        timers.current.push(window.setTimeout(tick, speed));
      }
    };

    timers.current.push(window.setTimeout(tick, 320));
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, [lines, speed]);

  const toneClass = (t?: string) =>
    t === "cyan"
      ? "text-cyan2"
      : t === "amber"
        ? "text-amber2"
        : t === "magenta"
          ? "text-magenta2"
          : t === "violet"
            ? "text-violet2"
            : t === "dim"
              ? "text-dim"
              : "text-phos2";

  return (
    <div className={`font-mono text-[12.5px] leading-relaxed ${className}`}>
      {lines.map((l, i) => {
        if (i < shown) {
          return (
            <p key={l.text} className={toneClass(l.tone)}>
              {l.text}
            </p>
          );
        }
        if (i === shown) {
          return (
            <p key={l.text} className={toneClass(l.tone)}>
              {buf}
              <span className="caret" />
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}
