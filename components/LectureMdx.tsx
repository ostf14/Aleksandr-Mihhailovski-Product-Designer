import React from "react";
import type { MDXComponents } from "mdx/types";
import { slugifyHeading } from "@/lib/toc";

/** Flattens MDX children down to plain text so a heading can derive its id. */
function nodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React.isValidElement(node)) {
    return nodeText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}


/**
 * MDX element map for lecture bodies.
 *
 * Everything is Satoshi now, like the rest of the site. Reading text simply
 * inherits it from <body> instead of naming a family per element — the
 * previous Newsreader pass was the last antiqua left after the grotesque
 * switch. Newsreader itself stays registered in the layout: the ReMargin
 * design-system showcase documents that project's own type and still needs it.
 * Everything resolves to existing tokens; no new colours or sizes here.
 */
export const lectureMdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const text = nodeText(children);
    return (
      <h2
        id={slugifyHeading(text)}
        className="scroll-mt-28 font-sans font-semibold text-[1.75rem] md:text-[2rem] leading-[1.2] tracking-tight text-fg mt-14 mb-4 first:mt-0"
      >
        {children}
      </h2>
    );
  },

  h3: ({ children }) => {
    const text = nodeText(children);
    return (
      <h3
        id={slugifyHeading(text)}
        className="scroll-mt-28 font-sans font-semibold text-[1.375rem] md:text-[1.5rem] leading-[1.25] tracking-tight text-fg mt-10 mb-3"
      >
        {children}
      </h3>
    );
  },

  p: ({ children }) => (
    <p
      className="text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-fg/90 mb-6"
    >
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul
      className="mb-6 space-y-2 list-disc pl-6 marker:text-faint text-[1.0625rem] md:text-[1.125rem] leading-[1.7] text-fg/90"
    >
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol
      className="mb-6 space-y-2 list-decimal pl-6 marker:text-faint marker:font-mono marker:text-[0.9em] text-[1.0625rem] md:text-[1.125rem] leading-[1.7] text-fg/90"
    >
      {children}
    </ol>
  ),

  li: ({ children }) => <li className="pl-1.5">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote
      className="my-8 border-l-2 border-accent pl-5 italic text-fg/80 [&>p]:mb-3 [&>p:last-child]:mb-0"
    >
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-12 border-0 border-t border-line" />,

  code: ({ children }) => (
    <code className="font-mono text-[0.85em] bg-surface rounded px-1.5 py-0.5 text-fg">
      {children}
    </code>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),

  // Wide tables scroll inside their own box rather than widening the column.
  table: ({ children }) => (
    <div className="my-8 -mx-6 md:mx-0 px-6 md:px-0 overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left">
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th className="border-b border-line-strong pb-2 pr-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg/70 align-bottom">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td
      className="border-b border-line py-3 pr-4 text-[0.95rem] leading-[1.6] text-fg/90 align-top"
    >
      {children}
    </td>
  ),
};
