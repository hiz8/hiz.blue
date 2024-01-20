import { Link } from "react-aria-components";

import * as styles from "./card.css";

const imageSize = 44;

interface CardProps {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  image?: string;
}
export function Card({ title, excerpt, date, slug, image }: CardProps) {
  return (
    <Link href={`/blog/${slug}`} className={styles.urlLink}>
      <div className={styles.root}>
        <div className={styles.imageWrapper}>
          {image && (
            <img
              src={image}
              alt={title}
              width={imageSize}
              height={imageSize}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {excerpt && <div className={styles.excerpt}>{excerpt}</div>}
        </div>
      </div>
    </Link>
  );
}
