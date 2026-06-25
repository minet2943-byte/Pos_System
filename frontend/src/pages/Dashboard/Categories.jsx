import { useMemo, useState } from 'react'
import Table from '../../components/Table/Table.jsx'

const categoriesStyles = `
.category-panel {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.category-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.category-panel-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e2e4e8;
  border-radius: 999px;
  padding: 10px 18px;
  min-width: 280px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.search-input:focus-within {
  border-color: #0f6e5e;
  box-shadow: 0 0 0 3px rgba(15, 110, 94, 0.12);
}

.search-input input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  background: transparent;
  color: #333;
}

.search-icon {
  color: #999;
  font-size: 14px;
}

.category-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  background: #f9fafb;
  border: 1px solid #eef0f2;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
}

.category-form input,
.category-form select {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  flex: 1;
  min-width: 120px;
}

.category-form input::placeholder {
  color: #aaa;
}

.category-form .form-actions {
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
}

.btn-primary {
  background-color: #0f6e5e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary:hover {
  background-color: #0c5a4d;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 11px 18px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.categories-panel table {
  width: 100%;
  border-collapse: collapse;
}

.categories-panel thead {
  background: #f4f5f7;
}

.categories-panel th {
  text-align: left;
  padding: 14px 18px;
  font-weight: 600;
  font-size: 13px;
  color: #555;
}

.categories-panel td {
  padding: 14px 18px;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #2255aa;
}

.categories-panel tbody tr:hover {
  background: #fafbfc;
}

/* Status badges */
.badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  text-transform: lowercase;
}

.badge-active {
  background-color: #2f6e2f;
}

.badge-inactive {
  background-color: #8a8a8a;
}

.badge-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.row-actions {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background-color: #7a9a3a;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 5px 16px;
  font-size: 13px;
  cursor: pointer;
}

.btn-delete {
  background-color: #e3263b;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 5px 16px;
  font-size: 13px;
  cursor: pointer;
}
`

const emptyCategory = {
  name: '',
  product: '',
  status: 'active',
  sortOrder: '',
}

const initialCategories = [
  { id: 'CAT-1001', name: 'Sunscream', product: 10, status: 'active', sortOrder: 12 },
  { id: 'CAT-1002', name: 'Sunscream', product: 10, status: 'active', sortOrder: 12 },
  { id: 'CAT-1003', name: 'Sunscream', product: 10, status: 'active', sortOrder: 12 },
]

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>
}

function Categories() {
  const [categories, setCategories] = useState(initialCategories)
  const [category, setCategory] = useState(emptyCategory)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return categories

    return categories.filter(
      (item) =>
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    )
  }, [categories, search])

  function handleCategoryChange(event) {
    const { name, value } = event.target
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleOpenCreate() {
    setEditingId(null)
    setCategory(emptyCategory)
    setIsFormOpen(true)
  }

  function handleEdit(item) {
    setEditingId(item.id)
    setCategory({
      name: item.name,
      product: item.product,
      status: item.status,
      sortOrder: item.sortOrder,
    })
    setIsFormOpen(true)
  }

  function handleDelete(id) {
    setCategories((prev) => prev.filter((item) => item.id !== id))
  }

  function handleToggleStatus(id) {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      )
    )
  }

  function handleCancelForm() {
    setIsFormOpen(false)
    setEditingId(null)
    setCategory(emptyCategory)
  }

  function handleCategorySubmit(event) {
    event.preventDefault()

    if (editingId) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: category.name.trim(),
                product: Number(category.product) || 0,
                status: category.status,
                sortOrder: Number(category.sortOrder) || 0,
              }
            : item
        )
      )
    } else {
      const newCategory = {
        id: `CAT-${1000 + categories.length + 1}`,
        name: category.name.trim(),
        product: Number(category.product) || 0,
        status: category.status,
        sortOrder: Number(category.sortOrder) || 0,
      }
      setCategories((prev) => [newCategory, ...prev])
    }

    setIsFormOpen(false)
    setEditingId(null)
    setCategory(emptyCategory)
  }

  return (
    <section className="page">
      <style>{categoriesStyles}</style>

      <section className="category-panel">
        <div className="category-panel-header">
          <div className="search-input">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by id or name..."
            />
          </div>

          {!isFormOpen && (
            <button type="button" className="btn-primary" onClick={handleOpenCreate}>
              + New Category
            </button>
          )}
        </div>

        {/* CATEGORY FORM */}
        {isFormOpen && (
          <form className="category-form" onSubmit={handleCategorySubmit}>
            <input
              name="name"
              value={category.name}
              onChange={handleCategoryChange}
              placeholder="Category name"
              required
              autoFocus
            />

            <input
              name="product"
              type="number"
              min="0"
              value={category.product}
              onChange={handleCategoryChange}
              placeholder="Product count"
              required
            />

            <input
              name="sortOrder"
              type="number"
              min="0"
              value={category.sortOrder}
              onChange={handleCategoryChange}
              placeholder="Sort order"
              required
            />

            <select
              name="status"
              value={category.status}
              onChange={handleCategoryChange}
              required
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Save Changes' : 'Add Category'}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancelForm}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* CATEGORIES TABLE */}
        <div className="categories-panel">
          <Table
            columns={[
              { key: 'id', label: 'Category ID' },
              { key: 'name', label: 'Category Name' },
              { key: 'product', label: 'Products' },
              { key: 'status', label: 'Status' },
              { key: 'sortOrder', label: 'Sort Order' },
              { key: 'actions', label: 'Action' },
            ]}
            rows={filteredCategories.map((item) => ({
              ...item,
              status: (
                <button
                  type="button"
                  className="badge-button"
                  onClick={() => handleToggleStatus(item.id)}
                  title="Click to toggle status"
                >
                  <StatusBadge status={item.status} />
                </button>
              ),
              actions: (
                <div className="row-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </button>
                </div>
              ),
            }))}
          />
        </div>
      </section>
    </section>
  )
}

export default Categories