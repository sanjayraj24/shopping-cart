# Shopping Cart Project Workflow

This document explains the full workflow of the `shopping-cart` project. It is designed for beginners to understand how the app starts, how state is managed, how products are displayed, how discounts are calculated, and how optional Firebase persistence works.

---

## 1. App overview

This is a React shopping cart app built with Vite. Users can:
- view available products,
- add products to a basket,
- increase or decrease product quantities,
- see discounts applied automatically,
- view subtotal, savings, and total cost.

The app also supports optional Firebase Firestore persistence, so the basket can be loaded and saved across page reloads.

---

## 2. Technology stack

- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- Firebase Firestore (optional)
- Vitest (unit tests)

---

## 3. Project structure

Important folders and files:

- `src/`
  - `main.jsx` — app entry point
  - `App.jsx` — top-level layout and hook usage
  - `components/` — UI components
    - `Products.jsx`
    - `ProductItem.jsx`
    - `Basket.jsx`
    - `BasketItem.jsx`
  - `store/` — Redux state setup
    - `store.js`
    - `cartSlice.js`
  - `utils/` — business logic
    - `calculateBill.js`
    - `formatMoney.js`
  - `firebase/` — data persistence
    - `config.js`
    - `productService.js`
    - `saveBasket.js`
  - `hooks/`
    - `useFirebaseSync.js`
  - `data/`
    - `products.js`
    - `offers.js`

---

## 4. How the app starts

### `src/main.jsx`

This file mounts the React app into the browser page. It also connects the app to Redux state.

Key steps:
1. Load React and ReactDOM.
2. Import the Redux store from `src/store/store.js`.
3. Wrap the app in `<Provider store={store}>`.
4. Render `<App />` inside the HTML element with id `root`.

### `src/App.jsx`

This file defines the main page structure.

Behavior:
- Calls `useFirebaseSync()` to load saved basket data and keep the basket saved on every change.
- Renders the page layout with two sections:
  - `<Products />` on the left
  - `<Basket />` on the right

The overall layout is simple and responsive.

---

## 5. State management with Redux

### `src/store/store.js`

This file creates the Redux store.

It configures one reducer:
- `cart` managed by `cartSlice`

### `src/store/cartSlice.js`

This file defines the cart state and actions.

State shape:
```js
{
  items: {},
}
```

Each cart item is stored by product id, for example:
```js
{ bread: 2, cheese: 1 }
```

Reducers:
- `addItem(id)` — add one item or increase quantity
- `increaseQty(id)` — increase quantity
- `decreaseQty(id)` — decrease quantity or remove item
- `clearCart()` — empty the basket
- `setCart(items)` — replace the whole cart with saved data

This makes cart operations fast and simple.

---

## 6. Product loading and display

### `src/components/Products.jsx`

This component loads the product list and renders it.

Behavior:
- Uses `useState` to hold products.
- Uses `useEffect` to load products when the component mounts.
- Calls `getProducts()` from `src/firebase/productService.js`.
- Displays each product with the `<ProductItem />` component.

### `src/firebase/productService.js`

This file decides where product data comes from.

Behavior:
- If Firebase is configured, fetch products from Firestore.
- If Firebase is not configured or fails, load static product data from `src/data/products.js`.

This means the app works even if Firebase is not set up.

### `src/components/ProductItem.jsx`

This component shows a single product card.

It displays:
- product name
- product price
- an `Add` button

When the user clicks `Add`, it dispatches `addItem(product.id)` to Redux.

---

## 7. Basket display and user actions

### `src/components/Basket.jsx`

This component shows the current basket and totals.

Behavior:
- Reads `cartItems` from Redux using `useSelector`.
- Calls `calculateBill(cartItems)` to compute pricing, discounts, and totals.
- Shows each item using `<BasketItem />`.
- Displays subtotal, savings, and total.
- Adds a `Clear all` button when there are items.

### `src/components/BasketItem.jsx`

This component shows one item in the basket.

It displays:
- product name
- unit price
- quantity controls (+ / -)
- subtotal for that line
- savings for that item
- final cost for that line

The buttons dispatch `increaseQty` and `decreaseQty` actions.

---

## 8. Calculating the bill and discounts

### `src/utils/calculateBill.js`

This file contains the core pricing logic.

It performs three steps:
1. Build a line-by-line summary for every product in the cart.
2. Apply discount offers.
3. Return subtotal, savings, total, and item details.

### Discount rules in this app

The app supports these offers:
- `Cheese` — buy one, get one free
- `Soup + Bread` — each soup makes one bread half price
- `Butter` — 33% off

### How it works

For each product in the cart:
- compute `unitPrice` and `lineSubtotal`
- add that data to the breakdown object

Then apply each offer function:
- `applyCheeseBogof()`
- `applySoupBreadOffer()`
- `applyButterDiscount()`

Each offer updates the line totals and records the saving.

Finally, the function returns:
- `subtotal`
- `appliedOffers`
- `totalSavings`
- `total`
- `items` for display

This is how the basket shows both normal costs and discount savings.

---

## 9. Optional Firebase basket sync

### `src/hooks/useFirebaseSync.js`

This hook keeps the cart synchronized with Firestore.

Behavior:
- On first render, call `loadBasket()` to load saved cart data.
- If saved cart data exists, dispatch `setCart(savedCart)`.
- Every time the cart changes, call `saveBasket(cartItems)`.

### `src/firebase/saveBasket.js`

This file saves and loads the basket from Firestore.

It uses:
- `getDoc()` to read the saved basket
- `setDoc()` to write the basket

If Firebase is not configured, both functions do nothing.

### Why this is useful

If you refresh the page, the saved basket can come back automatically.
That makes the cart feel persistent across browser reloads.

---

## 10. How the user interacts with the app

1. Open the web app in the browser.
2. The product list loads.
3. Click `Add` on a product to put it into the basket.
4. The basket updates immediately.
5. Use `+` and `-` inside the basket to change quantities.
6. Discounts appear automatically in the totals.
7. If Firebase is enabled, the basket saves automatically.

These steps are handled by React UI components, Redux state, and the billing logic.

---

## 11. Running the project

From the project folder:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in the browser.

Run tests:

```bash
npm test
```

---

## 12. Where to make changes

If you want to add a new product:
- update `src/data/products.js`
- optionally add the product document in Firestore if using Firebase

If you want to add a new offer:
- update `src/data/offers.js`
- add a new offer function in `src/utils/calculateBill.js`
- update the bill logic so it applies the offer correctly

If you want to change the layout:
- update `src/App.jsx`
- update the component files in `src/components/`

If you want to change persistence behavior:
- update `src/firebase/config.js`
- change `src/hooks/useFirebaseSync.js`
- update `src/firebase/saveBasket.js`

---

## 13. Beginner tips

- `React` renders the UI based on state.
- `Redux` stores the cart in a central place.
- `useEffect()` runs code when components mount or state changes.
- `dispatch(action)` tells Redux to update state.
- `calculateBill()` is where the cost calculation lives.
- `Firebase` is optional; the app works without it.

If you are new to React, focus first on the components and how they use props and state.
If you are new to Redux, focus on `cartSlice.js` and `store.js`.

---

## 14. Summary

This app combines UI, state, pricing rules, and optional cloud persistence.
The clean separation of responsibilities makes it easy to understand:
- `components/` build the screen,
- `store/` stores the cart,
- `utils/` calculates prices,
- `firebase/` handles saved data,
- `hooks/` connects sync behavior to React.

That is the full workflow from a beginner perspective.
