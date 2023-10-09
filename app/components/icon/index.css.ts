import { style, styleVariants, vars } from "~/styles.css";

export const icon = style({
  "::before": {
    content: "''",
    display: "inline-block",
    mask: "no-repeat center",
    maskSize: "contain",
  },
});

export const color = styleVariants({
  none: {
    "::before": {
      backgroundColor: "currentcolor",
    },
  },
  black: {
    "::before": {
      backgroundColor: vars.color.text.black,
    },
  },
  white: {
    "::before": {
      backgroundColor: vars.color.text.white,
    },
  },
});

export const type = styleVariants({
  home: {
    "::before": {
      maskImage: "url(./assets/home.svg)",
    },
  },
  feed: {
    "::before": {
      maskImage: "url(./assets/feed.svg)",
    },
  },
  works: {
    "::before": {
      maskImage: "url(./assets/works.svg)",
    },
  },
  blog: {
    "::before": {
      maskImage: "url(./assets/blog.svg)",
    },
  },
});

export const size = styleVariants({
  small: {
    "::before": {
      width: "24px",
      height: "24px",
    },
  },
  medium: {
    "::before": {
      width: "32px",
      height: "32px",
    },
  },
  large: {
    "::before": {
      width: "48px",
      height: "48px",
    },
  },
});
