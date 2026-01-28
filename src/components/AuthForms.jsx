import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../firebase'

export default function AuthForms() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setMessage(err.message)
    }
  }

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage('Password reset email sent.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div className="auth-card">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit">{isSignUp ? 'Create account' : 'Log in'}</button>
      </form>
      <div className="auth-actions">
        <button onClick={() => setIsSignUp(!isSignUp)} className="link">{isSignUp ? 'Have an account? Log in' : "Don't have an account? Sign up"}</button>
        <button onClick={handleReset} className="link">Forgot password?</button>
      </div>
      {message && <p className="muted">{message}</p>}
    </div>
  )
}
