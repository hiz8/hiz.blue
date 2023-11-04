import { style, vars, responsiveStyle } from "~/styles.css";

export const headline = style([
  {
    fontSize: "24px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: vars.space["1x"],
    margin: `0 auto ${vars.space["4x"]}`,
    boxSizing: "border-box",
  },
  responsiveStyle({
    md: {
      width: "100%",
      margin: `0 auto ${vars.space["6x"]}`,
    },
  }),
]);