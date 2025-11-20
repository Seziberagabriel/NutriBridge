'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Plus, AlertCircle, CheckCircle } from 'lucide-react'

interface GrowthRecord {
  id: number
  date: string
  weight: number
  height: number
  age: number
  notes: string
  status: 'normal' | 'warning' | 'alert'
}

export default function GrowthTrackingPage() {
  const [records, setRecords] = useState<GrowthRecord[]>([
    {
      id: 1,
      date: '2025-01-15',
      weight: 12.5,
      height: 75,
      age: 24,
      notes: 'Regular checkup',
      status: 'normal',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    childName: '',
    notes: '',
  })

  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1))
  }

  const determineStatus = (weight: number, height: number, age: number): 'normal' | 'warning' | 'alert' => {
    const bmi = calculateBMI(weight, height)
    if (bmi < 16 || bmi > 25) return 'warning'
    if (bmi < 14 || bmi > 28) return 'alert'
    return 'normal'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.weight && formData.height && formData.age) {
      const newRecord: GrowthRecord = {
        id: records.length + 1,
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        age: parseInt(formData.age),
        notes: formData.notes,
        status: determineStatus(
          parseFloat(formData.weight),
          parseFloat(formData.height),
          parseInt(formData.age)
        ),
      }
      setRecords([newRecord, ...records])
      setFormData({ weight: '', height: '', age: '', childName: '', notes: '' })
      setShowForm(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Growth Tracking</h1>
            <p className="text-muted-foreground">
              Monitor weight, height, and BMI to track healthy growth
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold mb-4">New Growth Record</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Child Name (optional)</label>
                <input
                  type="text"
                  name="childName"
                  placeholder="Child's name"
                  value={formData.childName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Age (months)</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g., 24"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="e.g., 12.5"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.1"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  placeholder="e.g., 75"
                  value={formData.height}
                  onChange={handleChange}
                  step="0.1"
                  required
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Notes</label>
                <textarea
                  name="notes"
                  placeholder="Any observations or notes..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="bg-success hover:bg-success-dark text-white">
                  Save Record
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="border-border text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Statistics */}
        {records.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Latest Weight</p>
              <p className="text-2xl font-bold text-primary">{records[0].weight} kg</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Latest Height</p>
              <p className="text-2xl font-bold text-primary">{records[0].height} cm</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Latest BMI</p>
              <p className="text-2xl font-bold text-primary">
                {calculateBMI(records[0].weight, records[0].height)}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Records</p>
              <p className="text-2xl font-bold text-primary">{records.length}</p>
            </Card>
          </div>
        )}

        {/* Records Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Height (cm)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">BMI</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Age (mo)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, idx) => {
                  const bmi = calculateBMI(record.weight, record.height)
                  const statusIcon =
                    record.status === 'normal' ? (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="w-4 h-4" />
                        Normal
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-danger">
                        <AlertCircle className="w-4 h-4" />
                        {record.status === 'warning' ? 'Warning' : 'Alert'}
                      </div>
                    )

                  return (
                    <tr key={record.id} className="border-b border-border hover:bg-neutral-50">
                      <td className="px-6 py-4 text-sm">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">{record.weight}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{record.height}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{bmi}</td>
                      <td className="px-6 py-4 text-sm">{record.age}</td>
                      <td className="px-6 py-4 text-sm">{statusIcon}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {records.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No growth records yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Start tracking by adding your first record
              </p>
              <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-dark text-white">
                Add First Record
              </Button>
            </div>
          )}
        </Card>

        {/* Health Guidelines */}
        <Card className="p-6 mt-8 bg-success/5 border-success/20">
          <h3 className="font-bold mb-3">Healthy Growth Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>A normal BMI for children aged 5-19 is between 18.5-24.9</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>Regularly track measurements monthly or quarterly</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>If you see warning signs, consult a health worker</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>Growth varies by individual - consistent tracking helps identify patterns</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
