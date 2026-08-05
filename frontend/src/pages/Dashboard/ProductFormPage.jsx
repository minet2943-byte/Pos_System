import { useEffect, useState } from "react";
import CreateProduct from "./CreateProduct.jsx";
import { useProducts } from "../../context/ProductContext.jsx";

const emptyProduct = {
  name: "",
  image: "",
  category: "",
  price: "",
  stock: "",
};

function ProductFormPage({ onNavigate }) {
  const {
    products,
    addProduct,
    updateProduct,
    editingProductId,
    clearEditingProduct,
  } = useProducts();
  const [product, setProduct] = useState(emptyProduct);
  const [uploadKey, setUploadKey] = useState(0);
  const isEditing = Boolean(editingProductId);
  const existingProduct = products.find((item) => item.id === editingProductId);

  useEffect(() => {
    if (isEditing && existingProduct) {
      setProduct({
        name: existingProduct.name,
        image: existingProduct.image,
        category: existingProduct.category,
        price: existingProduct.price,
        stock: existingProduct.stock,
      });
    } else {
      setProduct(emptyProduct);
    }

    setUploadKey((prev) => prev + 1);
  }, [isEditing, existingProduct]);

  function handleProductChange(event) {
    const { name, value, files } = event.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        setProduct((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(files[0]);
      return;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      id: isEditing ? editingProductId : `PRD-${1000 + products.length + 1}`,
      name: product.name.trim(),
      image: product.image,
      category: product.category,
      price: Number(product.price),
      stock: Number(product.stock),
    };

    if (isEditing) {
      updateProduct(payload);
      clearEditingProduct();
    } else {
      addProduct(payload);
    }

    setProduct(emptyProduct);
    setUploadKey((prev) => prev + 1);
    onNavigate?.("Products");
  }

  function handleCancel() {
    clearEditingProduct();
    setProduct(emptyProduct);
    onNavigate?.("Products");
  }

  return (
    <section className="page">
      <CreateProduct
        product={product}
        onChange={handleProductChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={isEditing}
        uploadKey={uploadKey}
      />
    </section>
  );
}

export default ProductFormPage;
