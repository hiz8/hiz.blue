import type { ServerBuild } from "react-router";
import {
  createPagesFunctionHandler,
  type GetLoadContextFunction,
} from "@react-router/cloudflare";

import * as build from "../build/server";
import { getLoadContext } from "../load-context";

export const onRequest = createPagesFunctionHandler({
  build: build as ServerBuild,
  getLoadContext: getLoadContext as unknown as GetLoadContextFunction,
});
