import React from 'react'
import { useAuth } from './components/AuthProvider'
import AuthForms from './components/AuthForms'
import Dashboard from './components/Dashboard'
import './index.css'

export default function App() {
  const { currentUser } = useAuth()

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>
          Bloom Track
          {/* Optional: subtle info tooltip next to app name (hover/tap shows title). Accessible via aria-label. */}
          <button
            className="info-btn"
            aria-label="About Bloom Track"
            title="Bloom Track helps you build consistent habits, track progress, and reflect to grow."
            style={{
              background: 'transparent',
              border: 'none',
              marginLeft: 8,
              cursor: 'help',
              fontSize: '0.9rem'
            }}
          >
            ℹ️
          </button>
        </h1>
      </header>
      <main>
        {currentUser ? <Dashboard /> : <AuthForms />}
      </main>
      <footer className="app-footer">Bloom Track — small steps, big growth 🌱</footer>
    </div>
  )
}
