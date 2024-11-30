import { style, vars } from "~/styles.css";

export const root = style({
  margin: "0 auto",
  width: "100%",
});

export const copyright = style({
  fontSize: vars.font.size["1x"],
  fontFamily: vars.font.family.systemUI,
  color: vars.color.text.gray,
});
