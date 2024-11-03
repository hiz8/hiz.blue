/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

declare module "@remix-run/cloudflare" {
  import type { DataFunctionArgs as RemixDataFunctionArgs } from "@remix-run/cloudflare/dist/index";
  import type { CacheStorage } from "@cloudflare/workers-types";
  export * from "@remix-run/cloudflare/dist/index";

  export interface AppLoadContext extends Record<string, unknown> {
    env: {
      NOTION_API_KEY: string;
      NOTION_DATABASE_ID: string;
    };
    caches: CacheStorage;
    ctx: {
      waitUntil: (promise: Promise<unknown>) => void;
    };
  }

  export interface DataFunctionArgs
    extends Omit<RemixDataFunctionArgs, "context"> {
    context: AppLoadContext;
  }

  export interface ActionArgs extends DataFunctionArgs {}
  export interface LoaderArgs extends DataFunctionArgs {}
}
