import { style, vars, globalStyle } from "~/styles.css";

export const root = style({
  maxWidth: "40em",
  lineHeight: 2,
});

globalStyle(`${root} h1`, {
  fontFamily: vars.font.family.systemUI,
  fontSize: vars.font.size["6x"],
  fontWeight: 500,
});

globalStyle(`${root} h2, ${root} h3, ${root} h4, ${root} h5, ${root} h6`, {
  fontFamily: vars.font.family.systemUI,
  fontSize: vars.font.size["6x"],
  fontWeight: 500,
  marginBlock: vars.space["2x"],
});

globalStyle(`${root} p`, {
  fontFamily: vars.font.family.systemUI,
  whiteSpace: "pre-wrap",
});

export const header = style({
  display: "flex",
  flexDirection: "column-reverse",
  gap: vars.space["1x"],
  marginBlockEnd: vars.space["5x"],
});

export const title = style({
  margin: 0,
  lineHeight: 1.5,
});

export const date = style({
  color: vars.color.text.gray,
});

export const excerpt = style({
  marginBlock: vars.space["2x"],
});

export const backLinkWrapper = style({
  marginBlockEnd: vars.space["5x"],
});

export const backLink = style({
  color: "#0ea5e9",
});
