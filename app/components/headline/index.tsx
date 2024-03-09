import * as styles from "./index.css";

interface HeadlineProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}
export function Headline({ level = 1, children }: HeadlineProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={styles.headline}>{children}</Tag>;
}
