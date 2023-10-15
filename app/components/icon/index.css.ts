import { style, styleVariants, vars } from "~/styles.css";

export const icon = style({
  lineHeight: 0,

  "::before": {
    content: "''",
    display: "inline-block",
    mask: "no-repeat center",
    maskSize: "contain",
    width: "1em",
    height: "1em",
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
  externalLink: {
    "::before": {
      maskImage: "url(./assets/external-link.svg)",
    },
  },
});
