export async function waitUntil(
    predicate,
    { timeoutMs, intervalMs, message } = {},
) {
    if (!message) {
        throw new Error('message is required');
    }

    if (!Number.isInteger(intervalMs) || intervalMs < 1) {
        throw new RangeError('timeoutMs must be a positive integer');
    }

    if (!Number.isInteger(intervalMs) || intervalMs < 1) {
        throw new RangeError('intervalMs must be a positive integer');
    }

    const deadline = Date.now() + timeoutMs;

    while (true) {
        const result = await predicate();

        if (result === true) {
            return;
        }

        const remainingMs = deadline - Date.now();

        if (remainingMs <= 0) {
            throw new Error(
                `Timed out after ${timeoutMs} ms waiting for ${message}`,
            );
        }

        await new Promise((resolve) =>
            setTimeout(resolve, Math.min(intervalMs, remainingMs)),
        );
    }
}
