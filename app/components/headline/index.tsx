import * as styles from "./index.css";

interface HeadlineProps {
  children: React.ReactNode;
}
export function Headline({ children }: HeadlineProps) {
  return <h1 className={styles.headline}>{children}</h1>;
}
