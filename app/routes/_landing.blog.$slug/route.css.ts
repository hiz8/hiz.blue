import { style, vars, globalStyle } from "~/styles.css";

export const root = style({
  maxWidth: "40em",
  lineHeight: 2,
});

globalStyle(`${root} h1`, {
  fontSize: 24,
  fontWeight: 500,
});

globalStyle(`${root} h2, ${root} h3, ${root} h4, ${root} h5, ${root} h6`, {
  fontSize: 24,
  fontWeight: 500,
  marginBlock: vars.space["2x"],
});

globalStyle(`${root} p`, {
  whiteSpace: "pre-wrap",
});

export const header = style({
  display: "flex",
  flexDirection: "column-reverse",
});

export const title = style({
  margin: 0,
});

export const date = style({
  color: vars.color.text.gray,
});
