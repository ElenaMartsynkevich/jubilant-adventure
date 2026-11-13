import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildUser } from './buildUser.js';
import { TestUser } from './TestUser.js';

test('A new user is created', () => {
    const user = new TestUser(buildUser({}, 'aaaaa'));

    assert.equal(user.displayName, 'testaaaaa <testaaaaa@example.com>');
});

test('isHighRoller False if balance is not provided', () => {
    const user = new TestUser(buildUser());
    assert.equal(user.isHighRoller, false);
});

test('isHighRoller True if balance is more than HIGH_ROLLER_THRESHOLD value', () => {
    const user = new TestUser(buildUser({ balance: 15000 }));
    assert.equal(user.isHighRoller, true);
});

test('isHighRoller True if balance is equal to HIGH_ROLLER_THRESHOLD value', () => {
    const user = new TestUser(buildUser({ balance: 10000 }));
    assert.equal(user.isHighRoller, true);
});
