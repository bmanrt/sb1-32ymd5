import React, { useState } from 'react'
import { X } from 'lucide-react'

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: any) => void;
}

const regions = ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5", "Region 6"]

const rzmBreakdown = {
  "Region 1": [
    "SA Zone 1", "Cape Town Zone 1", "SA Zone 5", "Cape Town Zone 2",
    "SA Zone 2", "BLW Southern Africa Region", "Middle East Asia", "CE India",
    "SA Zone 3", "Durban", "BLW Asia & North Africa Region"
  ],
  "Region 2": [
    "UK Zone 3 Region 2", "CE Amsterdam DSP", "BLW Europe Region", "Western Europe Zone 4",
    "UK Zone 3 Region 1", "USA Zone 2 Region 1", "Eastern Europe", "Australia Zone",
    "Toronto Zone", "Western Europe Zone 2", "USA Zone 1 Region 2/Pacific Islands Region/New Zealand",
    "USA Region 3", "BLW Canada Sub-Region", "Western Europe Zone 3", "Dallas Zone USA Region 2",
    "UK Zone 4 Region 1", "Western Europe Zone 1", "UK Zone 1 (Region 2)", "UK Zone 2 Region 1",
    "UK Zone 1 Region 1", "USA Zone 1 Region 1", "BLW USA Region 2", "Ottawa Zone",
    "UK Zone 4 Region 2", "Quebec Zone", "BLW USA Region 1"
  ],
  "Region 3": [
    "Kenya Zone", "Lagos Zone 1", "EWCA Zone 4", "CE Chad", "EWCA Zone 2",
    "Ministry Center Warri", "Mid-West Zone", "South West Zone 2", "South West Zone 1",
    "Lagos Zone 4", "Ibadan Zone 1", "Ibadan Zone 2", "Accra Zone", "South West Zone 3",
    "EWCA Zone 5", "EWCA Zone 3", "MC Abeokuta", "EWCA Zone 6"
  ],
  "Region 4": [
    "Abuja Zone 2", "CELVZ", "Lagos Zone 2", "South South Zone 3", "South-South Zone 2",
    "Lagos Zone 3", "EWCA Zone 1", "South-South Zone 1", "DSC Sub Zone Warri", "Ministry Center Abuja",
    "Ministry Center Calabar"
  ],
  "Region 5": [
    "Middle Belt Region Zone 2", "North East Zone 1", "PH Zone 1", "Lagos Zone 6",
    "Lagos Sub Zone B", "Middle Belt Region Zone 1", "PH Zone 3", "Lagos Sub Zone A",
    "South West Zone 5", "Onitsha Zone", "Abuja Zone", "PH Zone 2", "North West Zone 2",
    "Lagos Zone 5", "Northwest Zone 1", "Ministry Center Ibadan", "South West Zone 4",
    "North Central Zone 1", "North Central Zone 2"
  ],
  "Region 6": [
    "Lagos Sub Zone C", "Benin Zone 2", "Aba Zone", "Benin Zone 1", "Loveworld Church Zone",
    "South East Zone 1", "BLW West Africa Region", "BLW East & Central Africa Region", "South East Zone 3",
    "Edo North & Central", "BLW Nigeria Region"
  ]
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [userGroup, setUserGroup] = useState('')
  const [gpdSubgroup, setGpdSubgroup] = useState('')
  const [region, setRegion] = useState('')
  const [rzmZone, setRzmZone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      fullName,
      username,
      email,
      password,
      role,
      userGroup,
      gpdSubgroup: userGroup === 'GPD' ? gpdSubgroup : undefined,
      region: userGroup === 'RZM' || (userGroup === 'GPD' && ['regional-manager', 'admin-manager'].includes(gpdSubgroup)) ? region : undefined,
      rzmZone: userGroup === 'RZM' ? rzmZone : undefined,
    }
    onAddUser(newUser)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="userGroup" className="block text-sm font-medium text-gray-700">User Group</label>
            <select
              id="userGroup"
              value={userGroup}
              onChange={(e) => {
                setUserGroup(e.target.value)
                setGpdSubgroup('')
                setRegion('')
                setRzmZone('')
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select User Group</option>
              <option value="GPD">GPD</option>
              <option value="RZM">RZM</option>
            </select>
          </div>
          {userGroup === 'GPD' && (
            <div className="mb-4">
              <label htmlFor="gpdSubgroup" className="block text-sm font-medium text-gray-700">GPD Subgroup</label>
              <select
                id="gpdSubgroup"
                value={gpdSubgroup}
                onChange={(e) => setGpdSubgroup(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select GPD Subgroup</option>
                <option value="finance">Finance</option>
                <option value="IT">IT</option>
                <option value="regional-manager">Regional Manager</option>
                <option value="admin-manager">Admin Manager</option>
                <option value="reporting-admin">Reporting/Admin</option>
              </select>
            </div>
          )}
          {(userGroup === 'RZM' || (userGroup === 'GPD' && ['regional-manager', 'admin-manager'].includes(gpdSubgroup))) && (
            <div className="mb-4">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
              <select
                id="region"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value)
                  setRzmZone('')
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          )}
          {userGroup === 'RZM' && region && (
            <div className="mb-4">
              <label htmlFor="rzmZone" className="block text-sm font-medium text-gray-700">RZM Zone</label>
              <select
                id="rzmZone"
                value={rzmZone}
                onChange={(e) => setRzmZone(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select RZM Zone</option>
                {rzmBreakdown[region as keyof typeof rzmBreakdown].map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal