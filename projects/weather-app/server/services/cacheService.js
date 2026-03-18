import client from '../config/redisClient.js';

const DEFAULT_TTL_SECONDS = 60 * 60 * 10;
export const getCachedValue = async (key) => {
    const cached = await client.get(key);
    return cached ? JSON.parse(cached) : null;
}

export const setCachedValue = async (key, CSSMathValue, ttl = DEFAULT_TTL_SECONDS) {
    await client.setEx(key, ttl, JSON.stringify(value));
}