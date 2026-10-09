import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatAmount } from './formatAmount.js';
import { parseAmount } from './parseAmount.js';

test('formatAmount handles Euro currency', () => {
    assert.equal(formatAmount(1234.56, 'EUR'), '€1 234,56');
});

test('formatAmount handles US currency', () => {
    assert.equal(formatAmount(1234.56, 'USD'), '$1,234.56');
});

test('formatAmount works with parseAmount', () => {
    assert.equal(parseAmount(formatAmount(1234.56, 'EUR')), 1234.56);
});

test('formatAmount throws on garbage input', () => {
    assert.throws(() => formatAmount(100, 'GBP'), /can't recognize currency/);
});
