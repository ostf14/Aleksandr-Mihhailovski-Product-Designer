import { Download } from "lucide-react";
import { Button } from "./Button";
import { outboundHref } from "@/lib/site";
import { GithubMark } from "./GithubMark";

/**
 * Download CV and GitHub — the pair the page opens on (the hero) and closes on
 * (the footer). One component so the two cannot drift: they had been two copies
 * of the same class string, and a width rule fixed in one would have stayed
 * wrong in the other.
 *
 * One width for both pills, at every size.
 *
 * Below 480 they stack and stretch to the column, which is capped at 320 so the
 * pair matches the brand pill above it rather than running edge to edge.
 *
 * From 480 they sit side by side, and the width is the WIDEST label's — Download
 * CV — not each pill's own. A flex row cannot say that: it sizes every item to
 * its content, so the pair came out 182 and 133 wide. A shrink-to-fit grid with
 * one 1fr column per item can: an fr track is sized to the largest max-content
 * contribution among its items, and every column gets that same figure. Which
 * pill is the widest is not written down anywhere, so a longer label on either
 * side still gives two equal pills.
 *
 * Where these point is decided by COUNT_OUTBOUND_CLICKS in lib/site.ts. It is
 * off, so they go straight out; on, they route through /go/* so the click is
 * counted. See the note there for why it is off.
 *
 * Icons sit on the side the eye needs them: the download glyph leads "Download
 * CV", the GitHub mark follows the word it belongs to. That mark is the filled
 * one GitHub itself draws, not the stroke redraw in GithubIcon.tsx — at 17px the
 * hairline version's tentacles and face collapse into a squiggle.
 */
export function ActionPills() {
  return (
    <div className="flex w-full max-w-[320px] flex-col items-stretch gap-3 min-[480px]:inline-grid min-[480px]:w-auto min-[480px]:max-w-none min-[480px]:auto-cols-fr min-[480px]:grid-flow-col">
      <Button
        href={outboundHref("cv")}
        size="lg"
        className="w-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download className="h-[17px] w-[17px] shrink-0" aria-hidden />
        Download CV
      </Button>
      <Button
        href={outboundHref("github")}
        size="lg"
        variant="secondary"
        className="w-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
        <GithubMark className="h-[17px] w-[17px] shrink-0" />
      </Button>
    </div>
  );
}
