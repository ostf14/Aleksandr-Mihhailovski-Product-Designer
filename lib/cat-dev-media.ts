/**
 * The Don't Tread On Cat build footage, in the order it was shot.
 *
 * It belongs to two pages at once. /case/multi-agent-workflow uses it to show
 * what the agent loop actually produced, and /case/dont-tread-on-cat uses it
 * to show how the game is being made — the same frames answering two different
 * questions, which is a reason to share them rather than to pick one page.
 *
 * So the list lives here and neither page owns it. Copying it into both was
 * the alternative and it is the failure this repository keeps running into: a
 * caption gets fixed in one copy, and the other one keeps the typo for a year.
 *
 * `shared` marks the frames that read on their own, away from the workflow
 * they came out of. The three without it are arguments rather than footage —
 * a plain runtime view, and the two Unreal stills that only mean anything next
 * to the sentence about compile times — so they stay on the workflow case,
 * which is the page making that argument.
 *
 * Files stay under /cases/multi-agent-workflow/ whatever happens here. They
 * are in circulation at those paths and moving them would buy a tidier folder
 * at the price of every link that already points at one.
 */
export type DevMedia = {
  src: string;
  /** Doubles as the img alt. */
  label: string;
  caption: string;
  /** Also shown on the game's own page. */
  shared?: boolean;
};

export const CAT_DEV_MEDIA: DevMedia[] = [
  {
    src: "/cases/multi-agent-workflow/demo-1.gif",
    label: "Side-by-side: code in Windsurf, runtime in Unity",
    caption: "Side-by-side: code in Windsurf, runtime in Unity.",
    shared: true,
  },
  {
    src: "/cases/multi-agent-workflow/demo-2.gif",
    label: "Gameplay prototype",
    caption: "Gameplay prototype.",
  },
  {
    src: "/cases/multi-agent-workflow/unity-editor.png",
    label: "Unity editor showing the running state machine",
    caption: "Unity editor: state machine running.",
    shared: true,
  },
  {
    src: "/cases/multi-agent-workflow/demo-3.gif",
    label: "Iteration cycle in the editor",
    caption: "Early prototype.",
    shared: true,
  },
  {
    src: "/cases/multi-agent-workflow/screenshot-1.jpg",
    label: "Runtime view of the prototype",
    caption: "Runtime view.",
  },
  {
    src: "/cases/multi-agent-workflow/blueprint.png",
    label: "Unreal Blueprint architecture from the earlier attempt",
    caption:
      "Before convenient code-first with Windsurf, the early version sat on these heavy Unreal Blueprints.",
    shared: true,
  },
  {
    src: "/cases/multi-agent-workflow/blueprint-runtime.png",
    label: "Unreal compile times that killed iteration speed",
    caption:
      "Why Unreal didn’t work: 10-min compile times killed iteration loops.",
  },
  {
    src: "/cases/multi-agent-workflow/discord.png",
    label: "Sharing progress with the dev community",
    caption: "Sharing progress with the dev community.",
    shared: true,
  },
];

/** The five that also run on the game's own page, in the same order. */
export const CAT_DEV_MEDIA_SHARED = CAT_DEV_MEDIA.filter((m) => m.shared);
