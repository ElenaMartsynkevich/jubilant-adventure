# Locator inventory

Locators are listed in order of preference: role and accessible name, test ID, CSS.
Test IDs use `data-testid` (Playwright default, no custom `testIdAttribute`).

## LoginPage (`/login`)

| Element | Action | Preferred locator | Fallback | Notes |
|---|---|---|---|---|
| Email field | type | `getByRole('textbox', { name: 'Email' })` | `getByLabel('Email')` | label wraps the input |
| Password field | type | `getByRole('textbox', { name: 'Password' })` | `getByLabel('Password')` | label wraps the input; verified with Playwright codegen |
| Sign in button | click | `getByRole('button', { name: 'Sign in' })` |  `getByTestId` (not in product yet) | name changes to "Signing in..." and the button is disabled while loading |
| Sign in heading | assert visible | `getByRole('heading', { name: 'Sign in' })` | `locator('#login-title')` | same text as the button, but a different role, so no conflict |
| General sign-in error | assert text | `getByRole('alert')` | CSS `.auth-error` | `role="alert"` but no accessible name; text is dynamic ("Sign in failed."); ambiguous when field errors are visible too, so filter by text or add a test ID; text comes from the API (fallback “Sign in failed.”) |
| Email field error | assert text | `getByRole('alert')` | CSS `#email-error` | rendered only when the API returns a field error for `email`; cleared on each submit; text comes from the server; `role="alert"` but no accessible name |
| Password field error | assert text | `getByRole('alert')` | CSS `#password-error` | same as email: server-provided text, no accessible name, up to three alerts on screen at once |
| Orders link | click | `getByRole('link', { name: 'View orders' })` | `getByTestId` (not in product yet) | only when already signed in |

### No reliable option

-  Field errors (email, password) and the general sign-in error: all three are `role="alert"` without an accessible name, and the text comes from the server. When several are visible at once, role alone cannot tell them apart. Request test IDs for each.


## ProductsPage (`/`)

| Element | Action | Preferred locator | Fallback | Notes |
|---|---|---|---|---|
| Find your next favorite heading | assert visible | `getByRole('heading', { name: 'Find your next favorite' })` | `locator('#catalog-title')` | text is static |
| Search products searchbox | type | `getByRole('searchbox', { name: 'Search products' })` | `getByPlaceholder('Search by name or description')` | Search by name or description is a placeholder |
| Category select combobox | selectOption | `getByRole('combobox', { name: 'Category' })` | `getByLabel('Category')` | Category is a drop-down field |
| Sort by select combobox | selectOption | `getByRole('combobox', { name: 'Sort by' })` | `getByLabel('Sort by')` | Sort by is a drop-down field with selected value 'Name' by default |
| Direction select combobox | selectOption | `getByRole('combobox', { name: 'Direction' })` | `getByLabel('Direction')` | Direction is a drop-down field with selected value 'Ascending' by default |
| Search button | click | `getByRole('button', { name: 'Search' })` |  `getByTestId` (not in product yet); `locator('form.catalog-controls button[type="submit"]')` | submit-button for filters |
| Catalog error block alert | assert block | `getByRole('alert')`  | `locator('.catalog-state--error')` | alert is without name |
| Catalog unavailable heading | assert visible | `getByRole('heading', { name: 'Catalog unavailable' })` | `locator('.catalog-state--error h2')` | block appears if there is an error during loading |
| Catalog unavailable hint | assert visible | no reliable option | `locator('.catalog-state--error p')` | text comes from the API, so do not match on it |
| Try again button | click | `getByRole('button', { name: 'Try again' })` |  `getByTestId` (not in product yet) | retries the catalog request |
| Loading state block | assert visible | `getByTestId` (not in product yet) | `locator('[aria-busy="true"]')` | shown while products load; no role and no accessible name; from code |
| No products found heading | assert visible | `getByRole('heading', { name: 'No products found' })` | `locator('.catalog-state h2')` | shown when the search returns no items |
| Clear filters button | click | `getByRole('button', { name: 'Clear filters' })` | `getByTestId` (not in product yet) | resets search and category; sort and direction stay as they are |
| Empty state block | assert visible | `getByTestId` (not in product yet) | `locator('.catalog-state')` | no role and no accessible name; not announced to screen readers |
| Product Card Label paragraph | assert visible | no reliable option | `locator('.product-card .eyebrow')` | category label, differs per card; the DOM text is lowercase (home), CSS shows it uppercase |
| Product link | click | `getByRole('link', { name: 'Comet Mug' })` | CSS `.product-card h2 a` | name is the product name; href is /products/<id>; scope to a card when product names can repeat |
| Price strong | assert visible | `getByRole('listitem').filter({ hasText: '<product name>' }).getByText('US$12.99')` | `getByTestId('product-price')` (not in product yet) | price depends on the product; formatted, locale-dependent (US$12.99)|
| Add to cart button | click | `getByRole('listitem').filter({ hasText: '<product name>' }).getByRole('button', { name: 'Add to cart' })` | `getByTestId` (not in product yet) | same name on every card; must be scoped to a card |
| Product Card listitem | assert visible | `getByRole('list', { name: 'Product results' }).getByRole('listitem').filter({ hasText: '<product name>' })` | `getByTestId('product-card-<id>')` (not in product yet); CSS `.product-card` | one item per product; no unique accessible name, scope by the product name; test ID with the product id would be stable |
| Product Result list | assert visible | `getByRole('list', { name: 'Product results' })` | `getByTestId('product-list')` (not in product yet) | not rendered when the result is empty (the empty state is shown instead) |
| Catalog pagination navigation | assert visible | `getByRole('navigation', { name: 'Catalog pagination' })` | `locator('nav.pagination')` | rendered whenever the results list is shown, also for a single page |
| Next button | click | `getByRole('button', { name: 'Next' })` | `locator('nav.pagination button')` | disabled if only 1 page is displayed; matches both buttons, they differ only by position; need to use getByTestId |
| Previous button | click | `getByRole('button', { name: 'Previous' })` | `locator('nav.pagination button')` | disabled if only 1 page is displayed; matches both buttons, they differ only by position; need to use getByTestId |

