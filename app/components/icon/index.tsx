import * as styles from "./index.css";
import clsx from "clsx";

type Props = {
  type: "home" | "feed" | "works" | "blog";
  size?: "small" | "medium" | "large";
  color?: "black" | "white";
};

export function Icon({ type, size = "medium", color = "none" }: Props) {
  return (
    <span
      className={clsx(
        styles.icon,
        styles.type[type],
        styles.size[size],
        styles.color[color]
      )}
    />
  );
}
