import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, BarChart2, Users } from 'lucide-react'

const Layout: React.FC = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Reporting Portal</h1>
        </div>
        <ul className="mt-6">
          {user?.role === 'admin' ? (
            <li>
              <Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                <Users className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                <BarChart2 className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout