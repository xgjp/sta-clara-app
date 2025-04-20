'use client'

import { JSX, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Spinner } from '@/components/Spinner'

export const Protected = ({ children }: { children: JSX.Element }) => {
    const router = useRouter()
    const { session, loading } = useAuth()
  
    useEffect(() => {
      if (!loading && !session) router.replace('/login')
    }, [loading, session, router])
  
    return loading || !session ? <Spinner /> : children
  }
