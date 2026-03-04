import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthProvider'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export default function ProgressChart() {
  const { currentUser } = useAuth()
  const [dataPoints, setDataPoints] = useState([])

  useEffect(() => {
    if (!currentUser) return
    const q = query(collection(db, 'habits'), where('userId', '==', currentUser.uid))
    const unsub = onSnapshot(q, snapshot => {
      const habits = snapshot.docs.map(d => d.data())
      // Simple example: use streak as progress metric
      const values = habits.map(h => h.streak || 0)
      setDataPoints(values.length ? values : [0])
    })
    return unsub
  }, [currentUser])

  const chartData = {
    labels: dataPoints.map((_, i) => `H${i + 1}`),
    datasets: [
      {
        label: 'Streaks (per habit)',
        data: dataPoints,
        borderColor: '#7FB77E',
        backgroundColor: 'rgba(127,183,126,0.2)'
      }
    ]
  }

  return (
    <div style={{ height: '180px' }}>
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  )
}
