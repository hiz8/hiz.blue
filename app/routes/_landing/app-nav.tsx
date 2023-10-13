import { Link } from "react-aria-components";

import { Icon } from "~/components/icon";
import * as styles from "./app-nav.css";

export function AppNav() {
  return (
    <div className={styles.root}>
      <Link href="/" className={styles.link}>
        <Icon type="home" />
        <span className={styles.lintText}>Home</span>
      </Link>
      <Link href="/works" className={styles.link}>
        <Icon type="works" />
        <span className={styles.lintText}>Works</span>
      </Link>
      <Link href="/blog" className={styles.link}>
        <Icon type="blog" />
        <span className={styles.lintText}>Blog</span>
      </Link>
    </div>
  );
}
