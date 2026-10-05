export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
];

export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
  selectedCategoryName,
  isOpen,
  onToggle,
}) {
  return (
    <section className="filters" aria-label="Filter and sort products">
      <button
        type="button"
        className="filters-toggle"
        aria-expanded={isOpen}
        aria-controls="filters-panel"
        onClick={onToggle}
      >
        {isOpen ? 'Hide filters' : 'Show filters & sort'}
      </button>

      <div id="filters-panel" className={`filters-panel ${isOpen ? 'open' : ''}`}>
        <div className="field">
          <label htmlFor="category-select">Category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All Products</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort-select">Sort by</label>
          <select id="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <p className="result-count" aria-live="polite">
          Showing <strong>{resultCount}</strong> {resultCount === 1 ? 'product' : 'products'}
          {selectedCategoryName && (
            <>
              {' '}in <strong>{selectedCategoryName}</strong>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
