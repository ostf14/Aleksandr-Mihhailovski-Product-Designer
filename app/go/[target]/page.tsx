import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { OUTBOUND, type OutboundKey } from "@/lib/site";
import { Bounce } from "./Bounce";

/** Both keys are known at build time, and nothing else is a valid target. */
export function generateStaticParams() {
  return Object.keys(OUTBOUND).map((target) => ({ target }));
}
export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { target: string };
}): Metadata {
  const dest = OUTBOUND[params.target as OutboundKey];
  return {
    title: dest ? `Opening ${dest.label}` : "Opening",
    // A page whose whole job is to leave has no business in an index.
    robots: { index: false, follow: false },
  };
}

export default function Page({ params }: { params: { target: string } }) {
  const dest = OUTBOUND[params.target as OutboundKey];
  if (!dest) notFound();

  return (
    <main className="flex min-h-svh items-center">
      <div className="shell text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-faint">
          {dest.where}
        </p>
        <h1 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-fg md:text-3xl">
          Opening {dest.label}…
        </h1>
        <a
          href={dest.href}
          className="mt-5 inline-flex items-center gap-1.5 font-sans text-[15px] text-accent transition-opacity hover:opacity-70"
        >
          Go now
          <ArrowUpRight size={15} strokeWidth={2} aria-hidden />
        </a>
      </div>

      <Bounce href={dest.href} />
    </main>
  );
}
