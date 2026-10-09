export function parseAmount(text) {
    const noCurrency = text.replace(/[^\d.,-]/g, '');
    let cleaned;

    if (text.includes('€')) {
        cleaned = noCurrency.replace(/\./g, '').replace(',', '.');
    } else if (text.includes('$')) {
        cleaned = noCurrency.replace(/,/g, '');
    } else {
        throw new Error(`parseAmount: can't recognize currency in "${text}"`);
    }
    return Number(cleaned);
}
