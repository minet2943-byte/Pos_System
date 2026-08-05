import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./assets/css/App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <AppRoutes />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
