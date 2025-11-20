'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen, TrendingUp, Apple, Users, LogOut, Menu, X, BarChart3 } from 'lucide-react'

interface User {
  name: string
  email: string
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
    } else {
      setUser(JSON.parse(userData))
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return null

  const isAdmin = user.role === 'healthworker' || user.role === 'ngo'

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">NB</span>
            </div>
            <h1 className="text-xl font-bold text-amber-600">NutriBridge</h1>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-stone-600">Welcome, {user.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white border-r border-stone-200 p-6 fixed md:static h-full transition-all ${
            sidebarOpen ? 'left-0' : '-left-64 md:left-0'
          } z-30`}
        >
          <nav className="space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start text-amber-600 hover:bg-amber-50">
                <TrendingUp className="w-5 h-5 mr-3" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/education">
              <Button variant="ghost" className="w-full justify-start hover:bg-stone-100">
                <BookOpen className="w-5 h-5 mr-3" />
                Education Hub
              </Button>
            </Link>
            <Link href="/dashboard/tracking">
              <Button variant="ghost" className="w-full justify-start hover:bg-stone-100">
                <TrendingUp className="w-5 h-5 mr-3" />
                Track Growth
              </Button>
            </Link>
            <Link href="/dashboard/diet">
              <Button variant="ghost" className="w-full justify-start hover:bg-stone-100">
                <Apple className="w-5 h-5 mr-3" />
                Diet Tracking
              </Button>
            </Link>
            <Link href="/dashboard/community">
              <Button variant="ghost" className="w-full justify-start hover:bg-stone-100">
                <Users className="w-5 h-5 mr-3" />
                Community Support
              </Button>
            </Link>
            <Link href="/dashboard/reports">
              <Button variant="ghost" className="w-full justify-start hover:bg-stone-100">
                <BarChart3 className="w-5 h-5 mr-3" />
                My Reports
              </Button>
            </Link>
            {isAdmin && (
              <>
                <div className="my-4 border-t border-stone-200" />
                <p className="text-xs font-semibold text-stone-600 px-3 py-2">ADMIN</p>
                <Link href="/dashboard/admin">
                  <Button variant="ghost" className="w-full justify-start hover:bg-stone-100 text-amber-600">
                    <BarChart3 className="w-5 h-5 mr-3" />
                    Admin Portal
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h2>
              <p className="text-stone-600">
                {isAdmin
                  ? 'Monitor community health and nutrition programs'
                  : 'Start your nutrition journey today'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <BookOpen className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="font-bold mb-1">Learn Nutrition</h3>
                <p className="text-sm text-stone-600 mb-4">
                  Access educational resources and guides
                </p>
                <Link href="/dashboard/education">
                  <Button size="sm" variant="outline" className="text-amber-600 border-amber-600">
                    Explore
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <TrendingUp className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-bold mb-1">Track Growth</h3>
                <p className="text-sm text-stone-600 mb-4">
                  Monitor weight, height, and BMI
                </p>
                <Link href="/dashboard/tracking">
                  <Button size="sm" variant="outline" className="text-amber-600 border-amber-600">
                    Start Tracking
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Apple className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="font-bold mb-1">Diet Log</h3>
                <p className="text-sm text-stone-600 mb-4">
                  Record what you eat daily
                </p>
                <Link href="/dashboard/diet">
                  <Button size="sm" variant="outline" className="text-amber-600 border-amber-600">
                    Log Meal
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Users className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-bold mb-1">Get Support</h3>
                <p className="text-sm text-stone-600 mb-4">
                  Connect with local resources
                </p>
                <Link href="/dashboard/community">
                  <Button size="sm" variant="outline" className="text-amber-600 border-amber-600">
                    Find Help
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">0</div>
                  <p className="text-sm text-stone-600">Growth Records</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">0</div>
                  <p className="text-sm text-stone-600">Meals Logged</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">0</div>
                  <p className="text-sm text-stone-600">Resources Read</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
