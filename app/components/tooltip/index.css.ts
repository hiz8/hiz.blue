import { style, createVar, globalStyle, keyframes } from "~/styles.css";

const origin = createVar();

const slide = keyframes({
  from: {
    transform: `var(${origin})`,
    opacity: 0,
  },
  to: {
    transform: "translateY(0)",
    opacity: 1,
  },
});

export const root = style({
  boxShadow: "0 8px 20px rgba(0 0 0 / 0.1)",
  borderRadius: "4px",
  backgroundColor: "#545ca6",
  color: "white",
  outline: "none",
  padding: "2px 8px",
  maxWidth: "150px",

  selectors: {
    "&[data-placement='top']": {
      marginBottom: "8px",
      vars: {
        [origin]: "translateY(4px)",
      },
    },
    "&[data-placement='bottom']": {
      marginTop: "8px",
      vars: {
        [origin]: "translateY(-4px)",
      },
    },
    "&[data-placement='right']": {
      marginLeft: "8px",
      vars: {
        [origin]: "translateX(-4px)",
      },
    },
    "&[data-placement='left']": {
      marginRight: "8px",
      vars: {
        [origin]: "translateX(4px)",
      },
    },
    "&[data-entering='true']": {
      animation: `${slide} 200ms`,
    },
    "&[data-exiting='true']": {
      animation: `${slide} 200ms reverse ease-in`,
    },
  },
});

globalStyle(`${root} .react-aria-OverlayArrow svg`, {
  display: "block",
  fill: "slateblue",
});

globalStyle(`${root}:[data-placement='bottom'] .react-aria-OverlayArrow svg`, {
  transform: "rotate(180deg)",
});

globalStyle(`${root}:[data-placement='right'] .react-aria-OverlayArrow svg`, {
  transform: "rotate(90deg)",
});

globalStyle(`${root}:[data-placement='left'] .react-aria-OverlayArrow svg`, {
  transform: "rotate(-90deg)",
});
