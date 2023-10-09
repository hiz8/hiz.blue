import { style, responsiveStyle } from "~/styles.css";

export const root = style([
  {
    position: "relative",
    display: "grid",
    gridTemplateRows: "60px 1fr 50px",
    gridTemplateAreas: `
    "banner"
    "main"
    "nav"
  `,
    height: "100vh",
  },
  responsiveStyle({
    md: {
      gridTemplateRows: "auto",
      gridTemplateColumns: "60px 230px 1fr",
      gridTemplateAreas: `
      "nav banner main"
    `,
    },
  }),
]);

export const main = style({
  gridArea: "main",
});
