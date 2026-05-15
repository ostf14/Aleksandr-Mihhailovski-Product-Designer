"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SpriteAnimation } from "./SpriteAnimation";

const EMAIL = "ostf14@gmail.com";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const linkClass =
    "text-[14px] text-stone-500 hover:text-terracotta transition-colors";

  return (
    <footer className="relative bg-cream-deep border-t border-stone-200">
      {/* Cat walking strip — sits on the top border, feet on the divider line */}
      <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none">
        <SpriteAnimation />
      </div>

      <div className="max-w-prose mx-auto px-6 md:px-10 pt-16 pb-16">
        <h2 className="font-serif font-normal text-[24px] leading-tight tracking-tight mb-4">
          Let&rsquo;s work together
        </h2>

        <div className="flex flex-row flex-wrap gap-5">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy email ${EMAIL}`}
            className={`${linkClass} inline-flex items-center gap-1.5`}
          >
            <span>Email</span>
            {copied ? (
              <Check size={13} strokeWidth={2} className="text-terracotta" aria-hidden />
            ) : (
              <Copy size={13} strokeWidth={1.75} className="text-stone-400" aria-hidden />
            )}
          </button>
          <a
            href="https://www.linkedin.com/in/alexmess/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn ↗
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={linkClass}>
            CV PDF ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
