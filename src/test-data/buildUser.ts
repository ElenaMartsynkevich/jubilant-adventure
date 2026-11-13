import { randomUUID } from 'node:crypto';
import type { Currency } from './formatAmount.js';

export type User = {
    username: string;
    email: string;
    password: string;
    country: string;
    currency: Currency;
    balance?: number;
};

export function buildUser(
    overrides: Partial<User> = {},
    uniqueId: string = randomUUID(),
): User {
    const id = uniqueId.slice(0, 5);

    const user: User = {
        username: `test${id}`,
        email: `test${id}@example.com`,
        password: '12345Ghj',
        country: 'PL',
        currency: 'USD',
    };

    return { ...user, ...overrides };
}
