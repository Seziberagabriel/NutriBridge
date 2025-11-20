'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Apple, TrendingUp, Users, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">NB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-600">NutriBridge</h1>
              <p className="text-xs text-stone-600">Combat Malnutrition</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/auth/login">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-600 font-semibold mb-6">
          Welcome to NutriBridge
        </div>
        <h2 className="text-5xl font-bold mb-4 text-stone-900">
          Building Healthier Communities <br className="hidden md:inline" />
          <span className="text-amber-600">Through Better Nutrition</span>
        </h2>
        <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Access nutrition education, track growth and dietary diversity, and connect with health workers and NGOs to combat malnutrition in Rwanda.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/register">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              Start Learning Today
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              Explore Features
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <BookOpen className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="font-bold mb-2">Education Hub</h3>
            <p className="text-sm text-stone-600">
              Learn about balanced diets, food diversity, and healthy nutrition practices
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <TrendingUp className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="font-bold mb-2">Growth Tracking</h3>
            <p className="text-sm text-stone-600">
              Monitor weight, height, and BMI for children and adults with alerts
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Apple className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="font-bold mb-2">Diet Monitoring</h3>
            <p className="text-sm text-stone-600">
              Track dietary diversity and meal patterns with easy-to-use logs
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="font-bold mb-2">Community Support</h3>
            <p className="text-sm text-stone-600">
              Connect with NGOs, health workers, and local food suppliers
            </p>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-white border-t border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">1 in 3</div>
              <p className="text-stone-600">
                Children under 5 in Rwanda suffer from chronic malnutrition
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <p className="text-stone-600">
                Access nutrition resources and track progress anytime, anywhere
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">Real Impact</div>
              <p className="text-stone-600">
                Evidence-based solutions connecting communities with support systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-stone-600 mb-8 max-w-xl mx-auto">
          Join thousands of households, health workers, and NGOs using NutriBridge to combat malnutrition.
        </p>
        <Link href="/auth/register">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
            Create Your Account Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-stone-600 text-sm">
          <p>© 2025 NutriBridge. Fighting malnutrition in Rwanda through technology and community.</p>
        </div>
      </footer>
    </main>
  )
}
