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

    setError('incorrect email or password')
  }

return (
 
    <AuthLayout>
   
      <form className="login-panel" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>
          Email
          <input
            type="email"
            value={email}
            placeholder="admin@example.com"
            onChange={(event) => {
              setEmail(event.target.value)
              setError("")
            }}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
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