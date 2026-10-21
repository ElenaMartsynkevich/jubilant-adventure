export async function retry(action, { attempts, delayMs } = {}) {
    if (!Number.isInteger(attempts) || attempts < 1) {
        throw new RangeError('attempts must be a positive integer');
    }

    let lastError;

    for (let i = 0; i < attempts; i++) {
        try {
            return await action();
        } catch (err) {
            lastError = err;

            if (i < attempts - 1) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }
    }

    throw lastError;
}
