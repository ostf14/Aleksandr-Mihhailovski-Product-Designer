"use client";

import { useState } from "react";
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

  const linkClass = "text-stone-600 hover:text-charcoal transition-colors";

  return (
    <footer className="relative bg-cream-deep border-t border-stone-200">
      {/* Cat walking strip — sits on the top border, feet on the divider line */}
      <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none">
        <SpriteAnimation />
      </div>

      <div className="max-w-prose mx-auto px-6 md:px-10 pt-16 pb-16">
        <h2 className="font-serif font-normal text-[24px] leading-tight tracking-tight">
          Let&rsquo;s work together
        </h2>
        <p className="mt-2 text-[15px] leading-[1.55] text-stone-500 max-w-[320px]">
          I&rsquo;m looking for a product design role where I can own complex workflows
          end-to-end.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-green-500 shrink-0" />
          <span className="text-[13px] text-stone-400">Available for hire</span>
        </div>

        <ul className="mt-6 space-y-2 text-base">
          <li>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
              CV PDF
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/alexmess/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email ${EMAIL}`}
              className={`${linkClass} text-left`}
            >
              {copied ? "Copied!" : "Copy my email"}
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
