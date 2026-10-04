const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(value) {
  return currencyFormatter.format(value);
}

/** Returns the price after applying the API's discountPercentage. */
export function getDiscountedPrice(price, discountPercentage = 0) {
  return price * (1 - discountPercentage / 100);
}

/** Turns "mens-shirts" into "Mens Shirts". */
export function formatCategory(slug = '') {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Builds a five-character star string from a rating such as 4.3. */
export function getStarString(rating = 0) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full));
}

/**
 * Returns a NEW sorted array so the original API state is never mutated.
 * Price sorting uses the discounted price the customer actually pays.
 */
export function sortProducts(products, sortBy) {
  const list = [...products];
  switch (sortBy) {
    case 'price-asc':
      return list.sort(
        (a, b) =>
          getDiscountedPrice(a.price, a.discountPercentage) -
          getDiscountedPrice(b.price, b.discountPercentage)
      );
    case 'price-desc':
      return list.sort(
        (a, b) =>
          getDiscountedPrice(b.price, b.discountPercentage) -
          getDiscountedPrice(a.price, a.discountPercentage)
      );
    case 'rating-desc':
      return list.sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
}
