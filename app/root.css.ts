import { vars, style, globalFontFace, globalStyle } from "~/styles.css";

globalFontFace("inter", {
  src: "url(/fonts/Inter.woff2)",
  fontDisplay: "block",
});

globalStyle("html", {
  height: "100%",
});

export const root = style({
  margin: 0,
  fontFamily: "inter",
  backgroundColor: vars.color.background.white,
  color: vars.color.text.black,
});
