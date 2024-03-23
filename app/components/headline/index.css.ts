import { style, vars, responsiveStyle } from "~/styles.css";

export const headline = style([
  {
    fontSize: vars.font.size["5x"],
    fontFamily: vars.font.family.brand,
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    gap: vars.space["1x"],
    margin: `0 auto ${vars.space["4x"]}`,
    boxSizing: "border-box",
  },
  responsiveStyle({
    md: {
      fontSize: vars.font.size["6x"],
      width: "100%",
      margin: `0 auto ${vars.space["6x"]}`,
    },
  }),
]);
