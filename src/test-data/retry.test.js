import assert from 'node:assert/strict';
import { test } from 'node:test';
import { retry } from './retry.js';

test('Retry works after the 2nd attempt', async () => {
    let calls = 0;
    const action = async () => {
        calls++;
        if (calls === 1) throw new Error('boom');
        return 'ok';
    };
    const result = await retry(action, { attempts: 3, delayMs: 1 });

    assert.equal(result, 'ok');
    assert.equal(calls, 2);
});

test('Retry throws an Error', async () => {
    const error = new Error('always fails');
    let calls = 0;
    const action = async () => {
        calls++;
        throw error;
    };
    await assert.rejects(
        () => retry(action, { attempts: 3, delayMs: 1 }),
        error,
    );

    assert.equal(calls, 3);
});
