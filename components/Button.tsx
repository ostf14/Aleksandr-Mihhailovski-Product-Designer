import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Renders an <a> when given an href and a <button> otherwise. Nearly every
 * "button" on this site is really a link, and an anchor styled as a button has
 * to stay an anchor — middle-click, copy-link and open-in-new-tab all come from
 * the element, not from the styling.
 *
 * The look lives in globals.css (.btn / .btn-{sm,md} / .btn-{primary,secondary})
 * because its three transitions run on two different durations.
 */
/**
 * Written out in full rather than interpolated: these live in an
 * @layer components block, and Tailwind only keeps a layered class if it finds
 * the literal string while scanning. `btn-${size}` gets purged and the button
 * silently renders unstyled.
 */
const SIZE_CLASS: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `btn ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]}${
    className ? ` ${className}` : ""
  }`;

  if (typeof rest.href === "string") {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
