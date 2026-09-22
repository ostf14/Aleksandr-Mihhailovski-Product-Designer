"use client";

import { useEffect } from "react";

/** Once the beacon's script has been fetched, time for it to send. */
const GRACE_MS = 200;
/** Never hold the visitor longer than this, whatever happens. */
const MAX_WAIT_MS = 2000;
/** How often to look for the script. */
const POLL_MS = 50;

const SCRIPT = "/_vercel/insights/script";

/**
 * Leaves for `href` once the page view has had its chance to be recorded.
 *
 * This waits on a fact rather than on a clock. The first version waited a flat
 * 900ms, which is plenty on a laptop and not nearly enough on a phone:
 * measured at 400kbit with the CPU slowed six times, the analytics script had
 * not even been added to the DOM by then, so the tab left before anything was
 * counted and the whole page was pointless exactly where it mattered. <Analytics/>
 * injects that script after hydration, so how long it takes is whatever
 * hydration takes on that device.
 *
 * So: poll until the browser has a resource timing entry for the script, which
 * means the fetch finished — a 404 counts, and that is the normal answer until
 * Web Analytics is switched on for the project, in which case there is nothing
 * to wait for. Then a short grace, because the script sends the page view as
 * soon as it runs and that request survives the unload on its own.
 *
 * MAX_WAIT_MS is the floor under all of it: a blocked script, a browser with no
 * resource timing, anything unforeseen. Nobody is held longer.
 *
 * And it does bite, on the worst devices. <Analytics/> cannot inject anything
 * until React has hydrated, and at 400kbit with the CPU slowed six times that
 * took 3.9 seconds — the cap fires first and the click goes uncounted. That is
 * the deliberate trade and it is the right way round: a lost data point costs
 * nothing, holding someone's CV for four seconds to collect it costs them. On
 * anything ordinary this leaves after about 900ms; measured on a laptop, the
 * script was requested at 303ms and the tab left at 925ms.
 *
 * `replace`, not `href`. With `href` this page stays in the history, so Back
 * from the destination lands here and is thrown forward again, and the visitor
 * cannot get out except by holding the button down.
 */
export function Bounce({ href }: { href: string }) {
  useEffect(() => {
    let left = false;
    let poll = 0;

    const go = () => {
      if (left) return;
      left = true;
      window.location.replace(href);
    };

    const cap = window.setTimeout(go, MAX_WAIT_MS);

    const fetched = () =>
      performance
        .getEntriesByType("resource")
        .some((e) => e.name.includes(SCRIPT));

    const watch = () => {
      if (left) return;
      if (fetched()) window.setTimeout(go, GRACE_MS);
      else poll = window.setTimeout(watch, POLL_MS);
    };
    watch();

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(poll);
    };
  }, [href]);

  return null;
}
