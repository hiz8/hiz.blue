import type { CacheStorage } from "@cloudflare/workers-types";

declare module "react-router" {
  interface AppLoadContext {
    env: {
      NOTION_API_KEY: string;
      NOTION_DATABASE_ID: string;
    };
    caches: CacheStorage;
    ctx: {
      waitUntil: (promise: Promise<unknown>) => void;
    };
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {}; // necessary for TS to treat this as a module