### No reliable option

- Catalog Alert Block: role="alert" is without name, text is coming from API;
- Loading state: aria-busy, without Role, without Name;
- Live area sr-only: no status of roles, text is changing;
- Empty result block: no role, no name;
- Hint Updating results...: (aria-hidden), available only via text, CSS;
- repeatable cards and buttons Add to cart: same name, different by text, it is necessary to have test ID;
- Category, Price: text without role;
- Previous and Next buttons: it is necessary to have test ID.

## CheckoutPage (`/checkout`)

### State 1: not signed in

| Element | Action | Preferred locator | Fallback | Notes |
|---|---|---|---|---|
| Sign in before checkout heading | assert visible | `getByRole('heading', { name: 'Sign in before checkout' })` | `locator('.checkout-page h1')` | shown when a user is not logged-in |
| Sign in link | click | `getByRole('link', { name: 'Sign in' })` | `locator('a.button[href="/login"]')` | link that looks like a button |

### State 2: signed in, order form

| Element | Action | Preferred locator | Fallback | Notes |
|---|---|---|---|---|
| Complete your order heading | assert visible | `getByRole('heading', { name: 'Complete your order' })` | `locator('#checkout-title')` | shown when a user is logged-in; doesn't matter if there is an item in a cart or not|
| Email for order updates textbox | type | `getByRole('textbox', { name: 'Email for order updates' })` | `getByLabel('Email for order updates')` | pre-filled with the signed-in user’s email, can be changed |
| Place order button | click | `getByRole('button', { name: 'Place order' })` | `locator('form.checkout-form button[type="submit"]')` | enabled ; text is not changed after clicking |
| Email required alert | assert | `getByRole('alert').filter({ hasText: 'Email is required.' })`  | `locator('.field-error')` | alert is without name; error shows if Email field is empty |
| Checkout error block alert | assert visible | `getByRole('alert').filter({ hasText: 'Checkout was not completed.' })` | `locator('.checkout-error')` | Checkout was not completed is static; Authentication is required is coming from API; Your cart was kept. You can retry this same attempt is static |

### No reliable option

- Email and checkout alerts: `role="alert"` without an accessible name; when both are visible, role alone cannot tell them apart. Request test IDs for each.
- Server message inside `.checkout-error` (`Authentication is required`): text comes from the API, so no reliable option.

## Agreements

Proposed rules for the team discussion. Update this section with whatever the team decides.

Request list for developers: https://github.com/ElenaMartsynkevich/jubilant-adventure/issues/7

- Add a test ID where there is no reliable role and accessible name: alerts, loading and empty-state blocks, repeated elements, and the Previous/Next buttons.
- Format: `page-element` in kebab-case (for example `login-error`).
- Repeated elements get an `-<id>` suffix (for example `product-card-<id>`).