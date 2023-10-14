import { style, vars, responsiveStyle } from "~/styles.css";

export const root = style({
  position: "relative",
});

export const headline = style([
  {
    fontSize: "24px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: vars.space["1x"],
    margin: `0 auto ${vars.space["4x"]}`,
    boxSizing: "border-box",
  },
  responsiveStyle({
    md: {
      width: "100%",
      margin: `0 auto ${vars.space["6x"]}`,
    },
  }),
]);

export const feedItems = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4x"],
  padding: "0",
});

export const feedItem = style({
  display: "flex",
  gap: vars.space["3x"],
  height: "45px",
});

export const feedItemLink = style({
  textDecoration: "none",
  color: "inherit",
});

export const feedItemImage = style({
  width: "45px",
  height: "45px",
  flexShrink: 0,

  ":empty": {
    backgroundColor: vars.color.component.border,
  },
});

export const feedItemContents = style({
  height: "45px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const feedItemTitle = style({
  fontSize: "18px",
  fontWeight: 500,
  margin: 0,
});

export const feedItemMeta = style({
  display: "flex",
  justifyContent: "space-between",
});

export const feedItemDomain = style({
  fontSize: "12px",
  margin: 0,
  color: vars.color.text.gray,
});

export const feedItemCategory = style({
  fontSize: "12px",
  color: vars.color.text.black,
  margin: 0,
  padding: "0.125em 0.5em",
  backgroundColor: vars.color.component.border,
  display: "inline-block",
});
