import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthProvider'

export default function Reflection() {
  const { currentUser } = useAuth()
  const [note, setNote] = useState('')
  const [mood, setMood] = useState('🙂')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!currentUser) return
    const q = query(collection(db, 'reflections'), where('userId', '==', currentUser.uid))
    const unsub = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setEntries(data.sort((a, b) => (b.date > a.date ? 1 : -1)))
    })
    return unsub
  }, [currentUser])

  const submit = async e => {
    e.preventDefault()
    await addDoc(collection(db, 'reflections'), {
      userId: currentUser.uid,
      date: new Date().toISOString(),
      mood,
      note
    })
    setNote('')
  }

  return (
    <div>
      <form onSubmit={submit} className="small-form">
        <div className="row">
          <select value={mood} onChange={e => setMood(e.target.value)}>
            <option>😊</option>
            <option>🙂</option>
            <option>😐</option>
            <option>😔</option>
            <option>😄</option>
          </select>
          <button type="submit">Save Reflection</button>
        </div>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Write a short reflection..." />
      </form>

      <ul className="list">
        {entries.slice(0,5).map(r => (
          <li key={r.id} className="list-item">
            <div>
              <div className="muted">{new Date(r.date).toLocaleString()}</div>
              <div>{r.mood} {r.note}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
