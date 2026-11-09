import assert from 'node:assert/strict';
import { test } from 'node:test';
import { waitUntil } from './waitUntil.js';

test('It finishes when becomes true', async () => {
    let checks = 0;
    const predicate = async () => {
        checks++;
        return checks >= 3;
    };
    await waitUntil(predicate, {
        timeoutMs: 500,
        intervalMs: 5,
        message: 'checks to reach 3',
    });

    assert.equal(checks, 3);
});

test('It times out with a readable message', async () => {
    await assert.rejects(
        () =>
            waitUntil(async () => false, {
                timeoutMs: 30,
                intervalMs: 5,
                message: 'balance for user user-123 to be updated',
            }),
        {
            message:
                'Timed out after 30 ms waiting for balance for user user-123 to be updated',
        },
    );
});

test('Message required is shown instead of error message', async () => {
    await assert.rejects(
        () => waitUntil(async () => false, { timeoutMs: 30 }),
        /message is required/,
    );
});
