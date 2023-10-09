import { Link } from "@remix-run/react";

import { Icon } from "~/components/icon";
import * as styles from "./app-nav.css";

export function AppNav() {
  return (
    <div className={styles.root}>
      <Link to="/" className={styles.link}>
        <Icon type="home" size="small" />
        <span>Home</span>
      </Link>
      <Link to="/works" className={styles.link}>
        <Icon type="works" size="small" />
        <span>Works</span>
      </Link>
      <Link to="/blog" className={styles.link}>
        <Icon type="blog" size="small" />
        <span>Blog</span>
      </Link>
    </div>
  );
}
