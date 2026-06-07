import { useState } from 'react'
import Table from '../../components/Table/Table.jsx'
import { formatCurrency } from '../../utils/currency.js'

const lowStockLimit = 10

const initialProducts = [
  { id: 'PRD-1001', name: 'Mineral Water', category: 'Beverages', price: 1, stock: 42 },
  { id: 'PRD-1002', name: 'Cola Can', category: 'Beverages', price: 0.99, stock: 5 },
  { id: 'PRD-1003', name: 'Orange Juice', category: 'Beverages', price: 2, stock: 18 },
  { id: 'PRD-1004', name: 'Iced Tea', category: 'Beverages', price: 1.5, stock: 24 },
  { id: 'PRD-1005', name: 'Potato Chips', category: 'Snacks', price: 1.25, stock: 16 },
  { id: 'PRD-1006', name: 'Instant Noodles', category: 'Food', price: 2.5, stock: 22 },
  { id: 'PRD-1007', name: 'Hand Soap', category: 'Household', price: 1.24, stock: 8 },
]

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  stock: '',
}

function getTopCategory(products) {
  const categoryCounts = products.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1
    return counts
  }, {})

  return Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'No category'
}

function getProductStats(products) {
  const totalProducts = products.length
  const lowStockCount = products.filter((item) => item.stock <= lowStockLimit).length
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0)
  const averagePrice = totalProducts > 0 ? totalPrice / totalProducts : 0

  return [
    {
      icon: 'CL',
      label: 'TOTAL PRODUCTS',
      tone: 'blue',
      value: totalProducts,
      helper: 'Products available',
    },
    {
      icon: '!',
      label: 'LOW STOCK',
      tone: 'red',
      value: `${lowStockCount} out of ${totalProducts}`,
      helper: 'Need restock',
    },
    {
      icon: 'BZ',
      label: 'TOP CATEGORY',
      tone: 'blue',
      value: getTopCategory(products),
      helper: 'Most products in this category',
    },
    {
      icon: '$',
      label: 'AVERAGE PRICE',
      tone: 'green',
      value: formatCurrency(averagePrice),
      helper: 'Average Product Price',
    },
  ]
}

function Products() {
  const [product, setProduct] = useState(emptyProduct)
  const [products, setProducts] = useState(initialProducts)
  const stats = getProductStats(products)

  function handleProductChange(event) {
    const { name, value } = event.target
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleProductSubmit(event) {
    event.preventDefault()

    const newProduct = {
      id: `PRD-${1000 + products.length + 1}`,
      name: product.name.trim(),
      category: product.category,
      price: Number(product.price),
      stock: Number(product.stock),
    }

    setProducts((prev) => [newProduct, ...prev])
    setProduct(emptyProduct)
  }

  return (
    <section className="page">

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <article className={`stat-card product-stat-card ${stat.tone}`} key={stat.label}>
            <div className="stat-card-header">
              <span>{stat.label}</span>
              <span className="stat-icon" aria-hidden="true">
                {stat.icon}
              </span>
            </div>
            <strong>{stat.value}</strong>
            <small>{stat.helper}</small>
          </article>
        ))}
      </div>

      {/* PRODUCT FORM */}
      <section className="content-panel product-panel">
        <h2>Create Product</h2>

        <form className="product-form" onSubmit={handleProductSubmit}>
          <input
            name="name"
            value={product.name}
            onChange={handleProductChange}
            placeholder="Product name"
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleProductChange}
            required
          >
            <option value="">Select category</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Food">Food</option>
            <option value="Household">Household</option>
            <option value="Accessories">Accessories</option>
          </select>

          <input
            name="price"
            type="number"
            step="0.01"
            value={product.price}
            onChange={handleProductChange}
            placeholder="Price"
            required
          />

          <input
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleProductChange}
            placeholder="Stock"
            required
          />

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>

        {/* PRODUCTS TABLE */}
        <Table
          columns={[
            { key: 'id', label: 'Product ID' },
            { key: 'name', label: 'Product Name' },
            { key: 'category', label: 'Category' },
            { key: 'price', label: 'Price' },
            { key: 'stock', label: 'Stock' },
          ]}
          rows={products.map(p => ({
            ...p,
            price: formatCurrency(p.price),
          }))}
        />
      </section>

    </section>
  )
}

export default Products
