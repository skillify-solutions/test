"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorState } from '@/components/common/ErrorState'
import { ProfileService } from '@/lib/services/profiles'
import { Profile } from '@/lib/contracts'
import { User, MapPin, Globe, Star, Upload, Mic, Save } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    story: '',
    location: '',
    languages: [] as string[],
    contactVisibility: true,
    craftTypes: [] as string[],
    materials: [] as string[],
    techniques: [] as string[],
    certifications: [] as string[]
  })

  const craftTypes = ['Pottery', 'Textiles', 'Woodwork', 'Metalwork', 'Jewelry', 'Painting', 'Sculpture', 'Weaving']
  const materials = ['Clay', 'Cotton', 'Wood', 'Metal', 'Stone', 'Glass', 'Leather', 'Bamboo']
  const techniques = ['Hand-thrown', 'Hand-woven', 'Hand-carved', 'Hand-forged', 'Hand-painted', 'Hand-stitched', 'Hand-molded', 'Hand-embroidered']
  const certifications = ['GI Tag', 'Handmade', 'Organic', 'Fair Trade', 'Eco-friendly', 'Traditional', 'Heritage', 'Authentic']
  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi']

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock profile data
      const mockProfile: Profile = {
        id: 'current_profile',
        userId: 'current_user',
        displayName: 'Your Name',
        bio: 'Passionate artisan with years of experience in traditional crafts',
        location: 'Mumbai, Maharashtra',
        languages: ['Hindi', 'English'],
        craftTypes: ['Pottery', 'Textiles'],
        materials: ['Clay', 'Cotton'],
        techniques: ['Hand-thrown', 'Hand-woven'],
        experience: '20+ years',
        isPublic: true,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      setProfile(mockProfile)
      setFormData({
        name: mockProfile.displayName,
        bio: mockProfile.bio || '',
        story: '',
        location: mockProfile.location || '',
        languages: mockProfile.languages,
        contactVisibility: true,
        craftTypes: mockProfile.craftTypes,
        materials: mockProfile.materials,
        techniques: mockProfile.techniques,
        certifications: []
      })
    } catch (err) {
      setError('Failed to load profile')
      console.error('Error loading profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Mock save - in real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Profile saved:', formData)
      alert('Profile updated successfully! (UI-only prototype)')
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleArrayChange = (field: keyof typeof formData, value: string, checked: boolean) => {
    const currentArray = formData[field] as string[]
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentArray, value]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: currentArray.filter(item => item !== value)
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading profile...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadProfile} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
          <p className="text-muted-foreground">
            Manage your profile information and showcase your craft expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Brief description about yourself and your craft"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Story</label>
                  <Textarea
                    value={formData.story}
                    onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                    placeholder="Tell your craft journey and what makes your work special"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 mt-3 text-muted-foreground" />
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Craft Information */}
            <Card>
              <CardHeader>
                <CardTitle>Craft Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Craft Types */}
                <div>
                  <label className="block text-sm font-medium mb-3">Craft Types</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {craftTypes.map((craft) => (
                      <label key={craft} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.craftTypes.includes(craft)}
                          onChange={(e) => handleArrayChange('craftTypes', craft, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">{craft}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-sm font-medium mb-3">Materials</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {materials.map((material) => (
                      <label key={material} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.materials.includes(material)}
                          onChange={(e) => handleArrayChange('materials', material, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Techniques */}
                <div>
                  <label className="block text-sm font-medium mb-3">Techniques</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {techniques.map((technique) => (
                      <label key={technique} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.techniques.includes(technique)}
                          onChange={(e) => handleArrayChange('techniques', technique, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">{technique}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm font-medium mb-3">Certifications</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {certifications.map((cert) => (
                      <label key={cert} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(cert)}
                          onChange={(e) => handleArrayChange('certifications', cert, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {languages.map((language) => (
                    <label key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={(e) => handleArrayChange('languages', language, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.contactVisibility}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactVisibility: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Make my contact information visible to other users</span>
                </label>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{formData.name || 'Your Name'}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{formData.location || 'Location'}</p>
                  <p className="text-sm text-muted-foreground mb-4">{formData.bio || 'Your bio will appear here'}</p>
                  
                  {formData.craftTypes.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {formData.craftTypes.slice(0, 3).map((craft) => (
                        <Badge key={craft} variant="outline" className="text-xs">
                          {craft}
                        </Badge>
                      ))}
                      {formData.craftTypes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.craftTypes.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 mx-auto mb-3 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Not Verified</p>
                  <Button size="sm" variant="outline" disabled title="UI-only prototype">
                    Apply for Verification
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Picture</label>
                  <Button variant="outline" className="w-full gap-2" disabled title="UI-only prototype">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Voice Story</label>
                  <Button variant="outline" className="w-full gap-2" disabled title="UI-only prototype">
                    <Mic className="h-4 w-4" />
                    Record Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
