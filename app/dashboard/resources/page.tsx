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
import { ResourceService } from '@/lib/services/resources'
import { Resource } from '@/lib/contracts'
import { FileText, Plus, Search, Edit, Trash2, Download, Eye, EyeOff } from 'lucide-react'

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[]
  })

  const categories = ['Tutorial', 'Guide', 'Template', 'Pattern', 'Technique']
  const tags = ['tutorial', 'guide', 'technique', 'traditional', 'craft', 'learning']

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await ResourceService.list(1, 100)
      setResources(response.data)
    } catch (err) {
      setError('Failed to load resources')
      console.error('Error loading resources:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResource.title.trim()) return
    
    try {
      await ResourceService.create({
        title: newResource.title,
        description: newResource.description,
        fileUrl: '/mock-resources/' + newResource.title.toLowerCase().replace(/\s+/g, '_') + '.pdf',
        fileType: 'pdf',
        fileSize: Math.floor(Math.random() * 5 * 1024 * 1024) + 1024 * 1024,
        tags: newResource.tags,
        category: newResource.category,
        isPublic: true,
        submittedBy: 'current_user'
      })
      
      setNewResource({
        title: '',
        description: '',
        category: '',
        tags: []
      })
      setShowCreateForm(false)
      loadResources() // Refresh resources
    } catch (err) {
      console.error('Failed to create resource:', err)
    }
  }

  const handleDownload = async (resourceId: string) => {
    try {
      await ResourceService.download(resourceId)
      console.log('Resource downloaded successfully')
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  const handleDeleteResource = async (resourceId: string) => {
    try {
      await ResourceService.delete(resourceId)
      loadResources() // Refresh resources
    } catch (err) {
      console.error('Failed to delete resource:', err)
    }
  }

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading resources...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadResources} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Resources</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Submit Resource
            </Button>
          </div>
          <p className="text-muted-foreground">
            Access learning materials, templates, and guides
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Create Resource Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit New Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateResource} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Resource Title *</label>
                  <Input
                    value={newResource.title}
                    onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Pottery Techniques Guide"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newResource.description}
                    onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the resource content..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={newResource.category} onValueChange={(value) => setNewResource(prev => ({ ...prev, category: value }))}>
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
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <label key={tag} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newResource.tags.includes(tag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewResource(prev => ({ ...prev, tags: [...prev.tags, tag] }))
                            } else {
                              setNewResource(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">File Upload</label>
                  <Button variant="outline" disabled title="UI-only prototype">
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={!newResource.title.trim()}>
                    Submit Resource
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

        {/* Resources */}
        {filteredResources.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No resources found"
            description={searchQuery ? "Try adjusting your search criteria" : "No resources available at the moment"}
            action={{
              label: "Submit Resource",
              onClick: () => setShowCreateForm(true)
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{resource.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {resource.category}
                        </Badge>
                        <Badge variant={resource.isApproved ? "default" : "outline"} className="text-xs">
                          {resource.isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {resource.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloadCount} downloads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{Math.round(resource.fileSize / 1024)} KB</span>
                    </div>
                  </div>
                  
                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(resource.id)}
                      disabled={!resource.isApproved}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {resource.isApproved ? 'Download' : 'Pending'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteResource(resource.id)}
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
