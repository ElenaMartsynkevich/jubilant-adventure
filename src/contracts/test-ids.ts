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

type Groups = (typeof TEST_IDS)[keyof typeof TEST_IDS];

type ValuesOf<T> = T extends unknown ? T[keyof T] : never;

export type TestId = ValuesOf<Groups>;
