import { createContext, useContext, useState } from "react";

const ProductContext = createContext(null);

const initialProducts = [
  {
    id: "PRD-1001",
    name: "AK7",
    image:
      "https://i.pinimg.com/736x/75/ae/c4/75aec41b719aac39e37b03b70f37c2a4.jpg",
    category: "Sun Screens",
    price: 1,
    stock: 42,
  },
  {
    id: "PRD-1002",
    name: "SunScreanFlor",
    image:
      "https://i.pinimg.com/736x/9b/61/18/9b6118805343ddd6c33c24cc0b6f5760.jpg",
    category: "SunScreen",
    price: 0.99,
    stock: 5,
  },
  {
    id: "PRD-1003",
    name: "Orange baby",
    image:
      "https://i.pinimg.com/736x/39/bf/a4/39bfa4bb921e2ced505c6e357c9598c3.jpg",
    category: "Sarum",
    price: 2,
    stock: 18,
  },
  {
    id: "PRD-1004",
    name: "HK7",
    image:
      "https://i.pinimg.com/736x/c7/e1/84/c7e184ee4047571f12e41397099d2033.jpg",
    category: "Sarum",
    price: 1.5,
    stock: 24,
  },
  {
    id: "PRD-1005",
    name: "MIss",
    image:
      "https://i.pinimg.com/736x/df/5d/af/df5dafd186d958189b35e185fcfe8b17.jpg",
    category: "Sarum",
    price: 1.25,
    stock: 16,
  },
  {
    id: "PRD-1006",
    name: "Bayby Creem",
    image:
      "https://i.pinimg.com/736x/a0/90/25/a090250d27153325eb75cb9c2423a951.jpg",
    category: "Sun Screem",
    price: 2.5,
    stock: 22,
  },
  {
    id: "PRD-1007",
    name: "Hand Soap",
    image:
      "https://i.pinimg.com/736x/62/80/30/6280309087b725804130901a5ba2b072.jpg",
    category: "Sarum",
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
