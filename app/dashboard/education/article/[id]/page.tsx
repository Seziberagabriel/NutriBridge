"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Bookmark, Share2, Home } from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  description: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  image: string
  content: string
  keyPoints: string[]
}

const articlesData: Record<number, Article> = {
  1: {
    id: 1,
    title: "Understanding Balanced Nutrition",
    category: "Fundamentals",
    description: "Learn the essential food groups and how to create balanced meals for your family",
    duration: "8 min read",
    level: "beginner",
    image: "/balanced-nutrition-food-groups.jpg",
    keyPoints: [
      "The five main food groups: Grains, Proteins, Vegetables, Fruits, and Dairy",
      "A balanced meal should include portions from each group",
      "Local foods like beans, maize, and vegetables provide essential nutrients",
      "Proper nutrition supports growth, learning, and overall health",
    ],
    content: `
      Balanced nutrition is the foundation of a healthy life. A balanced meal includes foods from all five main food groups in appropriate portions:

      1. Grains (Rice, Maize, Bread): Provide energy and fiber
      2. Proteins (Beans, Fish, Eggs, Meat): Build and repair muscles
      3. Vegetables: Provide vitamins, minerals, and fiber
      4. Fruits: Rich in vitamins and natural energy
      5. Dairy (Milk, Yogurt, Cheese): Support bone and teeth development

      Creating a balanced plate means including portions from each group at every meal. For example:
      - Half your plate should be vegetables and fruits
      - One quarter should be grains
      - One quarter should be proteins

      Rwanda's local foods like beans (high in protein), sweet potatoes, and leafy greens are nutritious and affordable. Learning to combine these foods properly ensures your family gets all necessary nutrients for healthy growth and development.
    `,
  },
  2: {
    id: 2,
    title: "Child Nutrition in the First 1000 Days",
    category: "Child Health",
    description: "Critical nutrition during infancy and early childhood for optimal growth",
    duration: "12 min read",
    level: "beginner",
    image: "/baby-infant-nutrition.jpg",
    keyPoints: [
      "The first 1000 days are critical for brain development",
      "Exclusive breastfeeding is recommended for the first 6 months",
      "Introduction of complementary foods should be gradual and nutrient-rich",
      "Proper nutrition in early childhood prevents lifelong health issues",
    ],
    content: `
      The first 1000 days of a child's life (from pregnancy through age 2) are the most critical for development. Proper nutrition during this period:

      - Supports rapid brain development and learning capacity
      - Builds strong bones and teeth
      - Strengthens the immune system
      - Prevents lifelong nutritional deficiencies

      Breastfeeding is the best start: Exclusive breastfeeding for the first 6 months provides all nutrients needed. It also protects against infections.

      After 6 months, introduce soft, nutrient-rich foods:
      - Mashed vegetables and fruits
      - Iron-fortified cereals
      - Protein-rich foods like eggs and legumes
      - Locally available nutritious foods

      Watch for signs of proper growth: Regular weighing and measurement help track development. If your child is not growing well, seek advice from a health worker immediately.
    `,
  },
  3: {
    id: 3,
    title: "Local Foods High in Iron and Protein",
    category: "Local Resources",
    description: "Discover nutritious local foods available in Rwanda and how to use them",
    duration: "10 min read",
    level: "intermediate",
    image: "/beans-grains-protein.jpg",
    keyPoints: [
      "Beans are Rwanda's nutritional powerhouse - high in protein and iron",
      "Leafy greens like moringa provide essential vitamins",
      "Combining different foods increases nutrient absorption",
      "Local foods are affordable and sustainable",
    ],
    content: `
      Rwanda is blessed with nutrient-rich local foods that prevent malnutrition:

      Iron-Rich Foods (prevent anemia):
      - Red beans and kidney beans
      - Dark leafy greens (amaranth, kale)
      - Fortified flour
      - Eggs

      Protein-Rich Foods (build muscles and tissues):
      - All types of beans and legumes
      - Fish and eggs
      - Groundnuts and peanuts
      - Milk and yogurt

      Vitamin-Rich Foods (boost immunity):
      - Moringa leaves (extremely nutritious, locally available)
      - Orange-fleshed sweet potatoes
      - Carrots and pumpkin
      - Fruits: bananas, avocados, papaya

      Combining foods multiplies benefits: Eating beans with tomatoes or greens with lemon/citrus fruit increases iron absorption. Regular consumption of these affordable local foods ensures your family stays healthy and strong.
    `,
  },
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  const articleId = Number.parseInt(params.id as string)
  const article = articlesData[articleId]

  if (!article) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Button onClick={() => router.push("/dashboard/education")} className="bg-amber-600">
            Back to Education Hub
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard/education")}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => setSaved(!saved)} className="p-2 hover:bg-stone-100 rounded-lg transition">
              <Bookmark className={`w-5 h-5 ${saved ? "fill-amber-600 text-amber-600" : "text-stone-400"}`} />
            </button>
            <button className="p-2 hover:bg-stone-100 rounded-lg transition">
              <Share2 className="w-5 h-5 text-stone-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden h-96 bg-stone-200">
          <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Metadata */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <span className="px-3 py-1 bg-stone-200 text-stone-700 rounded-full text-sm font-medium capitalize">
              {article.level} Level
            </span>
            <span className="text-stone-500 text-sm">{article.duration}</span>
          </div>

          <h1 className="text-4xl font-bold text-stone-900 mb-4 leading-tight">{article.title}</h1>
          <p className="text-xl text-stone-600 leading-relaxed">{article.description}</p>
        </div>

        {/* Key Points */}
        <Card className="p-6 mb-8 border-l-4 border-l-amber-600 bg-amber-50">
          <h3 className="font-bold text-lg text-stone-900 mb-3">Key Points</h3>
          <ul className="space-y-2">
            {article.keyPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-stone-700">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Main Content */}
        <div className="prose prose-stone max-w-none mb-8">
          <div className="text-stone-800 leading-relaxed whitespace-pre-wrap text-base space-y-4">
            {article.content
              .split("\n")
              .filter((line) => line.trim())
              .map((paragraph, idx) => (
                <p key={idx} className="text-stone-800 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <h3 className="font-bold text-lg text-stone-900 mb-3">Want to learn more?</h3>
          <p className="text-stone-700 mb-4">
            Track your nutrition progress and share this knowledge with your family.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => router.push("/dashboard")} className="bg-amber-600 hover:bg-amber-700">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
            <Button onClick={() => router.push("/dashboard/education")} variant="outline">
              Read More Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
