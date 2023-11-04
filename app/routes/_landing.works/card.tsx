import { Link } from "react-aria-components";

import { Icon } from "~/components/icon";
import * as styles from "./card.css";

const imageSize = 44;

interface CardProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
export function Card({ title, description, image, url }: CardProps) {
  return (
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
        <div className={styles.description}>{description}</div>
        <div className={styles.url}>
          <Link href={url} target="_blank" className={styles.urlLink}>
            {url} <Icon type="externalLink" />
          </Link>
        </div>
      </div>
    </div>
  );
}
