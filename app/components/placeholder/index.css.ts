import { style, keyframes, globalStyle } from "~/styles.css";

const placeholderShimmer = keyframes({
  "0%": {
    backgroundPosition: "-1200px 0",
  },
  "100%": {
    backgroundPosition: "1200px 0",
  },
});

export const placeholder = style({
  position: "static",
  overflow: "hidden",
  animationName: placeholderShimmer,
  animationDuration: "2s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  backgroundColor: "#fff",
  backgroundImage:
    "linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%)",
  backgroundSize: "1200px 100%",
  maxWidth: "30rem",

  get selectors() {
    return {
      [`${placeholder} + &`]: {
        marginTop: "2rem",
        animationDelay: "0.15s",
      },
      [`${placeholder} + ${placeholder} + &`]: {
        animationDelay: "0.3s",
      },
      [`${placeholder} + ${placeholder} + ${placeholder} + &`]: {
        animationDelay: "0.45s",
      },
      [`${placeholder} + ${placeholder} + ${placeholder} + ${placeholder} + &`]:
        {
          animationDelay: "0.6s",
        },
    };
  },
});

export const placeholderLine = style({
  position: "relative",
  height: "0.85714286em",
  // marginTop: "0.5em",
  marginBottom: "0.5em",
  backgroundColor: "#fff",

  "::before": {
    top: "100%",
    position: "absolute",
    content: "''",
    backgroundColor: "inherit",
    left: 0,
    height: "0.5em",
  },
  "::after": {
    top: "100%",
    position: "absolute",
    content: "''",
    backgroundColor: "inherit",
    right: 0,
    height: "0.5em",
  },
  selectors: {
    "&:not(:first-child)": {
      marginTop: "0.5em",
    },
    "&:nth-child(1)::after": {
      width: "0%",
    },
    "&:nth-child(2)::after": {
      width: "50%",
    },
    "&:nth-child(3)::after": {
      width: "10%",
    },
    "&:nth-child(4)::after": {
      width: "35%",
    },
    "&:nth-child(5)::after": {
      width: "65%",
    },
  },
});

export const placeholderImage = style({
  "::after": {
    backgroundColor: "#fff",
  },
});

export const placeholderHeader = style({
  position: "relative",
  overflow: "hidden",
});

globalStyle(`${placeholderImage}:not(${placeholderHeader})`, {
  height: "100px",
});

globalStyle(`${placeholderImage}:not(${placeholderHeader}).square`, {
  height: 0,
  overflow: "hidden",
  paddingTop: "100%",
});

globalStyle(`${placeholderImage}:not(${placeholderHeader}).rectangular`, {
  height: 0,
  overflow: "hidden",
  paddingTop: "75%",
});

globalStyle(`${placeholderImage}.${placeholderHeader}::after`, {
  display: "block",
  height: "0.85714286em",
  content: "''",
  marginLeft: "3em",
});

/* Image Header */
globalStyle(`${placeholderImage}.${placeholderHeader} ${placeholderLine}`, {
  marginLeft: "3em",
});

globalStyle(
  `${placeholderImage}.${placeholderHeader} ${placeholderLine}::before`,
  {
    width: "0.71428571rem",
  },
);

/* Spacing */
globalStyle(
  `${placeholderImage} ${placeholderLine}:first-child, ${placeholderHeader} ${placeholderLine}:first-child`,
  {
    height: "0.01px",
  },
);

globalStyle(
  `${placeholderImage}:not(:first-child)::before, ${placeholderHeader}:not(:first-child)::before`,
  {
    height: "1.42857143em",
    content: "''",
    display: "block",
  },
);

globalStyle(`${placeholderHeader} ${placeholderLine}`, {
  marginBottom: "0.64285714em",
});

globalStyle(
  `${placeholderHeader} ${placeholderLine}::before, ${placeholderHeader} ${placeholderLine}::after`,
  {
    height: "0.64285714em",
  },
);

globalStyle(`${placeholderHeader} ${placeholderLine}:not(:first-child)`, {
  marginTop: "0.64285714em",
});

globalStyle(`${placeholderHeader} ${placeholderLine}::after`, {
  width: "20%",
});

globalStyle(`${placeholderHeader} ${placeholderLine}:nth-child(2)::after`, {
  width: "60%",
});
