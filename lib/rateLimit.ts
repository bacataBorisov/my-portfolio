type Bucket = { count: number; resetAt: number };

const stores = new Map<string, Map<string, Bucket>>();

/**
 * In-memory sliding window. Good enough for a single Vercel instance;
 * resets on cold start. Better than an open endpoint.
 */
export function rateLimit(scope: string, key: string, limit: number, windowMs: number): boolean {
    let store = stores.get(scope);
    if (!store) {
        store = new Map();
        stores.set(scope, store);
    }

    const now = Date.now();
    const existing = store.get(key);

    if (!existing || now >= existing.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return true;
    }

    if (existing.count >= limit) return false;
    existing.count += 1;
    return true;
}

export function clientIp(req: { headers: Headers }): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]!.trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}
