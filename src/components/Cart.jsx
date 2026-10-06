import { useState } from 'react';
import { formatPrice, getDiscountedPrice } from '../utils/productUtils.js';

export default function Cart({ isOpen, items, onClose, onChangeQuantity, onRemove }) {
  const [checkoutNotice, setCheckoutNotice] = useState('');

  const subtotal = items.reduce(
    (sum, item) =>
      sum + getDiscountedPrice(item.product.price, item.product.discountPercentage) * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
      >
        <header className="cart-header">
          <h2 id="cart-title">Your Cart ({itemCount})</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a product to get started.</p>
        ) : (
          <ul className="cart-list">
            {items.map(({ product, quantity }) => {
              const unitPrice = getDiscountedPrice(product.price, product.discountPercentage);
              return (
                <li key={product.id} className="cart-item">
                  <img src={product.thumbnail} alt="" />
                  <div className="cart-item-info">
                    <p className="cart-item-title">{product.title}</p>
                    <p className="cart-item-price">{formatPrice(unitPrice)} each</p>

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(product.id, -1)}
                        disabled={quantity <= 1}
                        aria-label={`Decrease quantity of ${product.title}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(product.id, 1)}
                        disabled={quantity >= product.stock}
                        aria-label={`Increase quantity of ${product.title}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="link-button remove-button"
                      onClick={() => onRemove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="cart-item-total">{formatPrice(unitPrice * quantity)}</p>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 && (
          <footer className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="cart-total grand">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() =>
                setCheckoutNotice('Checkout is not enabled in this demo storefront.')
              }
            >
              Proceed to Checkout
            </button>
            {checkoutNotice && <p className="checkout-notice">{checkoutNotice}</p>}
          </footer>
        )}
      </aside>
    </>
  );
}
