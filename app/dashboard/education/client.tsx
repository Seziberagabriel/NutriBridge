"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Play, Bookmark, Star } from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  description: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  image: string
  saved?: boolean
}

const articles: Article[] = [
  {
    id: 1,
    title: "Understanding Balanced Nutrition",
    category: "Fundamentals",
    description: "Learn the essential food groups and how to create balanced meals for your family",
    duration: "8 min read",
    level: "beginner",
    image: "/balanced-nutrition-food-groups.jpg",
  },
  {
    id: 2,
    title: "Child Nutrition in the First 1000 Days",
    category: "Child Health",
    description: "Critical nutrition during infancy and early childhood for optimal growth",
    duration: "12 min read",
    level: "beginner",
    image: "/baby-infant-nutrition.jpg",
  },
  {
    id: 3,
    title: "Local Foods High in Iron and Protein",
    category: "Local Resources",
    description: "Discover nutritious local foods available in Rwanda and how to use them",
    duration: "10 min read",
    level: "intermediate",
    image: "/beans-grains-protein.jpg",
  },
  {
    id: 4,
    title: "Nutrition for Pregnant Women",
    category: "Maternal Health",
    description: "Essential nutrients and dietary guidelines for healthy pregnancy",
    duration: "15 min read",
    level: "beginner",
    image: "/pregnant-woman-nutrition.jpg",
  },
  {
    id: 5,
    title: "Managing Malnutrition Signs",
    category: "Health Awareness",
    description: "Recognize early warning signs of malnutrition and when to seek help",
    duration: "10 min read",
    level: "intermediate",
    image: "/healthcare-nutrition-signs.jpg",
  },
  {
    id: 6,
    title: "Water, Sanitation & Nutrition",
    category: "Health & Hygiene",
    description: "How clean water and hygiene practices support better nutrition",
    duration: "9 min read",
    level: "beginner",
    image: "/water-sanitation-hygiene.jpg",
  },
  {
    id: 7,
    title: "Budget-Friendly Nutritious Meals",
    category: "Practical Tips",
    description: "Plan nutritious meals without breaking the budget",
    duration: "11 min read",
    level: "intermediate",
    image: "/budget-cooking-meals.jpg",
  },
  {
    id: 8,
    title: "Dietary Diversity Score Guide",
    category: "Tracking Tools",
    description: "Understand and improve your family's dietary diversity",
    duration: "7 min read",
    level: "advanced",
    image: "/food-variety-diversity.jpg",
  },
]

export function EducationHubClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [savedArticles, setSavedArticles] = useState<number[]>([])

  const categories = ["all", ...new Set(articles.map((a) => a.category))]
  const levels = ["all", "beginner", "intermediate", "advanced"]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || article.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const toggleSaved = (id: number) => {
    setSavedArticles((prev) => (prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nutrition Education Hub</h1>
          <p className="text-muted-foreground text-lg">
            Learn about healthy nutrition, balanced diets, and how to combat malnutrition
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Difficulty Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="h-40 bg-neutral-200 relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleSaved(article.id)}
                      className="bg-white rounded-full p-2 shadow hover:shadow-lg transition-shadow"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          savedArticles.includes(article.id) ? "fill-amber-600 text-amber-600" : "text-neutral-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-neutral-500 capitalize">{article.level}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3 flex-1">{article.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="text-xs text-neutral-500">{article.duration}</span>
                    <Button
                      onClick={() => (window.location.href = `/dashboard/education/article/${article.id}`)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500 text-lg">No articles found matching your filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Saved Articles Section */}
        {savedArticles.length > 0 && (
          <Card className="p-6 bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-600 fill-amber-600" />
              <h3 className="text-lg font-bold">Saved Articles ({savedArticles.length})</h3>
            </div>
            <p className="text-neutral-600">
              You have saved {savedArticles.length} article{savedArticles.length !== 1 ? "s" : ""} for later reading
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
