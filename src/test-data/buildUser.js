import { randomUUID } from 'node:crypto';

export function buildUser(overrides = {}, uniqueId = randomUUID()) {
    const id = uniqueId.slice(0, 5);

    const user = {
        username: `test${id}`,
        email: `test${id}@example.com`,
        password: '12345Ghj',
        country: 'PL',
        currency: 'TRY',
    };

    return { ...user, ...overrides };
}
