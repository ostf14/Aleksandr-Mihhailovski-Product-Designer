export type GraphicItem = {
  /** Path under /public. */
  src: string;
  alt: string;
  /**
   * Columns out of the grid's six. 3 puts two to a row, 2 puts three.
   * Defaults to 2 — only the 16:9 covers need the extra width.
   */
  span?: 2 | 3;
  /** One line: what it is and who it was for. Never a case study. */
  caption: string;
  /** Where it was published — proof, not the way to see the work. */
  href?: string;
  /** Accessible name for the arrow; it carries no visible text of its own. */
  hrefLabel?: string;
};

/**
 * Loose graphic work: pieces with no story to tell, only a thing to look at.
 *
 * Anything here gets an image and one line, in the shape Cory Schmitz's
 * archive uses. It works because a caption is not a failed case study — work
 * with an actual argument behind it belongs in WORKS as a case instead.
 *
 * Grouped so the six-column grid fills whole rows: the two covers pair up,
 * then the posts and the article illustrations come in threes. That leaves
 * only the last row short, holding the two odd pieces.
 */
export const GRAPHIC_ITEMS: GraphicItem[] = [
  {
    src: "/graphic/youtube-1.webp",
    alt: "Podcast cover: two hosts at microphones over an orange and black layout",
    span: 3,
    caption:
      "Episode cover for a show on the Centre for Republican Studies channel.",
    href: "https://www.youtube.com/@repcentre/videos",
    hrefLabel: "See the channel",
  },
  {
    src: "/graphic/youtube-2.webp",
    alt: "Podcast cover: two guests over a red and yellow constructivist layout",
    span: 3,
    caption: "Interview cover for the Centre for Republican Studies channel.",
    href: "https://www.youtube.com/@repcentre/videos",
    hrefLabel: "See the channel",
  },
  {
    src: "/graphic/instagram-1.webp",
    alt: "Social post: cosmonaut in a helmet under custom Cyrillic lettering",
    caption:
      "Free typeface announcement for the founder of Uprock, the design studio and school.",
  },
  {
    src: "/graphic/instagram-2.webp",
    alt: "Social post: a red nebula under futuristic Cyrillic lettering",
    caption: "Roundup of futuristic Cyrillic typefaces.",
  },
  {
    src: "/graphic/instagram-3.webp",
    alt: "Social post: blue and black geometric shapes between two lines of Cyrillic type",
    caption: "Roundup of Cyrillic grotesques.",
  },
  {
    src: "/graphic/article-figma.webp",
    alt: "Editorial illustration: a sumo wrestler reading a book with the Figma mark on its cover",
    caption: "Illustration for an Uprock article on working faster in Figma.",
    href: "https://www.uprock.ru/articles/14-hitrostey-figma-bystree-vypolnyaem-zadachi-effektivno-peredaem-maket-razrabotchikam-i-naslazhdaemsya-rabochim-processom",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/article-marketers.webp",
    alt: "Editorial illustration for an article about marketers moving into UX",
    caption:
      "Illustration for an Uprock article on why marketers make good UX designers.",
    href: "https://www.uprock.ru/articles/pochemu-iz-marketologov-poluchayutsya-otlichnye-ux-dizaynery",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/article-pixel-fonts.webp",
    alt: "Editorial illustration for an article about pixel typefaces",
    caption:
      "Illustration for an Uprock article rounding up 20+ pixel typefaces.",
    href: "https://www.uprock.ru/articles/20-luchshih-pikselnyh-shriftov-dlya-vashih-proektov",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/robotmy-logo.webp",
    alt: "Robotmy logo",
    caption: "Logo for РОБОТМОЙ, a chain of robotic car washes.",
  },
  {
    src: "/graphic/samurai-card.webp",
    alt: "Foil card in a sealed pouch: an armoured samurai entangled with a serpent",
    caption: "Samurai and serpent — a numbered card, one of three.",
  },
];
