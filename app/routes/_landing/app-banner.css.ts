import { style, vars } from "~/styles.css";

export const root = style({
  background:
    "url(/images/patterns_01.png) top -250px right 0 no-repeat, linear-gradient(180deg, #7E94CE 0%, #13D5E7 48.96%, #13D5E7 81.25%, #F0F7D8 100%)",
  color: vars.color.text.white,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "63px",
  width: "100%",
  gridArea: "banner",
});
