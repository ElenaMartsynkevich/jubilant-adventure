import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
    buildMany,
    buildUser,
    formatAmount,
    parseAmount,
    retry,
    TestUser,
    waitUntil,
} from './index.js';

test('index.js re-exports all public API', () => {
    assert.equal(typeof buildUser, 'function');
    assert.equal(typeof buildMany, 'function');
    assert.equal(typeof parseAmount, 'function');
    assert.equal(typeof formatAmount, 'function');
    assert.equal(typeof TestUser, 'function');
    assert.equal(typeof retry, 'function');
    assert.equal(typeof waitUntil, 'function');
});
