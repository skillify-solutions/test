"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { AdminService } from '@/lib/services/admin'
import { DropdownOption } from '@/lib/contracts'
import { Settings, Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'

export default function DropdownsPage() {
  const [options, setOptions] = useState<DropdownOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newOption, setNewOption] = useState({
    key: '',
    value: '',
    category: '',
    isActive: true
  })

  const categories = ['craft_type', 'material', 'technique', 'region', 'certification']

  useEffect(() => {
    loadOptions()
  }, [selectedCategory])

  const loadOptions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const category = selectedCategory !== 'all' ? selectedCategory : undefined
      const optionsData = await AdminService.getDropdownOptions(category)
      setOptions(optionsData)
    } catch (err) {
      setError('Failed to load dropdown options')
      console.error('Error loading options:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOption = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newOption.key.trim() || !newOption.value.trim() || !newOption.category) return
    
    try {
      await AdminService.createDropdownOption({
        key: newOption.key,
        value: newOption.value,
        label: newOption.value,
        category: newOption.category,
        order: 0,
        isActive: newOption.isActive
      })
      
      setNewOption({
        key: '',
        value: '',
        category: '',
        isActive: true
      })
      setShowCreateForm(false)
      loadOptions() // Refresh options
    } catch (err) {
      console.error('Failed to create option:', err)
    }
  }

  const handleUpdateOption = async (optionId: string, updates: Partial<DropdownOption>) => {
    try {
      await AdminService.updateDropdownOption(optionId, updates)
      loadOptions() // Refresh options
    } catch (err) {
      console.error('Failed to update option:', err)
    }
  }

  const handleDeleteOption = async (optionId: string) => {
    try {
      await AdminService.deleteDropdownOption(optionId)
      loadOptions() // Refresh options
    } catch (err) {
      console.error('Failed to delete option:', err)
    }
  }

  const filteredOptions = options.filter(option =>
    option.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading dropdown options...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadOptions} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Dropdown Management</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage dropdown options for forms and filters
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Create Option Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Option</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateOption} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Key *</label>
                    <Input
                      value={newOption.key}
                      onChange={(e) => setNewOption(prev => ({ ...prev, key: e.target.value }))}
                      placeholder="e.g., pottery"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Value *</label>
                    <Input
                      value={newOption.value}
                      onChange={(e) => setNewOption(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="e.g., Pottery"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Select value={newOption.category} onValueChange={(value) => setNewOption(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace('_', ' ').toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newOption.isActive}
                    onChange={(e) => setNewOption(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Active</span>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={!newOption.key.trim() || !newOption.value.trim() || !newOption.category}>
                    Add Option
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

        {/* Options */}
        {filteredOptions.length === 0 ? (
          <EmptyState
            icon={Settings}
            title="No options found"
            description={searchQuery ? "Try adjusting your search criteria" : "No dropdown options available"}
            action={{
              label: "Add Option",
              onClick: () => setShowCreateForm(true)
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredOptions.map((option) => (
              <Card key={option.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Settings className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{option.value}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Key: {option.key} • Category: {option.category.replace('_', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={option.isActive ? "default" : "secondary"}>
                        {option.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">
                        {option.category.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpdateOption(option.id, { isActive: !option.isActive })}
                    >
                      {option.isActive ? (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteOption(option.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
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
