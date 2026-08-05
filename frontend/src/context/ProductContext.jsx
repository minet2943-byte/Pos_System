import { createContext, useContext, useState } from "react";

const ProductContext = createContext(null);

const initialProducts = [
  {
    id: "PRD-1001",
    name: "Mineral Water",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=80&q=80",
    category: "Beverages",
    price: 1,
    stock: 42,
  },
  {
    id: "PRD-1002",
    name: "Cola Can",
    image:
      "https://i.pinimg.com/1200x/f5/32/50/f53250ea2eccf325a57431c3d87ff804.jpg",
    category: "Beverages",
    price: 0.99,
    stock: 5,
  },
  {
    id: "PRD-1003",
    name: "Orange Juice",
    image:
      "https://i.pinimg.com/736x/39/bf/a4/39bfa4bb921e2ced505c6e357c9598c3.jpg",
    category: "Beverages",
    price: 2,
    stock: 18,
  },
  {
    id: "PRD-1004",
    name: "Iced Tea",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=80&q=80",
    category: "Beverages",
    price: 1.5,
    stock: 24,
  },
  {
    id: "PRD-1005",
    name: "Potato Chips",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=80&q=80",
    category: "Snacks",
    price: 1.25,
    stock: 16,
  },
  {
    id: "PRD-1006",
    name: "Instant Noodles",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=80&q=80",
    category: "Food",
    price: 2.5,
    stock: 22,
  },
  {
    id: "PRD-1007",
    name: "Hand Soap",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=80&q=80",
    category: "Household",
    price: 1.24,
    stock: 8,
  },
];

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingProductId, setEditingProductId] = useState(null);

  function addProduct(product) {
    setProducts((prev) => [product, ...prev]);
  }

  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item,
      ),
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  function clearEditingProduct() {
    setEditingProductId(null);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        editingProductId,
        setEditingProductId,
        clearEditingProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}
