import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

import { Icon } from "~/components/icon";

import * as styles from "./route.css";

export const meta: MetaFunction = () => {
  return [{ title: "hiz" }, { name: "description", content: "Home" }];
};

const feedItems = [
  {
    id: "1",
    title: "Hello World",
    domain: "example.com",
    category: "Blog",
    href: "/blog/hello-world",
  },
  {
    id: "2",
    title: "Hello World",
    domain: "example.com",
    category: "Blog",
    href: "/blog/hello-world",
  },
];

export default function Index() {
  return (
    <div className={styles.root}>
      <section>
        <h1 className={styles.headline}>
          <Icon type="feed" />
          Feed
        </h1>
        <ul className={styles.feedItems}>
          {feedItems.map((item) => (
            <Link to={item.href} key={item.id} className={styles.feedItemLink}>
              <li className={styles.feedItem}>
                <div className={styles.feedItemImage}></div>
                <div className={styles.feedItemContents}>
                  <h2 className={styles.feedItemTitle}>{item.title}</h2>
                  <div className={styles.feedItemMeta}>
                    <p className={styles.feedItemDomain}>{item.domain}</p>
                    <p className={styles.feedItemCategory}>{item.category}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
