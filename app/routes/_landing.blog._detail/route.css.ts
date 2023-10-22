import { style, vars, globalStyle } from "~/styles.css";

export const root = style({});

globalStyle(`${root} h1`, {
  fontSize: 24,
  fontWeight: 500,
});

globalStyle(`${root} h2, ${root} h3, ${root} h4, ${root} h5, ${root} h6`, {
  fontSize: 24,
  fontWeight: 500,
  marginBlock: vars.space["2x"],
});
