# ShopNest – E-Commerce Product Page

A responsive React storefront built with **React + Vite** that consumes real product data from the public **DummyJSON** REST API. Users can browse products, search, filter by category, sort, open product details, and manage a shopping cart.

## Features

- Products loaded from the API on mount, with loading, error (with Retry), and empty states
- Reusable `ProductCard` components rendered with `map()`
- Search by product name or category (case-insensitive)
- Category filter loaded from the API, with an "All Products" reset
- Search and category work together
- Sorting: Default, Price Low→High, Price High→Low, Rating High→Low (sorts a copy, never mutates API state)
- Product details view (large image, description, brand, price and discount, rating, stock, tags, quantity selector, Add to Cart)
- Shopping cart drawer: add (duplicates increase quantity), increase/decrease quantity, remove items, live subtotal and total
- Cart count in the navbar, toast notification after Add to Cart
- Cart persisted in `localStorage`
- Mobile filter panel that collapses into a toggle
- Keyboard-accessible controls with labels and visible focus states

## Tech Stack

- React 18 (Hooks: `useState`, `useEffect`, `useMemo`)
- Vite
- JavaScript (ES6+)
- CSS3 (custom properties, CSS Grid, media queries)
- Fetch API

## API Endpoints Used

| Purpose | Endpoint |
| --- | --- |
| All products | `GET https://dummyjson.com/products?limit=0` |
| Categories | `GET https://dummyjson.com/products/categories` |
| Single product | `GET https://dummyjson.com/products/{id}` |

API documentation: https://dummyjson.com/docs/products

## Project Structure

```
src/
├── components/   Navbar, Filters, ProductCard, ProductList, Cart
├── pages/        Home, ProductDetails
├── services/     productApi.js  (all fetch calls)
├── utils/        productUtils.js (price, sort, formatting helpers)
├── App.jsx       App-level state: cart, navigation, search text
├── main.jsx      React entry point
└── index.css     Global and responsive styles
```

## Installation and Run

Requirements: Node.js 18 or newer.

```bash
# 1. Enter the project folder
cd "Task 5 AWS E-commerce web app"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL Vite prints, usually http://localhost:5173/.

To create a production build:

```bash
npm run build
npm run preview
```

## Deploying on AWS

The app is a static site, so the `dist/` folder produced by `npm run build` can be hosted on AWS in either of these ways:

- **AWS Amplify Hosting:** connect the GitHub repository, use `npm run build` as the build command and `dist` as the output directory.
- **Amazon S3 + CloudFront:** create an S3 bucket with static website hosting, upload the contents of `dist/`, and place a CloudFront distribution in front of it.

## Screenshots

_Add screenshots of the running application here (for example `docs/home.png`, `docs/details.png`, `docs/cart.png`)._

## Live Demo

_Add the deployed URL here._

## GitHub Repository

_Add the repository link here._
