import { useEffect, useMemo, useState } from 'react';
import Filters from '../components/Filters.jsx';
import ProductList from '../components/ProductList.jsx';
import { fetchCategories, fetchProducts } from '../services/productApi.js';
import { sortProducts } from '../utils/productUtils.js';

export default function Home({ searchText, onProductSelect, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Fetch products and categories on mount (and again on retry).
  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setStatus('loading');
      try {
        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        if (ignore) return;
        setProducts(productData);
        setCategories(categoryData);
        setStatus('success');
      } catch {
        if (!ignore) setStatus('error');
      }
    }

    loadData();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  // Derive the visible list: search and category work together, then sort.
  const visibleProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    return sortProducts(filtered, sortBy);
  }, [products, searchText, selectedCategory, sortBy]);

  const selectedCategoryName =
    selectedCategory === 'all'
      ? null
      : categories.find((c) => c.slug === selectedCategory)?.name ?? selectedCategory;

  return (
    <>
      <section className="store-heading">
        <h1>Discover Your Next Favourite Find</h1>
        <p>Browse, compare and add the products you love to your cart in a few clicks.</p>
      </section>

      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={visibleProducts.length}
        selectedCategoryName={selectedCategoryName}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen((open) => !open)}
      />

      {status === 'loading' && <p className="status-message">Loading products...</p>}

      {status === 'error' && (
        <div className="status-message error" role="alert">
          <p>Unable to load products. Please try again.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Retry
          </button>
        </div>
      )}

      {status === 'success' && visibleProducts.length === 0 && (
        <p className="status-message">
          No products found. Try a different search term or category.
        </p>
      )}

      {status === 'success' && visibleProducts.length > 0 && (
        <ProductList
          products={visibleProducts}
          onSelect={onProductSelect}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
