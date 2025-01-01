import { ReactNode, useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  requiredPermission?: string
}

export const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { user, loading, hasPermission } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredPermission) {
    const [hasPerm, setHasPerm] = useState(false)
    const [permLoading, setPermLoading] = useState(true)

    useEffect(() => {
      const checkPermission = async () => {
        const hasPerm = await hasPermission(requiredPermission)
        setHasPerm(hasPerm)
        setPermLoading(false)
      }

      checkPermission()
    }, [requiredPermission, hasPermission])

    if (permLoading) {
      return <div>Verificando permissões...</div>
    }

    if (!hasPerm) {
      return <Navigate to="/unauthorized" />
    }
  }

  return <>{children}</>
}
