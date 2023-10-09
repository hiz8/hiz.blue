import * as styles from "./index.css";
import clsx from "clsx";

type Props = {
  type: "home" | "feed" | "works" | "blog";
  color?: "black" | "white" | "none";
};

export function Icon({ type, color = "none" }: Props) {
  return (
    <span
      className={clsx(styles.icon, styles.type[type], styles.color[color])}
    />
  );
}
