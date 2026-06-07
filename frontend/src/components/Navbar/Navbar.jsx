import useAuth from '../../hooks/useAuth.js'

function Navbar({ title }) {
  const { user } = useAuth()

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">POS System</p>
        <h1>{title}</h1>
      </div>
      <div className="navbar-user">
        <span>{user?.name ?? 'Admin User'}</span>
        <small>{user?.role ?? 'Manager'}</small>
      </div>
    </header>
  )
}

export default Navbar
