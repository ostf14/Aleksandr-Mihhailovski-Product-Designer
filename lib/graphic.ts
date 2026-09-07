export type GraphicItem = {
  /** Path under /public. */
  src: string;
  alt: string;
  /**
   * Landscape pieces take three of the grid's six columns (two to a row);
   * squares take two (three to a row).
   */
  wide?: boolean;
  /**
   * Optional: a social post is not a named piece of work, and inventing a
   * title for one only adds a line nobody needs. The caption carries it.
   */
  title?: string;
  /** One line: what it is and who it was for. Never a case study. */
  caption: string;
  /** Where it was published — proof, not the way to see the work. */
  href?: string;
  hrefLabel?: string;
};

/**
 * Loose graphic work: pieces with no story to tell, only a thing to look at.
 *
 * Anything here gets an image and a single line, in the shape Cory Schmitz's
 * archive uses. It works because a caption is not a failed case study — work
 * with an actual argument behind it belongs in WORKS as a case instead.
 *
 * Ordered so the six-column grid fills whole rows: landscape pieces pair up,
 * squares come in threes. Five of each makes 25 column-units against rows of
 * six, so the last row or two are always short — that is arithmetic, not an
 * oversight, and a ragged tail is how a gallery ends anyway.
 */
export const GRAPHIC_ITEMS: GraphicItem[] = [
  {
    src: "/graphic/youtube-1.webp",
    alt: "Podcast cover: two hosts at microphones over an orange and black layout",
    wide: true,
    title: "Radio Respublika",
    caption:
      "Episode cover for a show on the Centre for Republican Studies channel.",
    href: "https://www.youtube.com/@repcentre/videos",
    hrefLabel: "See the channel",
  },
  {
    src: "/graphic/youtube-2.webp",
    alt: "Podcast cover: two guests over a red and yellow constructivist layout",
    wide: true,
    title: "Ispravlenie imyon",
    caption:
      "Interview cover for the Centre for Republican Studies channel.",
    href: "https://www.youtube.com/@repcentre/videos",
    hrefLabel: "See the channel",
  },
  {
    src: "/graphic/instagram-1.webp",
    alt: "Social post: cosmonaut in a helmet under custom Cyrillic lettering",
    caption:
      "Social post for the founder of Uprock, the design studio and school.",
    href: "https://www.instagram.com/zhenya.ninja/",
    hrefLabel: "See on Instagram",
  },
  {
    src: "/graphic/instagram-2.webp",
    alt: "Social post for a type release",
    caption:
      "Social post for the founder of Uprock, the design studio and school.",
    href: "https://www.instagram.com/zhenya.ninja/",
    hrefLabel: "See on Instagram",
  },
  {
    src: "/graphic/instagram-3.webp",
    alt: "Social post for a type release",
    caption:
      "Social post for the founder of Uprock, the design studio and school.",
    href: "https://www.instagram.com/zhenya.ninja/",
    hrefLabel: "See on Instagram",
  },
  {
    src: "/graphic/article-figma.webp",
    alt: "Editorial illustration: a sumo wrestler reading a book with the Figma mark on its cover",
    wide: true,
    title: "14 Figma tricks",
    caption:
      "Illustration for an Uprock article on working faster in Figma.",
    href: "https://www.uprock.ru/articles/14-hitrostey-figma-bystree-vypolnyaem-zadachi-effektivno-peredaem-maket-razrabotchikam-i-naslazhdaemsya-rabochim-processom",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/article-marketers.webp",
    alt: "Editorial illustration for an article about marketers moving into UX",
    wide: true,
    title: "Marketers into UX",
    caption:
      "Illustration for an Uprock article on why marketers make good UX designers.",
    href: "https://www.uprock.ru/articles/pochemu-iz-marketologov-poluchayutsya-otlichnye-ux-dizaynery",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/article-pixel-fonts.webp",
    alt: "Editorial illustration for an article about pixel typefaces",
    wide: true,
    title: "Pixel typefaces",
    caption:
      "Illustration for an Uprock article rounding up 20+ pixel typefaces.",
    href: "https://www.uprock.ru/articles/20-luchshih-pikselnyh-shriftov-dlya-vashih-proektov",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/robotmy-logo.webp",
    alt: "Robotmy logo",
    title: "Robotmy",
    caption: "Logo for Robotmy, a chain of robotic car washes.",
  },
  {
    src: "/graphic/pebble-nft.webp",
    alt: "Pebble the Koala — the first post, minted as an NFT",
    title: "Pebble the Koala",
    caption:
      "The character's first post, minted as an NFT on the TON network.",
  },
];
