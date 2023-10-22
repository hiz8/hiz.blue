import { type MetaFunction, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { postFromModule } from "~/utils/post-from-module";
import * as styles from "./route.css";

// All Blog posts
import * as post001 from "../_landing.blog._detail.20231022.mdx";

export const meta: MetaFunction = () => {
  return [{ title: "hiz" }, { name: "description", content: "Home" }];
};

export async function loader() {
  return json([postFromModule(post001)]);
}

type FieldItem = {
  id: string;
  title: string;
  domain: "hiz.blue";
  category: "Blog";
  href: `/blog/${string}`;
};

export default function Index() {
  const posts = useLoaderData<typeof loader>();

  const feedItems: FieldItem[] = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    domain: "hiz.blue",
    category: "Blog",
    href: `/blog/${post.slug}`,
  }));

  return (
    <div className={styles.root}>
      <section>
        <Headline>
          <Icon type="feed" />
          Feed
        </Headline>
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
