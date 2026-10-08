import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Cart from './components/Cart.jsx';
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

const CART_STORAGE_KEY = 'shopnest-cart';

function loadCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Top-level state: cart, navigation between Home and product details,
 * the shared search text, and toast notifications.
 */
export default function App() {
  const [cart, setCart] = useState(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Persist the cart so it survives page reloads.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Auto-hide toast notifications.
  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setToastMessage(`${product.title} added to cart`);
  }

  function changeQuantity(productId, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function openProduct(id) {
    setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goHome() {
    setSelectedProductId(null);
  }

  function handleSearchChange(value) {
    setSearchText(value);
    setSelectedProductId(null);
  }

  return (
    <>
      <Navbar
        searchText={searchText}
        onSearchChange={handleSearchChange}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={goHome}
      />

      <main className="container">
        {selectedProductId ? (
          <ProductDetails
            key={selectedProductId}
            productId={selectedProductId}
            onBack={goHome}
            onAddToCart={addToCart}
          />
        ) : (
          <Home
            searchText={searchText}
            onProductSelect={openProduct}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
      />

      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
