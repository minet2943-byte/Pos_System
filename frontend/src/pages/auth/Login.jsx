import { useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import AuthLayout from '../../layouts/AuthLayout.jsx'

function Login({ onCustomerLogin, onStaffLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail === 'admin@example.com') {
      onStaffLogin()
      return
    }

    if (normalizedEmail === 'customer@example.com') {
      onCustomerLogin()
      return
    }

    setError('Use admin@example.com or customer@example.com')
  }

  return (
    <AuthLayout>
      <form className="login-panel" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          Email
          <input
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
            placeholder="admin@example.com"
            type="email"
            value={email}
            required
          />
        </label>
        <label>
          Password
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            required
          />
        </label>
        {error && <p className="login-error">{error}</p>}
        <div className="login-actions">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login
