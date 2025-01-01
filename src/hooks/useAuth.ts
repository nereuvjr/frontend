import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        navigate('/login')
        return
      }

      if (!session) {
        navigate('/login')
        return
      }

      setUser(session.user as User)
      setLoading(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user as User)
        setLoading(false)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        navigate('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const hasPermission = async (permission: string) => {
    if (!user) return false
    
    const { data, error } = await supabase.rpc('has_permission', {
      user_id: user.id,
      permission
    })

    if (error) {
      console.error('Error checking permission:', error)
      return false
    }

    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  return { user, loading, hasPermission, logout }
}
