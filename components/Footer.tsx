"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { SpriteAnimation } from "./SpriteAnimation";

const EMAIL = "aleksandr@example.com";

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

  return (
    <footer className="bg-cream-deep border-t border-stone-200">
      <div className="max-w-prose mx-auto px-6 md:px-10 pt-16 pb-10">
        <h3 className="font-serif font-medium text-[1.25rem] tracking-tight mb-1">Links</h3>
        <p className="text-[13px] text-stone-400 mb-4">Product Designer · Kraków, Poland</p>
        <ul className="space-y-2 text-base">
          <li>
            <a
              href="https://www.linkedin.com/in/alexmess/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-charcoal transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" className="text-stone-600 hover:text-charcoal transition-colors">
              Resume
            </a>
          </li>
          <li className="pt-2">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email ${EMAIL}`}
              className="inline-flex items-center gap-2 bg-cream-warm border border-stone-200 rounded-lg px-4 py-2.5 text-[13px] text-charcoal hover:border-terracotta transition-colors"
            >
              <Mail size={14} strokeWidth={1.75} className="text-stone-500" aria-hidden />
              <span>{EMAIL}</span>
              {copied ? (
                <Check size={14} strokeWidth={2} className="text-terracotta" aria-hidden />
              ) : (
                <Copy size={14} strokeWidth={1.75} className="text-stone-400" aria-hidden />
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Cat walking strip — full viewport width */}
      <SpriteAnimation />

      {/* HR divider — full width, stronger color */}
      <hr className="border-0 border-t border-[#d6d3d1] dark:border-[#44403c] m-0" />

      {/* Copyright */}
      <div className="max-w-prose mx-auto px-6 md:px-10 pt-4 pb-12">
        <p className="text-center text-xs text-stone-400">© 2025 Aleksandr Mihhailovski</p>
      </div>
    </footer>
  );
}
