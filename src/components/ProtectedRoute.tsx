import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin' && location.pathname.startsWith('/admin')) {
    return <Navigate to="/dashboard" replace />
  }

  if (user?.role === 'admin' && location.pathname === '/dashboard') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute