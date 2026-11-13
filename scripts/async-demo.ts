import { setTimeout as sleep } from 'node:timers/promises';
import type { User } from '../src/test-data/buildUser.js';
import { buildMany, buildUser } from '../src/test-data/index.js';

const users = buildMany(5, buildUser);
type BalanceResult = { username: string; balance: number };

async function fetchBalance(user: User): Promise<BalanceResult> {
    await sleep(200);

    return {
        username: user.username,
        balance: 100,
    };
}
const sequentialResults: Array<BalanceResult> = [];
const startSequential = performance.now();

for (const user of users) {
    sequentialResults.push(await fetchBalance(user));
}

const sequentialTime = performance.now() - startSequential;

console.log(`Sequential: ${Math.round(sequentialTime)} ms`);
console.log(JSON.stringify(sequentialResults, null, 2));

const startParallel = performance.now();

const parallelResults = await Promise.all(
    users.map((user) => fetchBalance(user)),
);

const parallelTime = performance.now() - startParallel;

console.log(`Parallel: ${Math.round(parallelTime)} ms`);
console.log(JSON.stringify(parallelResults, null, 2));
