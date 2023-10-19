import * as styles from "./app-banner.css";

export function AppBanner() {
  return (
    <div className={styles.root}>
      <h1 className={styles.headline}>hiz</h1>
      <p className={styles.subHeadline}>UX designer, developer in Japan.</p>
      <span className={styles.cloudOne} />
      <span className={styles.cloudTwo} />
    </div>
  );
}
