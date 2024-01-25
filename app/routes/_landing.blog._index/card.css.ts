import { style, vars, responsiveStyle } from "~/styles.css";

export const root = style([
  {
    display: "flex",
    flexDirection: "column",
    gap: vars.space["3x"],
  },
  responsiveStyle({
    md: {
      flexDirection: "row",
      gap: vars.space["4x"],
    },
  }),
]);

export const imageWrapper = style([
  {
    width: "100%",
    height: "60px",
    overflow: "hidden",
    boxSizing: "border-box",

    ":empty": {
      backgroundColor: vars.color.component.border,
    },
  },
  responsiveStyle({
    md: {
      width: "286px",
      height: "186px",
    },
  }),
]);

export const image = style({
  width: "100%",
  height: "100%",
});

export const content = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.space["1x"],
});

export const title = style({
  fontSize: "24px",
});

export const excerpt = style({
  fontSize: "14px",
});

export const url = style({});

export const urlLink = style({
  fontSize: "14px",
  color: vars.color.text.black,
  textDecoration: "none",
  display: "block",

  ":any-link": {
    color: "inherit",
  },
});
