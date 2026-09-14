import assert from 'node:assert/strict';
import { test } from 'node:test';
import { placeholder } from './index.js';

test('placeholder returns true', () => {
    assert.equal(placeholder(), true);
});
