import { Outlet } from "@remix-run/react";

import * as styles from "./route.css";

export default function Index() {
  return (
    <article className={styles.root}>
      <Outlet />
    </article>
  );
}
