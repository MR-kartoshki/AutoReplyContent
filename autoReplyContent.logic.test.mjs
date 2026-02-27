import assert from "node:assert/strict";
import test from "node:test";

const PROCESSED_MESSAGE_TTL_MS = 5 * 60_000;
const MAX_PROCESSED_MESSAGE_IDS = 10_000;

function toRegex(triggerPrefix, caseInsensitive) {
    const literalMatch = triggerPrefix.match(/^\/(.+)\/([a-z]*)$/);

    try {
        if (literalMatch) {
            const [, pattern, rawFlags] = literalMatch;
            const flags = caseInsensitive && !rawFlags.includes("i")
                ? `${rawFlags}i`
                : rawFlags;

            return new RegExp(pattern, flags);
        }

        return new RegExp(triggerPrefix, caseInsensitive ? "i" : undefined);
    } catch {
        return null;
    }
}

function matchesTrigger(content, triggerPrefix, useRegex, exactMatch, caseInsensitive) {
    if (useRegex) {
        const regex = toRegex(triggerPrefix, caseInsensitive);
        return regex ? regex.test(content) : false;
    }

    if (caseInsensitive) {
        const normalizedContent = content.toLowerCase();
        const normalizedTrigger = triggerPrefix.toLowerCase();
        return exactMatch
            ? normalizedContent === normalizedTrigger
            : normalizedContent.startsWith(normalizedTrigger);
    }

    return exactMatch
        ? content === triggerPrefix
        : content.startsWith(triggerPrefix);
}

function isInCooldown(now, lastEventTime, cooldownMs) {
    if (cooldownMs <= 0 || lastEventTime == null) return false;
    return now - lastEventTime < cooldownMs;
}

function createProcessedMessageCache(ttlMs = PROCESSED_MESSAGE_TTL_MS, maxEntries = MAX_PROCESSED_MESSAGE_IDS) {
    const processedMessageIds = new Map();

    function prune(now) {
        for (const [messageId, processedAt] of processedMessageIds) {
            if (now - processedAt < ttlMs) break;
            processedMessageIds.delete(messageId);
        }

        while (processedMessageIds.size > maxEntries) {
            const oldestMessageId = processedMessageIds.keys().next().value;
            if (!oldestMessageId) break;
            processedMessageIds.delete(oldestMessageId);
        }
    }

    return {
        hasProcessed(messageId, now) {
            prune(now);
            if (processedMessageIds.has(messageId)) return true;
            processedMessageIds.set(messageId, now);
            prune(now);
            return false;
        },
        size() {
            return processedMessageIds.size;
        },
    };
}

test("matchesTrigger supports prefix, exact, case-insensitive, and regex modes", () => {
    assert.equal(matchesTrigger("!ping now", "!ping", false, false, false), true);
    assert.equal(matchesTrigger("!ping now", "!ping", false, true, false), false);
    assert.equal(matchesTrigger("HELLO there", "hello", false, false, true), true);
    assert.equal(matchesTrigger("hello world", "/^hello\\s+\\w+$/", true, false, false), true);
    assert.equal(matchesTrigger("hello world", "/(/", true, false, false), false);
});

test("isInCooldown returns expected values for disabled, active, and expired cooldowns", () => {
    const now = 5_000;
    assert.equal(isInCooldown(now, undefined, 10_000), false);
    assert.equal(isInCooldown(now, 4_000, 0), false);
    assert.equal(isInCooldown(now, 4_500, 1_000), true);
    assert.equal(isInCooldown(now, 3_000, 1_000), false);
});

test("processed message cache deduplicates and expires old entries", () => {
    const cache = createProcessedMessageCache(100, 10);

    assert.equal(cache.hasProcessed("a", 0), false);
    assert.equal(cache.hasProcessed("a", 50), true);
    assert.equal(cache.hasProcessed("a", 150), false);
});

test("processed message cache prunes oldest entries when max size is exceeded", () => {
    const cache = createProcessedMessageCache(10_000, 2);

    assert.equal(cache.hasProcessed("a", 0), false);
    assert.equal(cache.hasProcessed("b", 1), false);
    assert.equal(cache.hasProcessed("c", 2), false);
    assert.equal(cache.size(), 2);
    assert.equal(cache.hasProcessed("a", 3), false);
});
