import { style, vars, responsiveStyle } from "~/styles.css";

export const root = style([
  {
    display: "flex",
    gap: vars.space["3x"],
    borderBottom: `1px solid ${vars.color.component.border}`,
    paddingBottom: vars.space["4x"],
    selectors: {
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
  responsiveStyle({
    md: {
      gap: vars.space["3x"],
    },
  }),
]);

export const imageWrapper = style([
  {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    overflow: "hidden",
    boxSizing: "border-box",

    ":empty": {
      backgroundColor: vars.color.component.border,
    },
  },
  responsiveStyle({
    md: {
      width: "40px",
      height: "40px",
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
  fontSize: vars.font.size["5x"],
});

export const description = style({
  fontSize: vars.font.size["2x"],
  color: vars.color.text.gray,
});

export const url = style({});

export const urlLink = style({
  fontSize: vars.font.size["2x"],
  color: vars.color.text.black,

  ":any-link": {
    color: "#0ea5e9",
  },
});
