import { Outlet } from "@remix-run/react";

import { AppNav } from "./app-nav";
import { AppBanner } from "./app-banner";

import * as styles from "./route.css";

export default function Index() {
  return (
    <div className={styles.root}>
      <AppBanner />
      <AppNav />
      <Outlet />
    </div>
  );
}
