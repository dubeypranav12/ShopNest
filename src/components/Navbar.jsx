export default function Navbar({
  searchText,
  onSearchChange,
  cartCount,
  onCartClick,
  onHomeClick,
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <button type="button" className="logo" onClick={onHomeClick}>
          ShopNest
        </button>

        <form className="navbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="product-search" className="visually-hidden">
            Search products by name or category
          </label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products or categories..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </form>

        <div className="navbar-actions">
          <button type="button" className="icon-button" onClick={onCartClick} aria-label={`Open cart, ${cartCount} items`}>
            <span aria-hidden="true">🛒</span>
            <span className="cart-badge" aria-hidden="true">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
