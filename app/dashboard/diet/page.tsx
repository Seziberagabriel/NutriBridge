'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Apple, Plus, Calendar } from 'lucide-react'

interface DietLog {
  id: number
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foods: string[]
  foodGroups: string[]
  notes: string
}

const foodGroupOptions = [
  'Grains & Cereals',
  'Legumes & Pulses',
  'Vegetables',
  'Fruits',
  'Meat & Protein',
  'Dairy & Eggs',
  'Oils & Fats',
  'Water',
]

export default function DietTrackingPage() {
  const [logs, setLogs] = useState<DietLog[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [formData, setFormData] = useState({
    mealType: 'breakfast' as const,
    foods: '',
    foodGroups: [] as string[],
    notes: '',
  })

  const handleFoodGroupToggle = (group: string) => {
    setFormData(prev => ({
      ...prev,
      foodGroups: prev.foodGroups.includes(group)
        ? prev.foodGroups.filter(g => g !== group)
        : [...prev.foodGroups, group],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.foods || formData.foodGroups.length > 0) {
      const newLog: DietLog = {
        id: logs.length + 1,
        date: selectedDate,
        mealType: formData.mealType,
        foods: formData.foods.split(',').map(f => f.trim()).filter(Boolean),
        foodGroups: formData.foodGroups,
        notes: formData.notes,
      }
      setLogs([newLog, ...logs])
      setFormData({ mealType: 'breakfast', foods: '', foodGroups: [], notes: '' })
      setShowForm(false)
    }
  }

  const calculateDiversityScore = (date: string) => {
    const dayLogs = logs.filter(log => log.date === date)
    const uniqueGroups = new Set(dayLogs.flatMap(log => log.foodGroups))
    return uniqueGroups.size
  }

  const groupedLogs = logs.reduce(
    (acc, log) => {
      const date = log.date
      if (!acc[date]) acc[date] = []
      acc[date].push(log)
      return acc
    },
    {} as Record<string, DietLog[]>
  )

  const sortedDates = Object.keys(groupedLogs).sort().reverse()

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Diet Tracking</h1>
            <p className="text-muted-foreground">
              Log meals and track your family's dietary diversity
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Meal
          </Button>
        </div>

        {/* Add Meal Form */}
        {showForm && (
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold mb-4">Log a Meal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Meal Type</label>
                  <select
                    value={formData.mealType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mealType: e.target.value as DietLog['mealType'],
                      })
                    }
                    className="w-full"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Foods Eaten</label>
                <textarea
                  placeholder="List the foods you ate (comma-separated)&#10;e.g., Beans, Rice, Spinach, Tomatoes"
                  value={formData.foods}
                  onChange={(e) => setFormData({ ...formData, foods: e.target.value })}
                  className="w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Food Groups</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {foodGroupOptions.map(group => (
                    <label key={group} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.foodGroups.includes(group)}
                        onChange={() => handleFoodGroupToggle(group)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{group}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Notes</label>
                <textarea
                  placeholder="Any observations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-success hover:bg-success-dark text-white">
                  Save Meal
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="border-border"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Daily Summary */}
        {sortedDates.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Logged Days</p>
              <p className="text-2xl font-bold text-primary">{sortedDates.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Today's Score</p>
              <p className="text-2xl font-bold text-success">
                {calculateDiversityScore(new Date().toISOString().split('T')[0])}/8
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg Diversity</p>
              <p className="text-2xl font-bold text-primary">
                {(
                  sortedDates.reduce(
                    (sum, date) => sum + calculateDiversityScore(date),
                    0
                  ) / sortedDates.length
                ).toFixed(1)}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Meals</p>
              <p className="text-2xl font-bold text-primary">{logs.length}</p>
            </Card>
          </div>
        )}

        {/* Diet Logs */}
        <div className="space-y-6">
          {sortedDates.length > 0 ? (
            sortedDates.map(date => (
              <Card key={date} className="overflow-hidden">
                <div className="bg-neutral-100 border-b border-border px-6 py-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <span className="ml-auto text-sm bg-success/10 text-success px-3 py-1 rounded-full">
                    Diversity Score: {calculateDiversityScore(date)}/8
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  {groupedLogs[date].map(log => (
                    <div key={log.id} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold capitalize mb-2">{log.mealType}</h4>
                      {log.foods.length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm text-muted-foreground mb-1">Foods:</p>
                          <p className="text-sm">{log.foods.join(', ')}</p>
                        </div>
                      )}
                      {log.foodGroups.length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm text-muted-foreground mb-2">Food Groups:</p>
                          <div className="flex flex-wrap gap-2">
                            {log.foodGroups.map(group => (
                              <span
                                key={group}
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                              >
                                {group}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {log.notes && (
                        <p className="text-sm text-muted-foreground italic">Note: {log.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <Apple className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No meals logged yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Start tracking your family's diet today
              </p>
              <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-dark text-white">
                Log First Meal
              </Button>
            </Card>
          )}
        </div>

        {/* Guidelines */}
        <Card className="p-6 mt-8 bg-success/5 border-success/20">
          <h3 className="font-bold mb-3">Dietary Diversity Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>Aim for at least 4-5 different food groups daily</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>Include vegetables, fruits, grains, and protein sources</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>Drink plenty of water throughout the day</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">•</span>
              <span>Log meals regularly to monitor patterns</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
