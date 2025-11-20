'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (formData.email && formData.password.length >= 6) {
        localStorage.setItem('user', JSON.stringify({ email: formData.email, role: 'household' }))
        router.push('/dashboard')
      } else {
        setError('Please enter valid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
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
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-stone-600 mt-2">Sign in to your NutriBridge account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email or Phone</label>
              <input
                type="text"
                name="email"
                placeholder="your@email.com or +250..."
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-stone-600 text-sm mb-4">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-amber-600 font-semibold hover:text-amber-700">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
