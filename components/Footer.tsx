"use client";

import { useState } from "react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "alex@example.com";

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="bg-cream-deep border-t border-stone-200">
      <div className="max-w-prose mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-10 md:gap-12">
          {/* Links */}
          <div>
            <h3 className="font-serif font-medium text-[1.25rem] tracking-tight mb-4">Links</h3>
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
                <a
                  href={`mailto:${email}`}
                  onClick={copyEmail}
                  className="text-stone-600 hover:text-charcoal transition-colors"
                >
                  {copied ? "Email copied" : "Email"}
                </a>
              </li>
              <li>
                <a href="#" className="text-stone-600 hover:text-charcoal transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Spotify */}
          <div className="w-full md:max-w-[280px]">
            <h3 className="font-serif italic text-[1.25rem] tracking-tight mb-4">Soundtrack</h3>
            <iframe
              src="https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?theme=0"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              style={{ borderRadius: 12 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
