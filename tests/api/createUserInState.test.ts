import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from 'vitest';
import { createUserInState } from '../../src/test-data/createUserInState.js';
import { ApiClient } from './client';
import { type RunningApi, startTestApi } from './server';

describe('createUserInState', () => {
    let running: RunningApi;
    let api: ApiClient;

    beforeAll(async () => {
        running = await startTestApi();
        api = new ApiClient(running.baseUrl);
    });

    beforeEach(async () => {
        const reset = await api.reset();
        expect(reset.status).toBe(200);
    });

    afterAll(async () => {
        await running.close();
    });

    test('creates a registered user', async () => {
        const created = await createUserInState('registered', api);
        expect(created.id).toBeTruthy();
    });

    test('creates a verified user', async () => {
        const created = await createUserInState('verified', api);

        const account = await api
            .withToken(created.token)
            .request<{ status: string }>(`/users/${created.id}`);

        expect(account.status).toBe(200);
        expect(account.body.status).toBe('verified');
    }, 15000);

    test('creates a verified user with a balance', async () => {
        const created = await createUserInState('verifiedWithBalance', api, {
            balance: 500,
        });

        const account = await api
            .withToken(created.token)
            .request<{ status: string; balance: { amount: number } }>(
                `/users/${created.id}`,
            );

        expect(account.status).toBe(200);
        expect(account.body.status).toBe('verified');
        expect(account.body.balance.amount).toBe(500);
    }, 15000);
});
