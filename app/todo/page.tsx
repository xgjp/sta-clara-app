import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Protected } from '@/components/Protected'
import { Navbar } from '@/components/NavBar'

const TABLE = 'todos'

export default function TodoPage() {
  return (
    <Protected>
      <Todo />
    </Protected>
  )
}

function Todo() {
  const { session } = useAuth()
  const supabase = getSupabase()
  const [items, setItems] = useState<{ id: number; text: string; done: boolean }[]>([])
  const [text, setText] = useState('')

  // READ
  useEffect(() => {
    supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', session!.user.id)
      .order('id', { ascending: true })
      .then(({ data }: { data: { id: number; text: string; done: boolean }[] | null }) => setItems(data ?? []))
  }, [session, supabase])

  // CREATE
  const add = async () => {
    const { data } = await supabase
      .from(TABLE)
      .insert({ user_id: session!.user.id, text })
      .select()
      .single()
    setItems([...items, data])
    setText('')
  }

  // UPDATE
  const toggle = async (id: number) => {
    await supabase
      .from(TABLE)
      .update({ done: supabase.raw('NOT done') })
      .eq('id', id)
    setItems(items.map(i => (i.id === id ? { ...i, done: !i.done } : i)))
  }

  // DELETE
  const remove = async (id: number) => {
    await supabase.from(TABLE).delete().eq('id', id)
    setItems(items.filter(i => i.id !== id))
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md">
        <h2 className="text-xl font-bold mb-4">To‑Do List</h2>
        <div className="flex mb-4">
          <input
            className="flex-1 border p-2"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button onClick={add} className="ml-2 px-3 bg-green-600 text-white">
            +
          </button>
        </div>
        <ul>
          {items.map(i => (
            <li key={i.id} className="flex justify-between mb-2">
              <span
                onClick={() => toggle(i.id)}
                className={i.done ? 'line-through' : ''}
              >
                {i.text}
              </span>
              <button onClick={() => remove(i.id)}>&times;</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
