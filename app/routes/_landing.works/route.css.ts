import { style, vars } from "~/styles.css";

export const root = style({
  display: "flex",
  gap: vars.space["3x"],
});

export const cardHolder = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["6x"],
});
