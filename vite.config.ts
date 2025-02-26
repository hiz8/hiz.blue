import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { patchCssModules } from "vite-css-modules";

import { getLoadContext } from "./load-context";

export default defineConfig({
  plugins: [
    cloudflareDevProxy({ getLoadContext }),
    reactRouter(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    patchCssModules(),
  ],
  ssr: {
    noExternal: ["@hiz8/blue-ui"],
  },
});
