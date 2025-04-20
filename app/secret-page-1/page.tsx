'use client'
import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'
import { Protected } from '@/components/Protected'
import { Navbar } from '@/components/NavBar'
import { useAuth } from '@/contexts/AuthContext'

const TABLE = 'secret_messages'

export default function SecretPage1() {
  return (
    <Protected>
      <Page />
    </Protected>
  )
}

function Page() {
  const { session } = useAuth()
  const supabase = getSupabase()
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchMsg = async () => {
      const { data } = await supabase
        .from(TABLE)
        .select('text')
        .eq('user_id', session!.user.id)
        .single()
      setMsg(data?.text ?? null)
    }
    fetchMsg()
  }, [session, supabase])

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Secret Page 1</h2>
        {msg ? (
          <p className="mt-4 text-lg italic">{msg}</p>
        ) : (
          <p className="mt-4">No secret message set yet.</p>
        )}
      </div>
    </>
  )
}
