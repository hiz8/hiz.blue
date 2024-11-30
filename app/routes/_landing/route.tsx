import { Outlet } from "react-router";

import { AppNav } from "./app-nav";
import { AppBanner } from "./app-banner";
import { AppFooter } from "./app-footer";

import * as styles from "./route.css";

export default function Index() {
  return (
    <div className={styles.root}>
      <AppBanner />
      <AppNav />
      <main className={styles.main}>
        <Outlet />
        <AppFooter />
      </main>
    </div>
  );
}
