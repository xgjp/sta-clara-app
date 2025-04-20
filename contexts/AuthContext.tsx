'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

interface AuthCtx {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthCtx>({ session: null, loading: true })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = getSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    interface AuthListener {
      subscription: { unsubscribe: () => void }
    }

    const { data: listener }: { data: AuthListener } = supabase.auth.onAuthStateChange(
      (_: string, newSession: Session | null) => setSession(newSession)
    )
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session)
      setLoading(false)
    })
    return () => listener.subscription.unsubscribe()
  }, [supabase])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
