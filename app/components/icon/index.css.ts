import { style, styleVariants, vars } from "~/styles.css";

export const icon = style({
  lineHeight: 0,

  "::before": {
    content: "''",
    display: "inline-block",
    WebkitMask: "no-repeat center",
    mask: "no-repeat center",
    WebkitMaskSize: "contain",
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
      WebkitMaskImage: "url(./assets/home.svg)",
      maskImage: "url(./assets/home.svg)",
    },
  },
  homeBold: {
    "::before": {
      WebkitMaskImage: "url(./assets/home-bold.svg)",
      maskImage: "url(./assets/home-bold.svg)",
    },
  },
  feed: {
    "::before": {
      WebkitMaskImage: "url(./assets/feed.svg)",
      maskImage: "url(./assets/feed.svg)",
    },
  },
  github: {
    "::before": {
      WebkitMaskImage: "url(./assets/github.svg)",
      maskImage: "url(./assets/github.svg)",
    },
  },
  global: {
    "::before": {
      WebkitMaskImage: "url(./assets/global.svg)",
      maskImage: "url(./assets/global.svg)",
    },
  },
  works: {
    "::before": {
      WebkitMaskImage: "url(./assets/works.svg)",
      maskImage: "url(./assets/works.svg)",
    },
  },
  worksBold: {
    "::before": {
      WebkitMaskImage: "url(./assets/works-bold.svg)",
      maskImage: "url(./assets/works-bold.svg)",
    },
  },
  blog: {
    "::before": {
      WebkitMaskImage: "url(./assets/blog.svg)",
      maskImage: "url(./assets/blog.svg)",
    },
  },
  blogBold: {
    "::before": {
      WebkitMaskImage: "url(./assets/blog-bold.svg)",
      maskImage: "url(./assets/blog-bold.svg)",
    },
  },
  externalLink: {
    "::before": {
      WebkitMaskImage: "url(./assets/external-link.svg)",
      maskImage: "url(./assets/external-link.svg)",
    },
  },
});
