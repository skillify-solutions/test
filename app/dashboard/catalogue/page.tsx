"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { CatalogItem, MediaAsset, MediaType } from '@/lib/contracts'
import { Package, Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

export default function CataloguePage() {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadCatalogueItems()
  }, [])

  const loadCatalogueItems = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock catalogue items
      const mockItems: CatalogItem[] = [
        {
          id: '1',
          profileId: 'current_profile',
          title: 'Traditional Pottery Set',
          description: 'Handcrafted pottery set using traditional techniques',
          category: 'Pottery',
          subcategory: 'Traditional',
          images: ['/mock-assets/pottery1.jpg'],
          tags: ['pottery', 'traditional', 'handmade'],
          isAvailable: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date()
        },
        {
          id: '2',
          profileId: 'current_profile',
          title: 'Textile Collection',
          description: 'Beautiful handwoven textiles with natural dyes',
          category: 'Textiles',
          subcategory: 'Handwoven',
          images: ['/mock-assets/textile1.jpg'],
          tags: ['textiles', 'handwoven', 'natural-dyes'],
          isAvailable: false,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          updatedAt: new Date()
        }
      ]
      
      setItems(mockItems)
    } catch (err) {
      setError('Failed to load catalogue items')
      console.error('Error loading catalogue:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleVisibility = (itemId: string) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    ))
  }

  const deleteItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading catalogue...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadCatalogueItems} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Catalogue</h1>
            <Button disabled title="UI-only prototype">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage your craft portfolio and showcase your work
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your catalogue items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{items.length}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{items.filter(i => i.isAvailable).length}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{items.filter(i => !i.isAvailable).length}</div>
              <div className="text-sm text-muted-foreground">Unavailable</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{items.reduce((acc, item) => acc + item.images.length, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Images</div>
            </CardContent>
          </Card>
        </div>

        {/* Catalogue Items */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No items found"
            description={searchQuery ? "Try adjusting your search criteria" : "Start building your catalogue by adding your first item"}
            action={{
              label: "Add Item",
              onClick: () => console.log('Add item clicked')
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  {item.images.length > 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">🖼️</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant={item.isAvailable ? "default" : "secondary"}>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 3}
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
                      onClick={() => toggleVisibility(item.id)}
                    >
                      {item.isAvailable ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteItem(item.id)}
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
