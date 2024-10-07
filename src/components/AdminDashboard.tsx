import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Users, UserPlus, UserMinus, RefreshCw } from 'lucide-react'
import AddUserModal from './AddUserModal'

interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  userGroup: string;
  gpdSubgroup?: string;
  region?: string;
  rzmZone?: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      fullName: 'John Doe',
      username: 'user1', 
      email: 'user1@example.com', 
      role: 'user',
      userGroup: 'GPD',
      gpdSubgroup: 'finance'
    },
    { 
      id: 2, 
      fullName: 'Jane Smith',
      username: 'user2', 
      email: 'user2@example.com', 
      role: 'user',
      userGroup: 'RZM',
      region: 'Region 1',
      rzmZone: 'SA Zone 1'
    },
    { 
      id: 3, 
      fullName: 'Admin User',
      username: 'admin', 
      email: 'admin@example.com', 
      role: 'admin',
      userGroup: 'Admin'
    },
  ])
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const handleAddUser = (newUser: any) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }])
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {user?.username}!</p>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Management</h2>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subgroup</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RZM Zone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.userGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.gpdSubgroup || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.region || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.rzmZone || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                  >
                    <UserMinus className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  )
}

export default AdminDashboard