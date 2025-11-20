'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BarChart3, AlertCircle, Download, Filter } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
  bmiStatus: 'normal' | 'warning' | 'alert'
}

interface CommunityStats {
  totalUsers: number
  activeUsers: number
  malnutritionCases: number
  successStories: number
}

export default function AdminPortalPage(): JSX.Element {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [usersList, setUsersList] = useState<User[]>([])
  const [communityStats] = useState<CommunityStats>({
    totalUsers: 1247,
    activeUsers: 892,
    malnutritionCases: 156,
    successStories: 43,
  })
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [reportType, setReportType] = useState<string>('monthly')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }

    let parsedUser: any = null
    try {
      parsedUser = JSON.parse(userData)
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err)
      router.push('/auth/login')
      return
    }

    // Check if user has admin permissions
    if (!parsedUser || (parsedUser.role !== 'healthworker' && parsedUser.role !== 'ngo')) {
      router.push('/dashboard')
      return
    }

    setUser(parsedUser)

    // Simulated user data
    setUsersList([
      {
        id: 1,
        name: 'Marie Kwizera',
        email: 'marie@example.com',
        role: 'household',
        status: 'active',
        joinDate: '2025-01-15',
        bmiStatus: 'normal',
      },
      {
        id: 2,
        name: 'Jean Habimana',
        email: 'jean@example.com',
        role: 'household',
        status: 'active',
        joinDate: '2025-01-20',
        bmiStatus: 'warning',
      },
      {
        id: 3,
        name: 'Sophie Ingabire',
        email: 'sophie@example.com',
        role: 'household',
        status: 'inactive',
        joinDate: '2024-12-10',
        bmiStatus: 'alert',
      },
      {
        id: 4,
        name: 'Peter Mukama',
        email: 'peter@example.com',
        role: 'household',
        status: 'active',
        joinDate: '2025-01-25',
        bmiStatus: 'normal',
      },
      {
        id: 5,
        name: 'Yvette Nyiramurungi',
        email: 'yvette@example.com',
        role: 'household',
        status: 'active',
        joinDate: '2025-02-01',
        bmiStatus: 'warning',
      },
    ])
  }, [router])

  const handleExportReport = (format: 'csv' | 'pdf') => {
    alert(`Generating ${format.toUpperCase()} report...`)
  }

  const filteredUsers = usersList.filter((u: User) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'at-risk') return u.bmiStatus !== 'normal'
    if (selectedFilter === 'inactive') return u.status === 'inactive'
    return true
  })

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Community health monitoring and program analytics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Users</p>
            <p className="text-3xl font-bold text-primary">{communityStats.totalUsers}</p>
            <p className="text-xs text-success mt-2">↑ 156 this month</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Active Users</p>
            <p className="text-3xl font-bold text-success">{communityStats.activeUsers}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {((communityStats.activeUsers / communityStats.totalUsers) * 100).toFixed(1)}% engagement
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">At-Risk Cases</p>
            <p className="text-3xl font-bold text-danger">{communityStats.malnutritionCases}</p>
            <p className="text-xs text-muted-foreground mt-2">Needing intervention</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Success Stories</p>
            <p className="text-3xl font-bold text-success">{communityStats.successStories}</p>
            <p className="text-xs text-success mt-2">↑ 8 this month</p>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Generate Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Report Type</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full">
                  <option value="weekly">Weekly Summary</option>
                  <option value="monthly">Monthly Report</option>
                  <option value="quarterly">Quarterly Analysis</option>
                  <option value="annual">Annual Report</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleExportReport('csv')} variant="outline" className="flex-1 border-primary text-primary">
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button onClick={() => handleExportReport('pdf')} className="flex-1 bg-primary hover:bg-primary-dark text-white">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Community Alerts</h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-danger/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Malnutrition Alert</p>
                  <p className="text-muted-foreground">12 at-risk cases need immediate follow-up</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-primary/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Engagement Notice</p>
                  <p className="text-muted-foreground">34 users inactive for more than 30 days</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-success/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Success Milestone</p>
                  <p className="text-muted-foreground">8 children reached healthy growth targets</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* User Management */}
        <Card className="overflow-hidden">
          <div className="bg-neutral-100 border-b border-border px-6 py-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">Community Members</h3>
            <div className="flex gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="text-sm border border-border rounded px-2 py-1">
                <option value="all">All Members</option>
                <option value="at-risk">At-Risk Cases</option>
                <option value="inactive">Inactive Users</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Join Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Health Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u: User) => (
                  <tr key={u.id} className="border-b border-border hover:bg-neutral-50">
                    <td className="px-6 py-4 text-sm font-semibold">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-4 text-sm">{new Date(u.joinDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          u.status === 'active' ? 'bg-success/10 text-success' : 'bg-neutral-200 text-muted-foreground'
                        }`}
                      >
                        {u.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          u.bmiStatus === 'normal'
                            ? 'bg-success/10 text-success'
                            : u.bmiStatus === 'warning'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-danger/10 text-danger'
                        }`}
                      >
                        {u.bmiStatus === 'normal' ? 'Normal' : u.bmiStatus === 'warning' ? 'Warning' : 'Alert'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No users match the selected filter</p>
            </div>
          )}
        </Card>

        {/* Additional Resources */}
        <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
          <h3 className="font-bold mb-3">Admin Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Analytics Guide</p>
                <p className="text-xs text-muted-foreground">Learn to interpret community data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">User Management</p>
                <p className="text-xs text-muted-foreground">Guidelines for managing accounts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Alert Protocols</p>
                <p className="text-xs text-muted-foreground">Response procedures for at-risk cases</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}