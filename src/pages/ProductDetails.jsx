import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/productApi.js';
import {
  formatCategory,
  formatPrice,
  getDiscountedPrice,
  getStarString,
} from '../utils/productUtils.js';

export default function ProductDetails({ productId, onBack, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [quantity, setQuantity] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function loadProduct() {
      setStatus('loading');
      try {
        const data = await fetchProductById(productId);
        if (!ignore) {
          setProduct(data);
          setStatus('success');
        }
      } catch {
        if (!ignore) setStatus('error');
      }
    }
    loadProduct();
    return () => {
      ignore = true;
    };
  }, [productId, reloadKey]);

  if (status === 'loading') {
    return <p className="status-message">Loading product details...</p>;
  }

  if (status === 'error') {
    return (
      <div className="status-message error" role="alert">
        <p>Unable to load this product. Please try again.</p>
        <button type="button" className="btn btn-primary" onClick={() => setReloadKey((k) => k + 1)}>
          Retry
        </button>
        <button type="button" className="btn btn-outline" onClick={onBack}>
          Back to products
        </button>
      </div>
    );
  }

  const { title, description, category, brand, price, discountPercentage, rating, stock, tags, thumbnail, images } =
    product;
  const finalPrice = getDiscountedPrice(price, discountPercentage);
  const inStock = stock > 0;
  const mainImage = images?.[0] || thumbnail;

  function changeQuantity(next) {
    setQuantity(Math.min(Math.max(1, next), Math.max(1, stock)));
  }

  return (
    <article className="details">
      <button type="button" className="btn btn-outline back-button" onClick={onBack}>
        ← Back to products
      </button>

      <div className="details-layout">
        <div className="details-image">
          <img src={mainImage} alt={title} />
        </div>

        <div className="details-info">
          <p className="card-category">
            {formatCategory(category)}
            {brand && <> • {brand}</>}
          </p>
          <h1>{title}</h1>

          <p className="card-rating">
            <span aria-hidden="true" className="stars">{getStarString(rating)}</span>
            <span>{rating.toFixed(1)} / 5</span>
          </p>

          <div className="card-price large">
            <span className="price-now">{formatPrice(finalPrice)}</span>
            {discountPercentage > 0 && (
              <>
                <span className="price-old">{formatPrice(price)}</span>
                <span className="discount-badge">{Math.round(discountPercentage)}% off</span>
              </>
            )}
          </div>

          <p className={`stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? `In stock (${stock} available)` : 'Out of stock'}
          </p>

          <p className="details-description">{description}</p>

          {tags?.length > 0 && (
            <ul className="tag-list" aria-label="Product tags">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          <div className="details-actions">
            <div className="quantity-control" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => changeQuantity(quantity - 1)}
                disabled={quantity <= 1 || !inStock}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => changeQuantity(quantity + 1)}
                disabled={quantity >= stock || !inStock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              disabled={!inStock}
              onClick={() => onAddToCart(product, quantity)}
            >
              {inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
