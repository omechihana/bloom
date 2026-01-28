import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthProvider'

function isYesterday(dateStr) {
  const d = new Date(dateStr)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

export default function Habits() {
  const { currentUser } = useAuth()
  const [habits, setHabits] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!currentUser) return
    const q = query(collection(db, 'habits'), where('userId', '==', currentUser.uid))
    const unsub = onSnapshot(q, snapshot => {
      setHabits(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [currentUser])

  const addHabit = async e => {
    e.preventDefault()
    if (!title) return
    await addDoc(collection(db, 'habits'), {
      userId: currentUser.uid,
      title,
      frequency: 'daily',
      streak: 0,
      lastCompleted: null,
      createdAt: new Date().toISOString()
    })
    setTitle('')
  }

  const toggleDone = async h => {
    const ref = doc(db, 'habits', h.id)
    const today = new Date().toISOString()
    let newStreak = 1
    if (h.lastCompleted) {
      if (isYesterday(h.lastCompleted)) newStreak = (h.streak || 0) + 1
      else if (new Date(h.lastCompleted).toDateString() === new Date().toDateString()) newStreak = h.streak || 1
      else newStreak = 1
    }
    await updateDoc(ref, { lastCompleted: today, streak: newStreak })
  }

  return (
    <div>
      <form onSubmit={addHabit} className="small-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New habit (e.g., Meditate)" />
        <button type="submit">Add</button>
      </form>

      <ul className="list">
        {habits.map(h => (
          <li key={h.id} className="list-item">
            <div>
              <strong>{h.title}</strong>
              <div className="muted">Streak: {h.streak || 0}</div>
            </div>
            <div className="actions">
              <button onClick={() => toggleDone(h)} className="btn-sm">Mark done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
