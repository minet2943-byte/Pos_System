import { useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import logo from '../../assets/images/logo_pos.jpg'

const demoUsers = {
  'admin@example.com': { name: 'Admin User', password: 'admin123', role: 'staff' },
  'customer@example.com': { name: 'Customer User', password: 'customer123', role: 'customer' },
}

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const account = demoUsers[email.trim().toLowerCase()]

    if (!account || password !== account.password) {
      setError('Incorrect email or password. Please check the demo credentials below.')
      return
    }

    onLogin({ name: account.name, role: account.role })
  }

  function updateField(setter) {
    return (event) => {
      setter(event.target.value)
      if (error) setError('')
    }
  }

  return (
    <AuthLayout>
      <div className="login-panel">
        <div className="login-header">
          <img alt="Company Logo" className="login-logo" src={logo} />
          <h1>Welcome back</h1>
          <p>Please enter your details to sign in</p>
        </div>
{/* 
        <div className="demo-credentials">
          <strong>Demo credentials</strong>
          <span>Admin: admin@example.com / admin123</span>
          <span>Customer: customer@example.com / customer123</span>
        </div> */}

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              onChange={updateField(setEmail)}
              placeholder="name@example.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={updateField(setPassword)}
              placeholder="Enter your password"
              required
              type="password"
              value={password}
            />
          </div>

          {error && <div className="login-error" role="alert">{error}</div>}

          <Button type="submit" className="login-submit">Sign in</Button>
        </form>
        <p className="auth-switch">New to POS System? <button onClick={onRegister} type="button">Create an account</button></p>
      </div>
    </AuthLayout>
  )
}

export default Login
