"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { ServiceService } from '@/lib/services/services'
import { Service } from '@/lib/contracts'
import { Settings, Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    priceRange: '',
    location: '',
    tags: [] as string[]
  })

  const categories = ['Consultation', 'Training', 'Support', 'Certification', 'Development']
  const tags = ['consultation', 'training', 'support', 'development', 'certification']

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const servicesData = await ServiceService.getByProvider('current_user')
      setServices(servicesData)
    } catch (err) {
      setError('Failed to load services')
      console.error('Error loading services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newService.title.trim()) return
    
    try {
      await ServiceService.create({
  providerId: 'current_user',
  title: newService.title,
  description: newService.description,
  category: newService.category,
  tags: newService.tags,
  location: newService.location,
  isRemote: false,
  isPublic: true
      })
      
      setNewService({
        title: '',
        description: '',
        category: '',
        priceRange: '',
        location: '',
        tags: []
      })
      setShowCreateForm(false)
      loadServices() // Refresh services
    } catch (err) {
      console.error('Failed to create service:', err)
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    try {
      await ServiceService.delete(serviceId)
      loadServices() // Refresh services
    } catch (err) {
      console.error('Failed to delete service:', err)
    }
  }

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading services...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadServices} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">My Services</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage the services you offer to the community
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Create Service Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateService} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Title *</label>
                  <Input
                    value={newService.title}
                    onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Design Consultation"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your service in detail..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={newService.category} onValueChange={(value) => setNewService(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <Input
                      value={newService.priceRange}
                      onChange={(e) => setNewService(prev => ({ ...prev, priceRange: e.target.value }))}
                      placeholder="e.g., ₹5,000 - ₹15,000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={newService.location}
                    onChange={(e) => setNewService(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Mumbai, Maharashtra or Online"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <label key={tag} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newService.tags.includes(tag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewService(prev => ({ ...prev, tags: [...prev.tags, tag] }))
                            } else {
                              setNewService(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={!newService.title.trim()}>
                    Add Service
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Services */}
        {filteredServices.length === 0 ? (
          <EmptyState
            icon={Settings}
            title="No services found"
            description={searchQuery ? "Try adjusting your search criteria" : "Add your first service to start helping the community"}
            action={{
              label: "Add Service",
              onClick: () => setShowCreateForm(true)
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{service.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                        {/* Approval badge removed: isApproved is not part of Service */}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {service.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  
                  {/* priceRange is not part of Service, so not shown */}
                  
                  {service.location && (
                    <p className="text-sm text-muted-foreground mb-3">
                      📍 {service.location}
                    </p>
                  )}
                  
                  {service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {service.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
