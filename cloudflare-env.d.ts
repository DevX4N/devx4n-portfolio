declare module "cloudflare:workers" {
  export const env: Record<string, unknown> & { DB?: D1Database };
}

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

type D1Database = import("drizzle-orm/d1").DrizzleD1Database<Record<string, never>>["$client"];
