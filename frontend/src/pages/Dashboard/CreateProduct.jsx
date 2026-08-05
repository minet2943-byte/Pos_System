function CreateProduct({
  product,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  uploadKey,
}) {
  return (
    <section className="content-panel product-panel">
      <div className="page-header">
        <div>
          <h2>{isEditing ? "Edit Product" : "Create Product"}</h2>
          <p>
            {isEditing
              ? "Update the product details below."
              : "Add a new product to inventory."}
          </p>
        </div>
      </div>

      <form className="product-form" onSubmit={onSubmit}>
        <input
          name="name"
          value={product.name}
          onChange={onChange}
          placeholder="Product name"
          required
        />

        <label className="file-upload-label">
          <span>Upload product image</span>
          <input
            key={uploadKey}
            name="image"
            type="file"
            accept="image/*"
            onChange={onChange}
            required={!isEditing || !product.image}
          />
        </label>

        {product.image && (
          <img
            src={product.image}
            alt="Product preview"
            style={{
              width: 84,
              height: 84,
              borderRadius: 12,
              objectFit: "cover",
              marginTop: 12,
            }}
          />
        )}

        <select
          name="category"
          value={product.category}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Price"
          required
        />

        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={onChange}
          placeholder="Stock"
          required
        />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary bg-blue-500 hover:bg-blue-600"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default CreateProduct;
