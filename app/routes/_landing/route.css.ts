import { style } from "~/styles.css";

export const root = style({
  position: "relative",
  display: "grid",
  gridTemplateRows: "60px 1fr 50px",
  gridTemplateAreas: `
    "banner"
    "main"
    "nav"
  `,
  height: "100vh",
});

export const main = style({
  gridArea: "main",
});
