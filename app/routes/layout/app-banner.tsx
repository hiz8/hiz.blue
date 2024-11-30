import { Link } from "react-aria-components";
import * as styles from "./app-banner.css";

export function AppBanner() {
  return (
    <div className={styles.root}>
      <Link href="/" className={styles.headlineLink}>
        <h1 className={styles.headline}>hiz</h1>
      </Link>
      <p className={styles.subHeadline}>UX designer, developer in Japan.</p>
      <span className={styles.cloudOne} />
      <span className={styles.cloudTwo} />
    </div>
  );
}
