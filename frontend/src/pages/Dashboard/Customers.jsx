import { useMemo, useState } from 'react'

const categories = ['All Products', 'Sun Screen', 'Serum', 'Sheet Mask', 'Cleanser']

const products = [
  { name: 'Beauty Of Joseon SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#f6eee8' },
  { name: 'Round Lab SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#e8f3fb' },
  { name: 'Cellimax SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#fff2cf' },
  { name: 'Innisfree SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#f5f5f5' },
  { name: 'Thank You Farmer SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#dff4f8' },
  { name: 'Melixir SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#edf1f5' },
  { name: 'Innisfree Mineral SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#eef4ff' },
  { name: 'Cosrx Aloe SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#e7f6e8' },
  { name: 'Skin1004 Sun Serum', category: 'Serum', price: 12.0, stock: 200, tone: '#eff7f8' },
  { name: 'Axis-y SC', category: 'Sun Screen', price: 5.99, stock: 200, tone: '#edf7f0' },
  { name: 'Purito Daily Go-To', category: 'Sun Screen', price: 8.5, stock: 180, tone: '#edf6e5' },
  { name: 'Anua Heartleaf Serum', category: 'Serum', price: 14.25, stock: 92, tone: '#fff4e1' },
  { name: 'Blue Hyaluronic Mask', category: 'Sheet Mask', price: 2.5, stock: 340, tone: '#dfeafe' },
  { name: 'Low PH Gel Cleanser', category: 'Cleanser', price: 7.75, stock: 145, tone: '#edf4ff' },
  { name: 'Rice Glow Cleanser', category: 'Cleanser', price: 9.0, stock: 120, tone: '#fff7dc' },
]

function ProductVisual({ tone, category }) {
  const isMask = category === 'Sheet Mask'

  return (
    <div className={`customer-product-visual ${isMask ? 'mask' : ''}`} style={{ '--product-tone': tone }}>
      <span />
      <strong>{category === 'Serum' ? 'SERUM' : category === 'Cleanser' ? 'CLEANSER' : 'SPF'}</strong>
      <em />
    </div>
  )
}

export default function Customers() {
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All Products' || product.category === activeCategory
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.name === product.name)

      if (existingItem) {
        return items.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...items, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productName, amount) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(productName) {
    setCartItems((items) => items.filter((item) => item.name !== productName))
  }

  return (
    <section className="customer-pos-page">
      <div className="customer-pos-shell">
        <header className="customer-pos-header">
          <div className="customer-brand">
            <span className="customer-brand-icon">POS</span>
            <strong>POS SOMROS</strong>
          </div>

          <div className="customer-mode">Customer Order</div>
        </header>

        <div className="customer-controls">
          <label>
            Customer
            <select defaultValue="walk-in">
              <option value="walk-in">Walk in customer</option>
              <option value="member">Member customer</option>
            </select>
          </label>

          <label>
            Promotion
            <select defaultValue="none">
              <option value="none">No Promotion</option>
              <option value="member">Member Discount</option>
            </select>
          </label>
        </div>

        <main className="customer-pos-body">
          <section className="customer-products-panel" aria-label="Product catalog">
            <div className="customer-search">
              <span>Search</span>
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Product..."
                type="search"
                value={searchTerm}
              />
            </div>

            <div className="customer-category-row" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={category === activeCategory ? 'active' : ''}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="customer-product-grid">
              {visibleProducts.map((product) => (
                <button
                  type="button"
                  className="customer-product-card"
                  key={product.name}
                  onClick={() => addToCart(product)}
                >
                  <ProductVisual tone={product.tone} category={product.category} />
                  <span>{product.name}</span>
                  <strong>${product.price.toFixed(2)}</strong>
                  <small>Stock {product.stock}</small>
                </button>
              ))}

              {visibleProducts.length === 0 && (
                <div className="customer-empty-products">No products found</div>
              )}
            </div>
          </section>

          <aside className="customer-cart-panel" aria-label="Cart summary">
            {cartItems.length === 0 ? (
              <div className="customer-cart-empty">
                <div className="customer-cart-icon">
                  <span />
                </div>
                <strong>Cart is Empty</strong>
                <small>Add Products to Start</small>
              </div>
            ) : (
              <div className="customer-cart-list">
                {cartItems.map((item) => (
                  <article className="customer-cart-item" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>${item.price.toFixed(2)}</span>
                    </div>

                    <div className="customer-qty-controls">
                      <button type="button" onClick={() => updateQuantity(item.name, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.name, 1)}>
                        +
                      </button>
                    </div>

                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <button
                      className="customer-remove-item"
                      type="button"
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            )}

            <div className="customer-cart-summary">
              <dl>
                <div>
                  <dt>Sub Total:</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Discount:</dt>
                  <dd>$0.00</dd>
                </div>
                <div>
                  <dt>Tax:</dt>
                  <dd>${tax.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="customer-total">
                <span>Total:</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button type="button" className="customer-checkout">
                <span>PAY</span>
                Check out
              </button>
            </div>
          </aside>
        </main>
      </div>
    </section>
  )
}
