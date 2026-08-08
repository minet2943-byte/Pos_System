import { useMemo, useState } from "react";
import Table from "../../components/Table/Table.jsx";

const categoriesStyles = `
.category-panel {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.category-panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.category-panel-top h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.panel-subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.category-panel-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.status-filter {
  min-width: 160px;
  padding: 10px 14px;
  border: 1px solid #e2e4e8;
  border-radius: 14px;
  background: #fff;
  color: #333;
  font-size: 14px;
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
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 14px;
  padding: 12px 22px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.categories-panel table {
  width: 100%;
  border-collapse: collapse;
}

.categories-panel thead {
  background: #fbfbfd;
}

.categories-panel th {
  text-align: left;
  padding: 16px 18px;
  font-weight: 700;
  font-size: 13px;
  color: #374151;
}

.categories-panel td {
  padding: 16px 18px;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #1f2937;
}

.categories-panel tbody tr:hover {
  background: #f9fafb;
}

/* Status badges */
.badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-transform: capitalize;
}

.badge-active {
  background-color: #1f9d55;
}

.badge-inactive {
  background-color: #6b7280;
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
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 13px;
  cursor: pointer;
}

.btn-delete {
  background-color: #ef4444;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 13px;
  cursor: pointer;
}

.entries-info {
  margin-top: 18px;
  color: #6b7280;
  font-size: 13px;
}

.pagination {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.pagination button {
  border: 1px solid #d1d5db;
  background: #fff;
  color: #374151;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.pagination button.active,
.pagination button:hover {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

const emptyCategory = {
  name: "",
  product: "",
  status: "active",
  sortOrder: "",
};

const initialCategories = [
  {
    id: "CAT-1001",
    name: "Sunscream",
    product: 10,
    status: "active",
    sortOrder: 12,
  },
  {
    id: "CAT-1002",
    name: "Sunscream",
    product: 10,
    status: "active",
    sortOrder: 12,
  },
  {
    id: "CAT-1003",
    name: "Sunscream",
    product: 10,
    status: "active",
    sortOrder: 12,
  },
];

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}

function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [category, setCategory] = useState(emptyCategory);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return categories.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  function handleCategoryChange(event) {
    const { name, value } = event.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleOpenCreate() {
    setEditingId(null);
    setCategory(emptyCategory);
    setIsFormOpen(true);
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setCategory({
      name: item.name,
      product: item.product,
      status: item.status,
      sortOrder: item.sortOrder,
    });
    setIsFormOpen(true);
  }

  function handleDelete(id) {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  }

  function handleToggleStatus(id) {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item,
      ),
    );
  }

  function handleCancelForm() {
    setIsFormOpen(false);
    setEditingId(null);
    setCategory(emptyCategory);
  }

  function handleCategorySubmit(event) {
    event.preventDefault();

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
            : item,
        ),
      );
    } else {
      const newCategory = {
        id: `CAT-${1000 + categories.length + 1}`,
        name: category.name.trim(),
        product: Number(category.product) || 0,
        status: category.status,
        sortOrder: Number(category.sortOrder) || 0,
      };
      setCategories((prev) => [newCategory, ...prev]);
    }

    setIsFormOpen(false);
    setEditingId(null);
    setCategory(emptyCategory);
  }

  return (
    <section className="page">
      <style>{categoriesStyles}</style>

      <section className="category-panel">
        <div className="category-panel-top ">
          <div>
            <h2>Categories</h2>
            <p className="panel-subtitle">Manage your product categories</p>
          </div>
          {!isFormOpen && (
            <button
              type="button"
              className="btn-primary "
              onClick={handleOpenCreate}
            >
              + New Category
            </button>
          )}
        </div>

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

          <select
            className="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter categories by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
                {editingId ? "Save Changes" : "Add Category"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* CATEGORIES TABLE */}
        <div className="categories-panel">
          <Table
            columns={[
              { key: "id", label: "Category ID" },
              { key: "name", label: "Category Name" },
              { key: "product", label: "Products" },
              { key: "status", label: "Status" },
              { key: "sortOrder", label: "Sort Order" },
              { key: "actions", label: "Action" },
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
                    Delete
                  </button>
                </div>
              ),
            }))}
          />

          <div className="entries-info">
            Showing {filteredCategories.length} of {categories.length} entries
          </div>

          <div className="pagination">
            <button type="button" disabled>
              ‹
            </button>
            <button type="button" className="active">
              1
            </button>
            <button type="button">›</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Categories;
