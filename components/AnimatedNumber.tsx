"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  duration?: number;
};

function parseSegments(value: string) {
  const regex = /(\d+(?:\.\d+)?)/g;
  const parts: { text: string; isNumber: boolean }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(value))) {
    if (match.index > lastIndex) {
      parts.push({ text: value.slice(lastIndex, match.index), isNumber: false });
    }
    parts.push({ text: match[0], isNumber: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < value.length) {
    parts.push({ text: value.slice(lastIndex), isNumber: false });
  }
  return parts;
}

export function AnimatedNumber({ value, duration = 1.4 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const segments = parseSegments(value);

  // Progressive enhancement: server-rendered markup must contain the FINAL
  // values (progress = 1) so scrapers and JS-disabled clients see real
  // numbers. JS resets to 0 and counts up only once the element scrolls
  // into view.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let frame: number;
    const step = (t: number) => {
      const elapsed = (t - start) / 1000;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    setProgress(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {segments.map((seg, i) => {
        if (!seg.isNumber) return <span key={i}>{seg.text}</span>;
        const target = parseFloat(seg.text);
        const hasDecimal = seg.text.includes(".");
        const current = target * progress;
        const display = hasDecimal ? current.toFixed(2) : Math.round(current).toString();
        return <span key={i}>{display}</span>;
      })}
    </span>
  );
}
