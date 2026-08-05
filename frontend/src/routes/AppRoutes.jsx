import { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Categories from "../pages/Dashboard/Categories.jsx";
import Customers from "../pages/Costomer/Customers.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Login from "../pages/auth/Login.jsx";
import ProductFormPage from "../pages/Dashboard/ProductFormPage.jsx";
import Register from "../pages/auth/Register.jsx";
import Orders from "../pages/Dashboard/Orders.jsx";
import Products from "../pages/Dashboard/Products.jsx";
import Reports from "../pages/Dashboard/Reports.jsx";
import Settings from "../pages/Dashboard/Settings.jsx";
import Users from "../pages/Dashboard/Users.jsx";

const pageMap = {
  Categories,
  Customers,
  Dashboard,
  Orders,
  Products,
  "Create Product": ProductFormPage,
  Reports,
  Settings,
  Users,
};

function AppRoutes() {
  const { user, setUser } = useAuth();
  const [activePage, setActivePage] = useState("Dashboard");
  const [authPage, setAuthPage] = useState("login");
  const Page = pageMap[activePage] ?? Dashboard;

  if (!user) {
    if (authPage === "register") {
      return (
        <Register
          onRegister={setUser}
          onShowLogin={() => setAuthPage("login")}
        />
      );
    }

    return (
      <Login onLogin={setUser} onRegister={() => setAuthPage("register")} />
    );
  }

  if (user.role === "customer") {
    return <Customers />;
  }

  return (
    <AdminLayout
      activePage={activePage}
      onLogout={() => setUser(null)}
      onNavigate={setActivePage}
    >
      <Page onNavigate={setActivePage} />
    </AdminLayout>
  );
}

export default AppRoutes;
