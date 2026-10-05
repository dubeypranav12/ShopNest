import {
  formatCategory,
  formatPrice,
  getDiscountedPrice,
  getStarString,
} from '../utils/productUtils.js';

export default function ProductCard({ product, onSelect, onAddToCart }) {
  const { id, title, category, rating, price, discountPercentage, stock, thumbnail } = product;
  const finalPrice = getDiscountedPrice(price, discountPercentage);
  const inStock = stock > 0;

  return (
    <article className="product-card">
      <button
        type="button"
        className="card-image"
        onClick={() => onSelect(id)}
        aria-label={`View details for ${title}`}
      >
        <img src={thumbnail} alt={title} loading="lazy" />
      </button>

      <div className="card-body">
        <p className="card-category">{formatCategory(category)}</p>

        <h3 className="card-title">
          <button type="button" className="link-button" onClick={() => onSelect(id)}>
            {title}
          </button>
        </h3>

        <p className="card-rating">
          <span aria-hidden="true" className="stars">{getStarString(rating)}</span>
          <span>{rating.toFixed(1)} / 5</span>
        </p>

        <div className="card-price">
          <span className="price-now">{formatPrice(finalPrice)}</span>
          {discountPercentage > 0 && (
            <>
              <span className="price-old">{formatPrice(price)}</span>
              <span className="discount-badge">{Math.round(discountPercentage)}% off</span>
            </>
          )}
        </div>

        <p className={`stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          {inStock ? `In stock (${stock})` : 'Out of stock'}
        </p>

        <button
          type="button"
          className="btn btn-primary card-add"
          disabled={!inStock}
          onClick={() => onAddToCart(product)}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  );
}
