export function buildMany<T>(count: number, factory: () => T): T[] {
    const result: T[] = [];

    for (let i = 0; i < count; i++) {
        result.push(factory());
    }

    return result;
}
