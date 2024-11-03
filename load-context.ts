import type { PlatformProxy } from "wrangler";

interface Env {
  NOTION_API_KEY: string;
  NOTION_DATABASE_ID: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    env: Env;
  }
}

export const getLoadContext = ({
  context,
}: { context: { cloudflare: Cloudflare } }) => {
  return {
    ...context.cloudflare,
  };
};
