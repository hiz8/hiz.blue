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

export const content = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.space["1x"],
});

export const title = style({
  fontSize: vars.font.size["6x"],
  fontWeight: 400,
  margin: 0,
});

export const date = style({
  color: vars.color.text.gray,
  fontFamily: vars.font.family.systemUI,
});

export const excerpt = style({
  fontSize: vars.font.size["2x"],
  color: vars.color.text.gray,
  margin: 0,
});

export const url = style({});

export const urlLink = style({
  fontSize: vars.font.size["2x"],
  color: vars.color.text.black,
  textDecoration: "none",
  display: "block",

  ":any-link": {
    color: "inherit",
  },
});
