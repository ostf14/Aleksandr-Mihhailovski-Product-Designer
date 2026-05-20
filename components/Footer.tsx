"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SpriteAnimation } from "./SpriteAnimation";

const EMAIL = "ostf14@gmail.com";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, amount: 0.1 });

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
    "text-[18px] text-stone-500 hover:text-terracotta transition-colors inline-flex items-center gap-1.5";

  return (
    <footer
      ref={footerRef}
      className="relative bg-cream-deep border-t border-stone-200"
    >
      {/* Cat walking strip — sits on the top border, feet on the divider line.
          Stays outside the overflow-hidden content wrapper so it isn't clipped. */}
      <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none">
        <SpriteAnimation />
      </div>

      {/* Content reveal: clipped at top edge, slides up into view */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: 60 }}
          animate={inView ? { y: 0 } : { y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-prose mx-auto px-6 md:px-10 pt-16 pb-32"
        >
          <h2 className="font-serif font-normal text-[40px] leading-tight tracking-tight mb-4">
            Let&rsquo;s work together
          </h2>

          <div className="flex flex-row flex-wrap gap-5">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email ${EMAIL}`}
              className={linkClass}
            >
              <span>Email</span>
              {copied ? (
                <Check size={16} strokeWidth={2} className="text-terracotta" aria-hidden />
              ) : (
                <Copy size={16} strokeWidth={1.75} className="text-stone-400" aria-hidden />
              )}
            </button>
            <a
              href="https://www.linkedin.com/in/alexmess/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={16} strokeWidth={1.75} className="text-stone-400" aria-hidden />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={linkClass}>
              <span>CV PDF</span>
              <ArrowUpRight size={16} strokeWidth={1.75} className="text-stone-400" aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
