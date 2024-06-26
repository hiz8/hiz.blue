import { vars, style, globalFontFace, globalStyle } from "~/styles.css";

globalFontFace("inter", {
  src: "url(/fonts/Inter.woff2)",
  fontDisplay: "block",
});

globalFontFace("Noto Sans Japanese", {
  src: "url(/fonts/NotoSansCJKjp-Light.min.woff2)",
  fontDisplay: "block",
});

globalStyle("html", {
  height: "100%",
});

export const root = style({
  margin: 0,
  fontFamily: vars.font.family.sans,
  backgroundColor: vars.color.background.white,
  color: vars.color.text.black,
});
