'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const supabase = getSupabase()
  const router = useRouter()
  const { session } = useAuth()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState<string | null>(null)

  // bounce if already logged‑in
  if (session) router.replace('/dashboard')

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    if (error) setError(error.message)
    else router.replace('/dashboard')
  }

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password: pw })
    if (error) setError(error.message)
    else router.replace('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login / Register</h1>
      <input
        className="border p-2"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="password"
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={signIn} className="px-4 py-2 bg-blue-600 text-white">
          Login
        </button>
        <button onClick={signUp} className="px-4 py-2 bg-green-600 text-white">
          Register
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}
