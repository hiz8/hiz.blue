import { style, vars, responsiveStyle } from "~/styles.css";

export const headline = style([
  {
    fontSize: vars.font.size["5x"],
    fontWeight: 500,
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
