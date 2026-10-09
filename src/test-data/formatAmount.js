export function formatAmount(value, currency) {
    let symbol;
    const [integerPart, decimalPart] = value.toFixed(2).split('.');
    const groupedInteger = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        currency === 'EUR' ? ' ' : ',',
    );

    if (currency === 'EUR') {
        symbol = '€';
        return `${symbol}${groupedInteger},${decimalPart}`;
    } else if (currency === 'USD') {
        symbol = '$';
        return `${symbol}${groupedInteger}.${decimalPart}`;
    } else {
        throw new Error(
            `formatAmount: can't recognize currency in "${currency}"`,
        );
    }
}
