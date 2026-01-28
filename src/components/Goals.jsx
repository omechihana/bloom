import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthProvider'

export default function Goals() {
  const { currentUser } = useAuth()
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('Personal')

  useEffect(() => {
    if (!currentUser) return
    const q = query(collection(db, 'goals'), where('userId', '==', currentUser.uid))
    const unsub = onSnapshot(q, snapshot => {
      setGoals(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [currentUser])

  const addGoal = async e => {
    e.preventDefault()
    if (!title) return
    await addDoc(collection(db, 'goals'), {
      userId: currentUser.uid,
      title,
      description: desc,
      category,
      startDate: new Date().toISOString(),
      targetDate: null,
      status: 'active',
      createdAt: new Date().toISOString()
    })
    setTitle('')
    setDesc('')
  }

  const toggleComplete = async g => {
    const ref = doc(db, 'goals', g.id)
    await updateDoc(ref, { status: g.status === 'active' ? 'completed' : 'active' })
  }

  const remove = async id => {
    await deleteDoc(doc(db, 'goals', id))
  }

  return (
    <div>
      <form onSubmit={addGoal} className="small-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Goal title" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Short description" />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Personal</option>
          <option>Academic</option>
          <option>Spiritual</option>
          <option>Health</option>
        </select>
        <button type="submit">Add Goal</button>
      </form>

      <ul className="list">
        {goals.map(g => (
          <li key={g.id} className="list-item">
            <div>
              <strong>{g.title}</strong>
              <div className="muted">{g.category} • {g.status}</div>
            </div>
            <div className="actions">
              <button onClick={() => toggleComplete(g)} className="btn-sm">{g.status === 'active' ? 'Complete' : 'Reopen'}</button>
              <button onClick={() => remove(g.id)} className="btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
