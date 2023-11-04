import { type MetaFunction, json } from "@remix-run/cloudflare";
// import { useLoaderData } from "@remix-run/react";

import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { Card } from "./card";
import { postFromModule } from "~/utils/post-from-module";
import * as styles from "./route.css";

// All posts
import * as post001 from "../_landing.blog._detail.20231022.mdx";

export const meta: MetaFunction = () => {
  return [{ title: "Blog - hiz" }, { name: "description", content: "Blog" }];
};

export async function loader() {
  return json([postFromModule(post001)]);
}

export default function Index() {
  // const posts = useLoaderData<typeof loader>();
  const posts = [] as ReturnType<typeof postFromModule>[];

  return (
    <div>
      <Headline>
        <Icon type="blog" />
        Blog
      </Headline>
      <div className={styles.cardHolder}>
        {posts.length === 0 && (
          <p className={styles.feedItemsEmpty}>No posts yet.</p>
        )}
        {posts.map((post) => (
          <Card key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
