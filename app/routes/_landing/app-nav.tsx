import { Link } from "@remix-run/react";

import { Icon } from "~/components/icon";
import * as styles from "./app-nav.css";

export function AppNav() {
  return (
    <div className={styles.root}>
      <Link to="/" className={styles.link} title="Home">
        <Icon type="home" />
        <span className={styles.lintText}>Home</span>
      </Link>
      <Link to="/works" className={styles.link} title="Works">
        <Icon type="works" />
        <span className={styles.lintText}>Works</span>
      </Link>
      <Link to="/blog" className={styles.link} title="Blog">
        <Icon type="blog" />
        <span className={styles.lintText}>Blog</span>
      </Link>
    </div>
  );
}
