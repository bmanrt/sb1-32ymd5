import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', { username, password }) // Debug log
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (username === 'user' && password === 'password') {
      const newUser = { username, email: 'user@example.com', role: 'user' as const }
      setUser(newUser)
      setIsAuthenticated(true)
      console.log('User login successful:', newUser) // Debug log
      navigate('/dashboard')
      return true
    } else if (username === 'admin' && password === 'admin') {
      const newUser = { username, email: 'admin@example.com', role: 'admin' as const }
      setUser(newUser)
      setIsAuthenticated(true)
      console.log('Admin login successful:', newUser) // Debug log
      navigate('/admin/dashboard')
      return true
    }
    console.log('Login failed') // Debug log
    return false
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    console.log('Register attempt:', { username, email }) // Debug log
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newUser = { username, email, role: 'user' as const }
    setUser(newUser)
    setIsAuthenticated(true)
    console.log('Registration successful:', newUser) // Debug log
    navigate('/dashboard')
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    console.log('Logged out') // Debug log
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}