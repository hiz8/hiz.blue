import * as styles from "./index.css";

interface PlaceholderProps {
  children?: React.ReactNode;
}
export function Placeholder({ children }: PlaceholderProps) {
  return <div className={styles.placeholder}>{children}</div>;
}

export function PlaceholderLine() {
  return <div className={styles.placeholderLine} />;
}

export function PlaceholderImage() {
  return <div className={styles.placeholderImage} />;
}

interface PlaceholderHeaderProps {
  children?: React.ReactNode;
  image?: boolean;
}
export function PlaceholderHeader({ children, image }: PlaceholderHeaderProps) {
  const className = image
    ? `${styles.placeholderImage} ${styles.placeholderHeader}`
    : styles.placeholderHeader;
  return <div className={className}>{children}</div>;
}
