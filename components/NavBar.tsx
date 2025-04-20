'use client'

import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export const Navbar = () => {
  const { session } = useAuth()               // ✅ grab user
  const logout = async () => await getSupabase().auth.signOut()

  const links = [
    { href: '/dashboard', label: 'Home' },
    { href: '/secret-page-1', label: 'Secret‑1' },
    { href: '/todo', label: 'To‑Dos' },
  ]

  return (
    <nav className="flex gap-4 p-4 bg-neutral-900 text-white">
      {links.map(
        l =>
          session && (                 // show only when logged‑in
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          )
      )}

      <div className="ml-auto">
        {session ? (
          <button onClick={logout} className="text-sm underline">
            Log out
          </button>
        ) : (
          <Link href="/login" className="text-sm underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
