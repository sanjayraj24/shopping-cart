# Shopping Cart

A simple React shopping cart app built with Vite and Redux Toolkit. Add products to your basket and the app calculates the bill with special offers applied.

## Products

| Product | Price |
|---------|-------|
| Bread   | £1.10 |
| Milk    | £0.50 |
| Cheese  | £0.90 |
| Soup    | £0.60 |
| Butter  | £1.20 |

## Special Offers

- **Cheese** — Buy one, get one free
- **Soup + Bread** — Buy a soup and get one bread half price
- **Butter** — 33% off

## Tech Stack

- React (TypeScript)
- Vite
- Redux Toolkit
- Tailwind CSS
- Vitest (unit tests)
- Firebase Firestore (optional persistence)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Run Tests

```bash
npm test
```

## Firebase Setup (optional)

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database**
3. Copy your web app config into `src/firebase/config.js`
4. The basket will auto-save when you add or remove items

If Firebase is not configured, the app still works — it just skips saving.

## Project Structure

```
src/
  components/     UI components
  data/           Products and offers
  firebase/       Firestore save/load
  hooks/          Custom hooks
  store/          Redux store and cart slice
  utils/          Bill calculation logic
  test/           Unit tests
```
