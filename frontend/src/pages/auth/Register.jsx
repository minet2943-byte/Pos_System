import { useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import logo from '../../assets/images/logo1.jpg'

function Register({ onRegister, onShowLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  function updateField(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
      if (error) setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (form.password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    onRegister({ name: form.name.trim(), email: form.email.trim().toLowerCase(), role: 'customer' })
  }

  return (
    <AuthLayout>
      <div className="login-panel">
        <div className="login-header">
          <img alt="Company Logo" className="login-logo" src={logo} />
          <h1>Create your account</h1>
          <p>Register to start using the POS system.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="register-name">Full name</label>
            <input id="register-name" onChange={updateField('name')} placeholder="Your name" required value={form.name} />
          </div>
          <div>
            <label htmlFor="register-email">Email address</label>
            <input id="register-email" onChange={updateField('email')} placeholder="name@example.com" required type="email" value={form.email} />
          </div>
          <div>
            <label htmlFor="register-password">Password</label>
            <input id="register-password" minLength="6" onChange={updateField('password')} placeholder="At least 6 characters" required type="password" value={form.password} />
          </div>
          <div>
            <label htmlFor="register-confirm-password">Confirm password</label>
            <input id="register-confirm-password" onChange={updateField('confirmPassword')} placeholder="Repeat your password" required type="password" value={form.confirmPassword} />
          </div>

          {error && <div className="login-error" role="alert">{error}</div>}
          <Button className="login-submit" type="submit">Create account</Button>
        </form>

        <p className="auth-switch">Already have an account? <button onClick={onShowLogin} type="button">Sign in</button></p>
      </div>
    </AuthLayout>
  )
}

export default Register
