import { style, vars, responsiveStyle } from "~/styles.css";

export const root = style({
  position: "relative",
});

export const feedItemsEmpty = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: vars.color.text.gray,
});

export const feedItems = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5x"],
  padding: "0",
});

export const feedItem = style({
  display: "flex",
  gap: vars.space["3x"],
  minHeight: "45px",
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
  minHeight: "45px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const feedItemTitle = style([
  {
    fontSize: vars.font.size["4x"],
    fontWeight: 400,
    lineHeight: 1.2,
    margin: 0,
  },
  responsiveStyle({
    md: {
      fontSize: vars.font.size["6x"],
    },
  }),
]);

export const feedItemMeta = style({
  display: "flex",
  justifyContent: "space-between",
});

export const feedItemDomain = style({
  fontSize: vars.font.size["1x"],
  fontFamily: vars.font.family.systemUI,
  margin: 0,
  color: vars.color.text.gray,
});

export const feedItemCategory = style({
  fontSize: vars.font.size["1x"],
  fontFamily: vars.font.family.systemUI,
  color: vars.color.text.black,
  margin: 0,
  padding: "0.125em 0.5em",
  backgroundColor: vars.color.component.border,
  display: "inline-block",
});
