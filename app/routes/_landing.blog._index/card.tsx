import { Link } from "react-aria-components";
import * as styles from "./card.css";

interface CardProps {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
}
export function Card({ title, excerpt, date, slug }: CardProps) {
  // post.date の "YYYY-MM-DDTHH:mm:ssZ" の文字列 を YYYY-MM-DD に変換する
  const _date = date.slice(0, 10);

  return (
    <Link href={`/blog/${slug}`} className={styles.urlLink}>
      <section className={styles.root}>
        <div className={styles.content}>
          <time className={styles.date} dateTime={_date}>
            {_date}
          </time>
          <h2 className={styles.title}>{title}</h2>
          {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        </div>
      </section>
    </Link>
  );
}
