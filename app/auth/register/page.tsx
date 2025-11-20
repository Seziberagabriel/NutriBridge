'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'household',
    age: '',
    province: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }

      const user = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        age: formData.age,
        province: formData.province,
      }
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">NB</span>
            </div>
            <h1 className="text-2xl font-bold">Join NutriBridge</h1>
            <p className="text-stone-600 mt-2">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">I am a</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full"
              >
                <option value="household">Parent / Household Member</option>
                <option value="healthworker">Health Worker</option>
                <option value="ngo">NGO Staff</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Province (optional)</label>
              <select name="province" value={formData.province} onChange={handleChange} className="w-full">
                <option value="">Select Province</option>
                <option value="kigali">Kigali</option>
                <option value="southern">Southern Province</option>
                <option value="northern">Northern Province</option>
                <option value="eastern">Eastern Province</option>
                <option value="western">Western Province</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-stone-600 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-amber-600 font-semibold hover:text-amber-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
