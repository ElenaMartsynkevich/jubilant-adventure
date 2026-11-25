import type { ApiClient } from '../../tests/api/client.js';
import { buildUser, type User } from './buildUser.js';
import { waitUntil } from './waitUntil.js';

const ADMIN_EMAIL = 'admin@example.test';
const ADMIN_PASSWORD = 'password';
const DEFAULT_BALANCE = 1000;

export type UserState = 'registered' | 'verified' | 'verifiedWithBalance';

export type CreatedUser = {
    user: User;
    id: string;
    token: string;
};

export async function createUserInState(
    state: UserState,
    api: ApiClient,
    overrides: Partial<User> = {},
): Promise<CreatedUser> {
    const user = buildUser(overrides);
    const response = await api.request('/users', {
        method: 'POST',
        json: {
            email: user.email,
            password: user.password,
            country: user.country,
            currency: user.currency,
        },
    });

    if (response.status !== 201) {
        throw new Error(`Failed to register user: status ${response.status}`);
    }

    const { id } = parseAccount(response.body);

    const login = await api.login(user.email, user.password);

    if (login.status !== 200) {
        throw new Error(`Failed to login user: status ${login.status}`);
    }

    if (state === 'registered') {
        return { user, id, token: login.body.token };
    }

    const userApi = api.withToken(login.body.token);

    const codeResponse = await api.verificationCode(id);
    if (codeResponse.status !== 200) {
        throw new Error(
            `Failed to get verification code: status ${codeResponse.status}`,
        );
    }

    const verification = await userApi.request(`/users/${id}/verification`, {
        method: 'POST',
        json: { code: codeResponse.body.code },
    });

    if (verification.status !== 200 && verification.status !== 202) {
        throw new Error(
            `Failed to start verification: status ${verification.status}`,
        );
    }

    await waitUntil(
        async () => {
            const account = await userApi.request(`/users/${id}`);
            if (account.status !== 200) {
                throw new Error(`Failed to get user: status ${account.status}`);
            }
            return parseAccount(account.body).status === 'verified';
        },
        {
            timeoutMs: 10000,
            intervalMs: 200,
            message: 'user verification to complete',
        },
    );
    if (state === 'verified') {
        return { user, id, token: login.body.token };
    }

    const balance = user.balance ?? DEFAULT_BALANCE;
    const adminLogin = await api.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    if (adminLogin.status !== 200) {
        throw new Error(`Failed to login admin: status ${adminLogin.status}`);
    }

    const adminApi = api.withToken(adminLogin.body.token);
    const responseAdmin = await adminApi.request(`/users/${id}/balance`, {
        method: 'PUT',
        json: { amount: balance },
    });
    if (responseAdmin.status !== 200) {
        throw new Error(
            `Failed to set balance: status ${responseAdmin.status}`,
        );
    }

    return { user: { ...user, balance }, id, token: login.body.token };
}

function parseAccount(body: unknown): { id: string; status: string } {
    if (typeof body !== 'object' || body === null) {
        throw new Error('Account response is not an object');
    }

    const { id, status } = body as Record<string, unknown>;

    if (typeof id !== 'string') {
        throw new Error('Account response has no id');
    }

    if (typeof status !== 'string') {
        throw new Error('Account response has no status');
    }

    return { id, status };
}
