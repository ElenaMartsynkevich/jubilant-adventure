export const TEST_IDS = {
    login: {
        signInButton: 'login-sign-in-button',
        ordersLink: 'login-orders-link',
        error: 'login-error',
        emailError: 'login-email-error',
        passwordError: 'login-password-error',
    },
    products: {
        searchButton: 'products-search-button',
        tryAgainButton: 'products-try-again-button',
        clearFiltersButton: 'products-clear-filters-button',
        // prefix: append "-<id>" in the test
        price: 'products-price',
        addToCartButton: 'products-add-to-cart-button',
        // prefix: append "-<id>" in the test
        productCard: 'products-product-card',
        productList: 'products-product-list',
        loadingState: 'products-loading',
        emptyState: 'products-empty',
        catalogError: 'products-catalog-error',
        previousButton: 'products-previous-button',
        nextButton: 'products-next-button',
    },
    checkout: {
        emailError: 'checkout-email-error',
        error: 'checkout-error',
    },
} as const;

// Union of every test ID value, derived from TEST_IDS
export type TestId = {
    [Group in keyof typeof TEST_IDS]: (typeof TEST_IDS)[Group][keyof (typeof TEST_IDS)[Group]];
}[keyof typeof TEST_IDS];
