"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { AdminService } from '@/lib/services/admin'
import { ProfileFlag, PostFlag, FlagStatus } from '@/lib/contracts'
import { Flag, User, FileText, CheckCircle, XCircle, Eye } from 'lucide-react'

export default function ContentModerationPage() {
  const [profileFlags, setProfileFlags] = useState<ProfileFlag[]>([])
  const [postFlags, setPostFlags] = useState<PostFlag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFlags()
  }, [])

  const loadFlags = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [profileFlagsData, postFlagsData] = await Promise.all([
        AdminService.getProfileFlags(),
        AdminService.getPostFlags()
      ])
      
      setProfileFlags(profileFlagsData)
      setPostFlags(postFlagsData)
    } catch (err) {
      setError('Failed to load flags')
      console.error('Error loading flags:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleResolveFlag = async (flagId: string, status: FlagStatus, type: 'profile' | 'post') => {
    try {
      if (type === 'profile') {
        await AdminService.resolveProfileFlag(flagId, status)
      } else {
        await AdminService.resolvePostFlag(flagId, status)
      }
      loadFlags() // Refresh data
    } catch (err) {
      console.error('Failed to resolve flag:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading content flags...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadFlags} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content Moderation</h1>
          <p className="text-muted-foreground">
            Review and resolve content flags and reports
          </p>
        </div>

        <Tabs defaultValue="profiles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profiles">
              Profile Flags ({profileFlags.filter(f => f.status === FlagStatus.PENDING).length})
            </TabsTrigger>
            <TabsTrigger value="posts">
              Post Flags ({postFlags.filter(f => f.status === FlagStatus.PENDING).length})
            </TabsTrigger>
          </TabsList>

          {/* Profile Flags Tab */}
          <TabsContent value="profiles">
            {profileFlags.length === 0 ? (
              <EmptyState
                icon={User}
                title="No profile flags"
                description="No profile flags to review at the moment"
              />
            ) : (
              <div className="space-y-4">
                {profileFlags.map((flag) => (
                  <Card key={flag.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Flag className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Profile Flag</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Flagged by user • {new Date(flag.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={flag.status === FlagStatus.PENDING ? "secondary" : "outline"}>
                          {flag.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Reason</h4>
                          <p className="text-sm text-muted-foreground">{flag.reason}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                          {flag.status === FlagStatus.PENDING && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveFlag(flag.id, FlagStatus.RESOLVED, 'profile')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveFlag(flag.id, FlagStatus.DISMISSED, 'profile')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Dismiss
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Post Flags Tab */}
          <TabsContent value="posts">
            {postFlags.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No post flags"
                description="No post flags to review at the moment"
              />
            ) : (
              <div className="space-y-4">
                {postFlags.map((flag) => (
                  <Card key={flag.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Flag className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Post Flag</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Flagged by user • {new Date(flag.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={flag.status === FlagStatus.PENDING ? "secondary" : "outline"}>
                          {flag.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Reason</h4>
                          <p className="text-sm text-muted-foreground">{flag.reason}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Post
                          </Button>
                          {flag.status === FlagStatus.PENDING && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveFlag(flag.id, FlagStatus.RESOLVED, 'post')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveFlag(flag.id, FlagStatus.DISMISSED, 'post')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Dismiss
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
