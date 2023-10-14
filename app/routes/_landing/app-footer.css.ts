import { style, vars, responsiveStyle } from "~/styles.css";

export const root = style({
  margin: "0 auto",
  width: `calc(100% - ${vars.space["8x"]})`,
});

export const copyright = style([
  {
    fontSize: "12px",
    color: vars.color.text.gray,
  },
  responsiveStyle({
    md: {
      textAlign: "right",
    },
  }),
]);
