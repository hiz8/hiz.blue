import type {
  CacheStorage,
  Response as CFResponse,
  Request as CFRequest,
} from "@cloudflare/workers-types";
import { json } from "@remix-run/cloudflare";
import type { Result } from "~/utils/notion";

/**
 * A class to handle the cache
 */
export class Cache<T> {
  cache: CacheStorage["default"];
  cacheRequest: CFRequest;

  /**
   * Create a new cache
   * @param request - The request
   */
  constructor(request: Request) {
    this.cache = (caches as unknown as CacheStorage).default;
    const cacheURL = new URL(request.url);

    this.cacheRequest = new Request(
      cacheURL.toString(),
    ) as unknown as CFRequest;
  }

  /**
   * Get the cache
   */
  async get() {
    const cacheMatch = await this.cache.match(this.cacheRequest);

    if (cacheMatch) {
      return (await cacheMatch.json()) as T;
    }

    return null;
  }

  /**
   * Set the cache
   * @param data - The data to cache
   */
  async set(data: T) {
    const cacheResponse = new Response(JSON.stringify(data));
    cacheResponse.headers.set("Cache-Control", "public, max-age=3600");
    cacheResponse.headers.set("Content-Type", "application/json");
    this.cache.put(this.cacheRequest, cacheResponse as unknown as CFResponse);
  }
}

export type Data = {
  data: Promise<Result> | Result;
};

/**
 * Get the data from the cache
 * @param data - The data to cache
 * @param cache - The cache
 * @returns The data from the cache
 */
export async function storeData(data: Promise<Result>, cache: Cache<Data>) {
  const posts = await data;
  await cache.set({ data: posts });
  return json({ data: posts });
}
