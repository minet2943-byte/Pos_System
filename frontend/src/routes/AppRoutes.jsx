import { useState } from 'react'
import AdminLayout from '../layouts/AdminLayout.jsx'
import Categories from '../pages/Dashboard/Categories.jsx'
import Customers from '../pages/Dashboard/Customers.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import Login from '../pages/auth/Login.jsx'
import Orders from '../pages/Dashboard/Orders.jsx'
import Products from '../pages/Dashboard/Products.jsx'
import Reports from '../pages/Dashboard/Reports.jsx'
import Settings from '../pages/Dashboard/Settings.jsx'
import Users from '../pages/Dashboard/Users.jsx'

const pageMap = {
  Categories,
  Customers,
  Dashboard,
  Orders,
  Products,
  Reports,
  Settings,
  Users,
}

function AppRoutes() {
  const [session, setSession] = useState(null)
  const [activePage, setActivePage] = useState('Dashboard')
  const Page = pageMap[activePage] ?? Dashboard

  if (!session) {
    return (
      <Login
        onCustomerLogin={() => setSession({ role: 'customer' })}
        onStaffLogin={() => setSession({ role: 'staff' })}
      />
    )
  }

  if (session.role === 'customer') {
    return <Customers />
  }

  return (
    <AdminLayout activePage={activePage} onLogout={() => setSession(null)} onNavigate={setActivePage}>
      <Page />
    </AdminLayout>
  )
}

export default AppRoutes
