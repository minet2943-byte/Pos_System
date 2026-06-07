import Navbar from '../components/Navbar/Navbar.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'

function AdminLayout({ children, activePage, onLogout, onNavigate }) {
  return (
    <div className="admin-layout">
      <Sidebar activePage={activePage} onLogout={onLogout} onNavigate={onNavigate} />
      <main className="main-panel">
        <Navbar title={activePage} />
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
