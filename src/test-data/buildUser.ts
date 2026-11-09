import { randomUUID } from 'node:crypto';

export type User = {
    username: string;
    email: string;
    password: string;
    country: string;
    currency: string;
    balance?: number;
};

export function buildUser(
    overrides: Partial<User> = {},
    uniqueId: string = randomUUID(),
): User {
    const id = uniqueId.slice(0, 5);

    const user = {
        username: `test${id}`,
        email: `test${id}@example.com`,
        password: '12345Ghj',
        country: 'PL',
        currency: 'USD',
    };

    return { ...user, ...overrides };
}
