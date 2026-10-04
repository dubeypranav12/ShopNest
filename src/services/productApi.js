import { formatCategory } from '../utils/productUtils.js';

const PRODUCTS_URL = 'https://dummyjson.com/products';

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

/** Fetch the full product catalogue (limit=0 returns every product). */
export async function fetchProducts() {
  const data = await request(`${PRODUCTS_URL}?limit=0`);
  return data.products;
}

/** Fetch the list of category slugs and normalise them to { slug, name }. */
export async function fetchCategories() {
  const data = await request(`${PRODUCTS_URL}/categories`);
  return data.map((item) =>
    typeof item === 'string'
      ? { slug: item, name: formatCategory(item) }
      : { slug: item.slug, name: item.name }
  );
}

/** Fetch a single product by id. */
export async function fetchProductById(id) {
  return request(`${PRODUCTS_URL}/${id}`);
}
