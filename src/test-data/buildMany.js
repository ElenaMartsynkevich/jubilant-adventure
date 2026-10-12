export function buildMany(count, factory) {
    const result = [];

    for (let i = 0; i < count; i++) {
        result.push(factory());
    }

    return result;
}
