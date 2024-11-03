import type { ServerBuild } from "@remix-run/cloudflare";
import {
  createPagesFunctionHandler,
  type GetLoadContextFunction,
} from "@remix-run/cloudflare-pages";

import * as build from "../build/server";
import { getLoadContext } from "../load-context";

export const onRequest = createPagesFunctionHandler({
  build: build as ServerBuild,
  getLoadContext: getLoadContext as unknown as GetLoadContextFunction,
});
