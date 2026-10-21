import { setTimeout as sleep } from 'node:timers/promises';
import { buildMany, buildUser } from '../src/test-data/index.js';

const users = buildMany(5, buildUser);

async function fetchBalance(user) {
    await sleep(200);

    return {
        username: user.username,
        balance: 100,
    };
}

const sequentialResults = [];
const startSequential = performance.now();
for (const user of users) {
    sequentialResults.push(await fetchBalance(user));
}

const sequentialTime = performance.now() - startSequential;

process.stdout.write(`Sequential: ${Math.round(sequentialTime)} ms\n`);
process.stdout.write(`${JSON.stringify(sequentialResults, null, 2)}\n`);

const startParallel = performance.now();

const parallelResults = await Promise.all(
    users.map((user) => fetchBalance(user)),
);

const parallelTime = performance.now() - startParallel;

process.stdout.write(`Parallel: ${Math.round(parallelTime)} ms\n`);
process.stdout.write(`${JSON.stringify(parallelResults, null, 2)}\n`);
