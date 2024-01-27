import type {
  CacheStorage,
  Response as CFResponse,
  Request as CFRequest,
} from "@cloudflare/workers-types";

export class Cache<T> {
  cache: CacheStorage["default"];
  cacheRequest: CFRequest;

  constructor(request: Request) {
    this.cache = (caches as unknown as CacheStorage).default;
    const cacheURL = new URL(request.url);

    this.cacheRequest = new Request(
      cacheURL.toString(),
    ) as unknown as CFRequest;
  }

  async get() {
    const cacheMatch = await this.cache.match(this.cacheRequest);

    if (cacheMatch) {
      return (await cacheMatch.json()) as T;
    }

    return null;
  }

  async set(data: T) {
    const cacheResponse = new Response(JSON.stringify(data));
    cacheResponse.headers.set("Cache-Control", "public, max-age=3600");
    cacheResponse.headers.set("Content-Type", "application/json");
    this.cache.put(this.cacheRequest, cacheResponse as unknown as CFResponse);
  }
}
