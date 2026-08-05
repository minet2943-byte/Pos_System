import Table from "../../components/Table/Table.jsx";
import { formatCurrency } from "../../utils/currency.js";
import { useProducts } from "../../context/ProductContext.jsx";

const lowStockLimit = 10;

function getTopCategory(products) {
  const categoryCounts = products.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
    return counts;
  }, {});

  return (
    Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "No category"
  );
}

function getProductStats(products) {
  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (item) => item.stock <= lowStockLimit,
  ).length;
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalProducts > 0 ? totalPrice / totalProducts : 0;

  return [
    {
      icon: "CL",
      label: "TOTAL PRODUCTS",
      tone: "blue",
      value: totalProducts,
      helper: "Products available",
    },
    {
      icon: "!",
      label: "LOW STOCK",
      tone: "red",
      value: `${lowStockCount} out of ${totalProducts}`,
      helper: "Need restock",
    },
    {
      icon: "BZ",
      label: "TOP CATEGORY",
      tone: "blue",
      value: getTopCategory(products),
      helper: "Most products in this category",
    },
    {
      icon: "$",
      label: "AVERAGE PRICE",
      tone: "green",
      value: formatCurrency(averagePrice),
      helper: "Average Product Price",
    },
  ];
}

function Products({ onNavigate }) {
  const { products, deleteProduct, setEditingProductId, clearEditingProduct } =
    useProducts();
  const stats = getProductStats(products);

  function handleCreateProduct() {
    clearEditingProduct();
    onNavigate?.("Create Product");
  }

  function handleEdit(productId) {
    setEditingProductId(productId);
    onNavigate?.("Create Product");
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    deleteProduct(id);
    window.alert("Product deleted successfully.");
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Products</h2>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <article
            className={`stat-card product-stat-card ${stat.tone}`}
            key={stat.label}
          >
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

      <div className="product-action-row">
        <button
          type="button"
          className="btn btn-primary create-product-button"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <Table
        columns={[
          { key: "id", label: "Product ID" },
          {
            key: "image",
            label: "Image",
            render: (row) => (
              <img
                src={row.image}
                alt={row.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            ),
          },
          { key: "name", label: "Product Name" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price" },
          { key: "stock", label: "Stock" },
          {
            key: "actions",
            label: "Actions",
            render: (row) => (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-secondary bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleEdit(row.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        rows={products.map((p) => ({
          ...p,
          price: formatCurrency(p.price),
        }))}
      />
    </section>
  );
}

export default Products;
