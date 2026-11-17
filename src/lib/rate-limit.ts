// ============================================================================
// THE YACINEVERSE — Distributed & Fallback Rate Limiting (Remediation C7)
// Limits contact form abuse (Max 3 submissions per IP per hour)
// ============================================================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

export async function checkRateLimit(
  key: string,
  limit: number = 3,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const existing = memoryStore.get(key);

  if (!existing || now > existing.resetAt) {
    const record: RateLimitRecord = { count: 1, resetAt: now + windowMs };
    memoryStore.set(key, record);
    return { allowed: true, remaining: limit - 1, resetAt: record.resetAt };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  memoryStore.set(key, existing);
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}
