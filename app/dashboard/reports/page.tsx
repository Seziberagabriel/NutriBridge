'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Filter, TrendingUp, TrendingDown } from 'lucide-react'

interface Report {
  id: string
  title: string
  metric: string
  value: number | string
  trend?: 'up' | 'down'
  change?: number
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('all')

  const reports: Report[] = [
    {
      id: 'avg-bmi',
      title: 'Average BMI',
      metric: 'BMI',
      value: '19.4',
      trend: 'up',
      change: 0.3,
    },
    {
      id: 'diet-score',
      title: 'Avg Dietary Diversity',
      metric: 'Score',
      value: '5.2/8',
      trend: 'up',
      change: 0.8,
    },
    {
      id: 'records-tracked',
      title: 'Growth Records Added',
      metric: 'Count',
      value: '12',
      trend: 'up',
      change: 4,
    },
    {
      id: 'meals-logged',
      title: 'Meals Logged',
      metric: 'Count',
      value: '87',
      trend: 'up',
      change: 23,
    },
    {
      id: 'articles-read',
      title: 'Articles Read',
      metric: 'Count',
      value: '8',
      trend: 'down',
      change: -2,
    },
    {
      id: 'health-status',
      title: 'Health Status',
      metric: 'Status',
      value: 'Good',
      trend: 'up',
      change: 1,
    },
  ]

  const handleExport = (format: 'csv' | 'pdf') => {
    // Simulated export
    alert(`Exporting as ${format.toUpperCase()}...`)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              View your nutrition progress and generate reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleExport('csv')}
              variant="outline"
              className="border-primary text-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport('pdf')} className="bg-primary hover:bg-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div>
              <label className="text-sm font-semibold block mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Metrics</option>
                <option value="growth">Growth Tracking</option>
                <option value="diet">Diet & Nutrition</option>
                <option value="education">Learning</option>
              </select>
            </div>

            <Button variant="outline" className="border-border mt-5">
              Apply Filters
            </Button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reports.map(report => (
            <Card key={report.id} className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{report.title}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-primary">{report.value}</p>
                  {report.change !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {report.change > 0 ? '+' : ''}{report.change} this period
                    </p>
                  )}
                </div>
                {report.trend && (
                  <div className={report.trend === 'up' ? 'text-success' : 'text-danger'}>
                    {report.trend === 'up' ? (
                      <TrendingUp className="w-6 h-6" />
                    ) : (
                      <TrendingDown className="w-6 h-6" />
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts & Insights */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">BMI Trend</h3>
            <div className="h-48 bg-neutral-100 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Growth chart visualization area</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Food Group Distribution</h3>
            <div className="h-48 bg-neutral-100 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Pie chart visualization area</p>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Nutrition Goals Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Dietary Diversity</p>
                  <span className="text-sm text-primary font-bold">65%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Weight Management</p>
                  <span className="text-sm text-primary font-bold">78%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Learning Engagement</p>
                  <span className="text-sm text-primary font-bold">42%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6 bg-success/5 border-success/20">
          <h3 className="font-bold mb-3">Health Insights & Recommendations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-success font-bold">✓</span>
              <span>Great dietary diversity! You're consuming from 6 food groups regularly.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">→</span>
              <span>Increase water intake - aim for at least 2 liters daily.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">→</span>
              <span>Continue reading nutrition articles - you've read 8 so far this month.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">✓</span>
              <span>BMI is stable and within healthy range. Keep up the good habits!</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
