import React from 'react'
import { useAuth } from './AuthProvider'
import Goals from './Goals'
import Habits from './Habits'
import Reflection from './Reflection'
import ProgressChart from './ProgressChart'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function Dashboard() {
  const { currentUser } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <h2>Welcome back, {currentUser.displayName || currentUser.email.split('@')[0]} 🌿</h2>
        {/* Added: friendly, professional sub-sentence under the heading */}
        <p className="muted">Glad to see you — let's make steady, meaningful progress today.</p>
        <button onClick={() => signOut(auth)} className="btn-ghost">Sign out</button>
      </div>

      <section className="grid">
        <div className="card">
          <h3>Today's Habits</h3>
          <Habits />
        </div>

        <div className="card">
          <h3>Current Goals</h3>
          <Goals />
        </div>

        <div className="card">
          <h3>Reflection</h3>
          <Reflection />
        </div>

        <div className="card">
          <h3>Progress</h3>
          <ProgressChart />
        </div>
      </section>
    </div>
  )
}
