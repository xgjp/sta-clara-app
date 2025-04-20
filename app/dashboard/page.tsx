'use client'

import { Protected } from '@/components/Protected'
import { Navbar }   from '@/components/NavBar'

export default function Dashboard() {
  return (
    <Protected>
      <>
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>Select an activity from the navbar.</p>
        </main>
      </>
    </Protected>
  )
}
