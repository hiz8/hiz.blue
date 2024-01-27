import {
  OverlayArrow,
  Tooltip as BaseTooltip,
  type TooltipProps as BaseTooltipProps,
} from "react-aria-components";

import * as styles from "./index.css";

interface TooltipProps extends Omit<BaseTooltipProps, "children"> {
  children: React.ReactNode;
}

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <BaseTooltip {...props} className={styles.root}>
      <OverlayArrow>
        <svg width={8} height={8}>
          <title>Arrow</title>
          <path d="M0 0,L4 4,L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </BaseTooltip>
  );
}
