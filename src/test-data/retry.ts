type RetryOptions = {
    attempts?: number;
    delayMs?: number;
};

export async function retry<T>(
    action: () => Promise<T> | T,
    { attempts, delayMs = 0 }: RetryOptions = {},
): Promise<T> {
    if (
        typeof attempts !== 'number' ||
        !Number.isInteger(attempts) ||
        attempts < 1
    ) {
        throw new RangeError('attempts must be a positive integer');
    }

    let lastError: unknown;

    for (let i = 0; i < attempts; i++) {
        try {
            return await action();
        } catch (err) {
            lastError = err;

            if (typeof delayMs === 'number' && i < attempts - 1) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }
    }

    throw lastError;
}
