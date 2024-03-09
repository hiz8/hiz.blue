import { useState, useEffect } from "react";
import { useLocation } from "@remix-run/react";
import { Link, TooltipTrigger } from "react-aria-components";

import { Icon } from "~/components/icon";
import { Tooltip } from "~/components/tooltip";
import * as styles from "./app-nav.css";

export function AppNav() {
  // スクリーンサイズに応じてTooltipの表示位置を制御する。
  // モバイル表示の場合はTooltipを表示しない。
  // あくまで補助的なものなので、スクリーンサイズが変わったときに再計算する必要はない。
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(min-width: 840px)").matches) {
      setIsSmallScreen(true);
    }
  }, []);

  const location = useLocation();

  return (
    <div className={styles.root}>
      <TooltipTrigger delay={0} closeDelay={0} isDisabled={isSmallScreen}>
        <Link
          href="/"
          className={styles.link}
          aria-current={location.pathname === "/" ? "page" : undefined}
        >
          <Icon type={location.pathname === "/" ? "homeBold" : "home"} />
          <span className={styles.lintText}>Home</span>
        </Link>
        <Tooltip placement={"end"}>Home</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={0} closeDelay={0} isDisabled={isSmallScreen}>
        <Link
          href="/works"
          className={styles.link}
          aria-current={location.pathname === "/works" ? "page" : undefined}
        >
          <Icon type={location.pathname === "/works" ? "worksBold" : "works"} />
          <span className={styles.lintText}>Works</span>
        </Link>
        <Tooltip placement={"end"}>Works</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={0} closeDelay={0} isDisabled={isSmallScreen}>
        <Link
          href="/blog"
          className={styles.link}
          aria-current={location.pathname === "/blog" ? "page" : undefined}
        >
          <Icon type={location.pathname === "/blog" ? "blogBold" : "blog"} />
          <span className={styles.lintText}>Blog</span>
        </Link>
        <Tooltip placement={"end"}>Blog</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
