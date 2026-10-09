import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildMany } from './buildMany.js';
import { buildUser } from './buildUser.js';

test('buildMany returns an array of the requested length', () => {
    const users = buildMany(5, buildUser);

    assert.equal(
        users.length,
        5,
        "buildMany doesn't return an array of the requested length",
    );
});
