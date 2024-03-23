import { Link } from "react-aria-components";

import { Icon } from "~/components/icon";
import * as styles from "./card.css";

const imageSize = 44;

interface CardProps {
  title: string;
  description: string;
  image?: string;
  urls?: {
    type: "website" | "github";
    url: string;
  }[];
}
export function Card({ title, description, image, urls }: CardProps) {
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
          {urls?.map(({ type, url }) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className={styles.urlLink}
            >
              <Icon type={type === "website" ? "global" : "github"} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
