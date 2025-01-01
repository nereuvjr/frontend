import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { DashboardLayout } from '../components/dashboard/DashboardLayout'
import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'
import { Documents } from '../pages/Documents'
import { Clients } from '../pages/Clients'
import { Settings } from '../pages/Settings'
import { Unauthorized } from '../pages/Unauthorized'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'documentos',
        element: <Documents />
      },
      {
        path: 'clientes',
        element: <Clients />
      },
      {
        path: 'configuracoes',
        element: <Settings />
      }
    ]
  }
])
