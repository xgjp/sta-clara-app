import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Protected } from '@/components/Protected'
import { Navbar } from '@/components/NavBar'

const TABLE = 'secret_messages'

export default function SecretPage2() {
  return (
    <Protected>
      <Page />
    </Protected>
  )
}

function Page() {
  const supabase = getSupabase()
  const { session } = useAuth()
  const [text, setText] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from(TABLE)
      .select('text')
      .eq('user_id', session!.user.id)
      .single()
      .then(({ data }: { data: { text: string } | null }) => setText(data?.text ?? ''))
  }, [session, supabase])

  const save = async () => {
    const payload = { user_id: session!.user.id, text }
    const { error } = await supabase.from(TABLE).upsert(payload)
    setStatus(error ? `Error: ${error.message}` : 'Saved!')
  }

  return (
    <>
      <Navbar />
      <section className="p-6 max-w-xl">
        <h2 className="text-xl font-bold mb-4">Secret Page 2 – Edit</h2>
        <textarea
          className="border w-full p-2"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={save} className="mt-3 px-4 py-2 bg-blue-600 text-white">
          Save
        </button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </section>
    </>
  )
}
