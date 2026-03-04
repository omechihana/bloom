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
    // Added: wrapper for full-page gradient background and centered card
    <div className="auth-page-wrapper">
      {/* Component-scoped styles added below to improve the sign-in visual design */}
      <style>{`
        /* Gradient background for the auth page (Added) */
        .auth-page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: linear-gradient(180deg, #f5f3ff 0%, #eef2ff 50%, #fdf4ff 100%);
        }

        /* Card improvements: white background, subtle shadow, rounded corners (Added) */
        .auth-card {
          max-width: 420px;
          width: 100%;
          padding: 28px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(15, 15, 30, 0.06);
          border: 1px solid rgba(140, 99, 255, 0.04);
        }

        .auth-card h2 { margin-bottom: 8px; }

        /* Description styling (Added) */
        .auth-desc {
          margin-bottom: 12px;
          color: #616177;
          font-size: 0.95rem;
        }

        /* Feature bullets styled with accent checkmarks (Added) */
        .auth-features { list-style: none; padding: 0; margin: 8px 0 18px 0; }
        .auth-features li {
          display: flex; align-items: center; gap: 8px;
          color: #4b4b5d; margin: 6px 0; font-size: 0.95rem;
        }
        .auth-features li::before {
          content: '✔'; color: #22c55e; font-size: 0.9rem; display: inline-block; width: 18px;
        }

        /* Primary button full width with brand color and hover (Added) */
        .primary-full {
          display: inline-block; width: 100%; background: #8b5cf6; color: #fff;
          padding: 12px 14px; border-radius: 10px; border: none; cursor: pointer; font-weight: 600;
          transition: background 0.18s ease, transform 0.08s ease;
        }
        .primary-full:hover { background: #7c3aed; transform: translateY(-1px); }

        /* Improve spacing for inputs and actions (Added) */
        .auth-card input { margin: 12px 0; }
        .auth-actions { display:flex; gap:12px; justify-content:space-between; align-items:center; margin-top:12px; }

        /* Responsive tweaks (Added) */
        @media (max-width:420px) {
          .auth-card { padding: 20px; border-radius: 12px; }
        }
      `}</style>

      <div className="auth-card">
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        {/* Added: short app description and key feature bullets for sign-in page (UI only) */}
        <p className="auth-desc muted">Bloom Track helps you build consistent habits and monitor progress toward personal goals.</p>
        <ul className="auth-features">
          <li>Track daily habits with simple check-ins</li>
          <li>Monitor progress with visual charts</li>
          <li>Build consistency through reflections and goals</li>
        </ul>
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
          <button type="submit" className="primary-full">{isSignUp ? 'Create account' : 'Log in'}</button>
        </form>
      <div className="auth-actions">
        <button onClick={() => setIsSignUp(!isSignUp)} className="link">{isSignUp ? 'Have an account? Log in' : "Don't have an account? Sign up"}</button>
        <button onClick={handleReset} className="link">Forgot password?</button>
      </div>
      {message && <p className="muted">{message}</p>}
      </div>
    </div>
  )
}
