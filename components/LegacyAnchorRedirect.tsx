"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LEGACY_ANCHORS = new Set(["#cases", "#other"]);

/**
 * Forwards the two anchors the portfolio used to live under on "/" to their
 * new home on /work.
 *
 * This cannot be a next.config redirect: browsers never send the fragment to
 * the server, so /#cases arrives as a plain request for "/" and there is
 * nothing for a server rule to match on. Reading location.hash on mount is
 * the only place the anchor is observable.
 */
export function LegacyAnchorRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (LEGACY_ANCHORS.has(hash)) {
      router.replace(`/work${hash}`);
    }
  }, [router]);

  return null;
}
