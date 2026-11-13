type WaitUntilOptions = {
    timeoutMs?: number;
    intervalMs?: number;
    message?: string;
};

export async function waitUntil(
    predicate: () => boolean | Promise<boolean>,
    { timeoutMs, intervalMs, message }: WaitUntilOptions = {},
): Promise<void> {
    if (!message) {
        throw new Error('message is required');
    }

    if (
        typeof timeoutMs !== 'number' ||
        !Number.isInteger(timeoutMs) ||
        timeoutMs < 1
    ) {
        throw new RangeError('timeoutMs must be a positive integer');
    }

    if (
        typeof intervalMs !== 'number' ||
        !Number.isInteger(intervalMs) ||
        intervalMs < 1
    ) {
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
