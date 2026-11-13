import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildUser } from './buildUser.js';

test('Get 2 different emails', () => {
    const variantFirst = buildUser();
    const variantSecond = buildUser();

    assert.notEqual(variantFirst.email, variantSecond.email);
});

test('overrides actually override default fields', () => {
    const user = buildUser({ country: 'FR' });

    assert.equal(user.country, 'FR');
});

test('overrides rejects unknown field names at compile time', () => {
    // @ts-expect-error: typo in field name must be a compile error
    buildUser({ usernmae: 'x' });
});
