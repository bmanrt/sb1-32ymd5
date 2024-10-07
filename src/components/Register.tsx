import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserPlus } from 'lucide-react'

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

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userGroup, setUserGroup] = useState('')
  const [gpdSubgroup, setGpdSubgroup] = useState('')
  const [region, setRegion] = useState('')
  const [rzmZone, setRzmZone] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      // In a real application, you would send all this information to your backend
      const success = await register(username, email, password)
      if (success) {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Failed to register. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <UserPlus className="mx-auto h-12 w-auto text-blue-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for Reporting Portal</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-group" className="block text-sm font-medium text-gray-700">User Group</label>
            <select
              id="user-group"
              name="userGroup"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={userGroup}
              onChange={(e) => setUserGroup(e.target.value)}
            >
              <option value="">Select User Group</option>
              <option value="GPD">GPD</option>
              <option value="RZM">RZM</option>
            </select>
          </div>

          {userGroup === 'GPD' && (
            <div>
              <label htmlFor="gpd-subgroup" className="block text-sm font-medium text-gray-700">GPD Subgroup</label>
              <select
                id="gpd-subgroup"
                name="gpdSubgroup"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={gpdSubgroup}
                onChange={(e) => setGpdSubgroup(e.target.value)}
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

          {(userGroup === 'GPD' && (gpdSubgroup === 'regional-manager' || gpdSubgroup === 'admin-manager')) && (
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
              <select
                id="region"
                name="region"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          )}

          {userGroup === 'RZM' && (
            <>
              <div>
                <label htmlFor="rzm-region" className="block text-sm font-medium text-gray-700">RZM Region</label>
                <select
                  id="rzm-region"
                  name="rzmRegion"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value)
                    setRzmZone('')
                  }}
                >
                  <option value="">Select RZM Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              {region && (
                <div>
                  <label htmlFor="rzm-zone" className="block text-sm font-medium text-gray-700">RZM Zone</label>
                  <select
                    id="rzm-zone"
                    name="rzmZone"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={rzmZone}
                    onChange={(e) => setRzmZone(e.target.value)}
                  >
                    <option value="">Select RZM Zone</option>
                    {rzmBreakdown[region as keyof typeof rzmBreakdown].map((zone) => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register