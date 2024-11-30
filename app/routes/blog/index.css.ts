import { style, vars } from "~/styles.css";

export const cardHolder = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["7x"],
});

export const feedItemsEmpty = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: vars.color.text.gray,
});
