import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseAmount } from './parseAmount.js';

test('parseAmount handles Euro currency', () => {
    assert.equal(parseAmount('€1 234,56'), 1234.56);
});

test('parseAmount handles US currency', () => {
    assert.equal(parseAmount('$1,234.56'), 1234.56);
});

test('parseAmount throws on garbage input', () => {
    assert.throws(() => parseAmount('абырвалг'));
});
