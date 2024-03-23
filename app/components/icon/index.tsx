import * as styles from "./index.css";
import clsx from "clsx";

type Props = {
  type:
    | "home"
    | "homeBold"
    | "feed"
    | "global"
    | "github"
    | "works"
    | "worksBold"
    | "blog"
    | "blogBold"
    | "externalLink";
  color?: "black" | "white" | "none";
};

export function Icon({ type, color = "none" }: Props) {
  return (
    <span
      className={clsx(styles.icon, styles.type[type], styles.color[color])}
    />
  );
}
