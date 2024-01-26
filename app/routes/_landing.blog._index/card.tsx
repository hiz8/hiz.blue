import { Link } from "react-aria-components";
import * as styles from "./card.css";

interface CardProps {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
}
export function Card({ title, excerpt, date, slug }: CardProps) {
  return (
    <Link href={`/blog/${slug}`} className={styles.urlLink}>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {excerpt && <div className={styles.excerpt}>{excerpt}</div>}
        </div>
      </div>
    </Link>
  );
}
