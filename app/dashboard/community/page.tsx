'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Globe, Heart, Filter, Plus, MessageCircle } from 'lucide-react'

interface Organization {
  id: number
  name: string
  type: 'ngo' | 'health-center' | 'supplier' | 'government'
  province: string
  district: string
  address: string
  phone: string
  email: string
  website?: string
  description: string
  services: string[]
  rating: number
}

const organizations: Organization[] = [
  {
    id: 1,
    name: 'Nutrition Action Rwanda',
    type: 'ngo',
    province: 'Kigali',
    district: 'Kicukiro',
    address: 'KN 2 Street, Kigali',
    phone: '+250 798 123 456',
    email: 'info@nutritionactionrwanda.org',
    website: 'www.nutritionactionrwanda.org',
    description: 'Community nutrition programs and food security initiatives',
    services: ['Food Distribution', 'Nutrition Training', 'Health Education'],
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Kigali Central Health Center',
    type: 'health-center',
    province: 'Kigali',
    district: 'Gasabo',
    address: 'Kabeza Road, Kigali',
    phone: '+250 788 234 567',
    email: 'contact@kchc.rw',
    description: 'Primary health care and nutrition counseling services',
    services: ['Nutrition Counseling', 'Child Monitoring', 'Maternal Health'],
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Local Food Market Co-operative',
    type: 'supplier',
    province: 'Kigali',
    district: 'Nyarugenge',
    address: 'Muhima Market, Kigali',
    phone: '+250 799 345 678',
    email: 'market@localfood.rw',
    description: 'Fresh local produce and affordable nutrition source',
    services: ['Fresh Vegetables', 'Grains', 'Legumes', 'Local Fruits'],
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Southern Province Nutrition Program',
    type: 'government',
    province: 'Southern',
    district: 'Huye',
    address: 'Ministry Annex, Huye',
    phone: '+250 789 456 789',
    email: 'info@spnp.gov.rw',
    description: 'Government-led nutrition and food security programs',
    services: ['Policy Implementation', 'Community Education', 'Monitoring'],
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Eastern Health Alliance',
    type: 'ngo',
    province: 'Eastern',
    district: 'Bugesera',
    address: 'Health Complex, Bugesera',
    phone: '+250 787 567 890',
    email: 'support@eha.rw',
    description: 'Healthcare and nutrition support in eastern Rwanda',
    services: ['Health Screening', 'Nutrition Support', 'Counseling'],
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Northern Farmers Association',
    type: 'supplier',
    province: 'Northern',
    district: 'Musanze',
    address: 'Cooperative Center, Musanze',
    phone: '+250 796 678 901',
    email: 'farmers@nfa.org',
    description: 'Cooperative farmers producing nutritious foods',
    services: ['Organic Produce', 'Dairy Products', 'Direct Sales'],
    rating: 4.7,
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedProvince, setSelectedProvince] = useState('all')
  const [expandedOrg, setExpandedOrg] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)

  const types = ['all', 'ngo', 'health-center', 'supplier', 'government']
  const provinces = ['all', ...new Set(organizations.map(o => o.province))]

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || org.type === selectedType
    const matchesProvince = selectedProvince === 'all' || org.province === selectedProvince
    return matchesSearch && matchesType && matchesProvince
  })

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'ngo': 'Non-Governmental Organization',
      'health-center': 'Health Center',
      'supplier': 'Food Supplier',
      'government': 'Government Program',
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'ngo': 'bg-primary/10 text-primary',
      'health-center': 'bg-success/10 text-success',
      'supplier': 'bg-amber-100 text-amber-700',
      'government': 'bg-blue-100 text-blue-700',
    }
    return colors[type] || 'bg-neutral-100 text-neutral-700'
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community Support Directory</h1>
            <p className="text-muted-foreground">
              Connect with local NGOs, health centers, suppliers, and programs
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            Submit Organization
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg"
              />
              <Filter className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Organization Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : getTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Province</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full"
                >
                  {provinces.map(province => (
                    <option key={province} value={province}>
                      {province === 'all' ? 'All Provinces' : province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Organizations Grid */}
        {filteredOrgs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredOrgs.map(org => (
              <Card
                key={org.id}
                className="hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{org.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(org.type)}`}>
                        {getTypeLabel(org.type)}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(org.id)}
                      className="text-muted-foreground hover:text-danger transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(org.id)
                            ? 'fill-danger text-danger'
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <p className="text-muted-foreground line-clamp-2">{org.description}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{org.district}, {org.province}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {org.services.slice(0, 3).map(service => (
                        <span key={service} className="text-xs bg-neutral-100 px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                      {org.services.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{org.services.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.floor(org.rating) ? 'text-primary' : 'text-neutral-300'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">{org.rating}</span>
                  </div>
                </div>

                <div className="border-t border-border p-4 space-y-2">
                  <Button
                    onClick={() => {
                      setSelectedOrg(org)
                      setShowContactForm(true)
                    }}
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    onClick={() => setExpandedOrg(expandedOrg === org.id ? null : org.id)}
                    variant="outline"
                    className="w-full border-border text-foreground"
                    size="sm"
                  >
                    {expandedOrg === org.id ? 'Hide' : 'Show'} Details
                  </Button>
                </div>

                {expandedOrg === org.id && (
                  <div className="bg-neutral-50 border-t border-border p-4 space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-foreground mb-1">All Services:</p>
                      <ul className="space-y-1">
                        {org.services.map(service => (
                          <li key={service} className="text-muted-foreground flex gap-2">
                            <span className="text-success">•</span> {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Contact Information:</p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {org.phone}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" /> {org.email}
                      </p>
                      {org.website && (
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Globe className="w-4 h-4" /> {org.website}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-muted-foreground text-lg">No organizations found</p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedType('all')
                setSelectedProvince('all')
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <h3 className="text-lg font-bold">Saved Organizations ({favorites.length})</h3>
            </div>
            <p className="text-muted-foreground">
              You have saved {favorites.length} organization{favorites.length !== 1 ? 's' : ''} for quick access
            </p>
          </Card>
        )}

        {/* Contact Form Modal */}
        {showContactForm && selectedOrg && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Contact {selectedOrg.name}</h2>
                <p className="text-muted-foreground mb-6 text-sm">{selectedOrg.type === 'supplier' ? 'Send an inquiry' : 'Request support'}</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Message sent successfully!')
                    setShowContactForm(false)
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name</label>
                    <input type="text" placeholder="Your name" required className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Contact</label>
                    <input type="text" placeholder="Email or phone" required className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary-dark text-white">
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
