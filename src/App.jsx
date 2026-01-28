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
        <h1>Bloom Track</h1>
      </header>
      <main>
        {currentUser ? <Dashboard /> : <AuthForms />}
      </main>
      <footer className="app-footer">Bloom Track — small steps, big growth 🌱</footer>
    </div>
  )
}
