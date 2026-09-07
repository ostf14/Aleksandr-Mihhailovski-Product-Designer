export type GraphicItem = {
  /** Path under /public. */
  src: string;
  alt: string;
  /** 16:9 and 1.6:1 pieces span both columns; squares sit two to a row. */
  wide?: boolean;
  title: string;
  year: string;
  /** One line: what it is and who it was for. Never a case study. */
  caption: string;
  /** Where it was published — proof, not the way to see the work. */
  href?: string;
  hrefLabel?: string;
};

/**
 * Loose graphic work: pieces with no story to tell, only a thing to look at.
 *
 * Anything here gets an image, a name, a year and a single line — the format
 * Cory Schmitz's archive uses, and the reason it works is that a caption is
 * not a failed case study. Work with an actual argument behind it belongs in
 * WORKS as a case instead.
 *
 * Order alternates wide and square so the grid keeps a rhythm rather than
 * stacking five squares in a column.
 */
export const GRAPHIC_ITEMS: GraphicItem[] = [
  {
    src: "/graphic/youtube-1.webp",
    alt: "Podcast cover: two hosts at microphones over an orange and black layout",
    wide: true,
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
  {
    src: "/graphic/instagram-1.webp",
    alt: "Social post: cosmonaut in a helmet under custom Cyrillic lettering",
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
  {
    src: "/graphic/instagram-2.webp",
    alt: "Social post for a type release",
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
  {
    src: "/graphic/article-figma.webp",
    alt: "Editorial illustration: a sumo wrestler reading a book with the Figma mark on its cover",
    wide: true,
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
    href: undefined,
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/instagram-3.webp",
    alt: "Social post for a type release",
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
  {
    src: "/graphic/robotmy-logo.webp",
    alt: "Robotmy logo",
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
  {
    src: "/graphic/youtube-2.webp",
    alt: "Podcast cover: two guests over a red and yellow constructivist layout",
    wide: true,
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
  {
    src: "/graphic/article-marketers.webp",
    alt: "Editorial illustration for an article about marketers",
    wide: true,
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/article-pixel-fonts.webp",
    alt: "Editorial illustration for an article about pixel typefaces",
    wide: true,
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
    hrefLabel: "Read the article",
  },
  {
    src: "/graphic/pebble-nft.webp",
    alt: "Pebble the Koala — the first post, minted as an NFT",
    title: "TODO: название",
    year: "TODO",
    caption: "TODO: одна строка — что это и для кого",
  },
];
