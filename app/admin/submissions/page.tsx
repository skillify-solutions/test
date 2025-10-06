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
import { ResourceSubmission, ServiceSubmission, SubmissionStatus } from '@/lib/contracts'
import { FileText, CheckCircle, XCircle, Eye, Clock } from 'lucide-react'

export default function SubmissionsPage() {
  const [resourceSubmissions, setResourceSubmissions] = useState<ResourceSubmission[]>([])
  const [serviceSubmissions, setServiceSubmissions] = useState<ServiceSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const submissionsData = await AdminService.getPendingSubmissions()
      setResourceSubmissions(submissionsData.resources)
      setServiceSubmissions(submissionsData.services)
    } catch (err) {
      setError('Failed to load submissions')
      console.error('Error loading submissions:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveSubmission = async (submissionId: string, type: 'resource' | 'service') => {
    try {
      if (type === 'resource') {
        await AdminService.approveSubmission(submissionId, 'admin_user')
      } else {
        await AdminService.approveSubmission(submissionId, 'admin_user')
      }
      loadSubmissions() // Refresh data
    } catch (err) {
      console.error('Failed to approve submission:', err)
    }
  }

  const handleRejectSubmission = async (submissionId: string, type: 'resource' | 'service', notes?: string) => {
    try {
      if (type === 'resource') {
        await AdminService.rejectSubmission(submissionId, 'admin_user', notes)
      } else {
        await AdminService.rejectSubmission(submissionId, 'admin_user', notes)
      }
      loadSubmissions() // Refresh data
    } catch (err) {
      console.error('Failed to reject submission:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading submissions...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadSubmissions} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submissions</h1>
          <p className="text-muted-foreground">
            Review and approve resource and service submissions
          </p>
        </div>

        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList>
            <TabsTrigger value="resources">
              Resource Submissions ({resourceSubmissions.filter(s => s.status === SubmissionStatus.PENDING).length})
            </TabsTrigger>
            <TabsTrigger value="services">
              Service Submissions ({serviceSubmissions.filter(s => s.status === SubmissionStatus.PENDING).length})
            </TabsTrigger>
          </TabsList>

          {/* Resource Submissions Tab */}
          <TabsContent value="resources">
            {resourceSubmissions.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No resource submissions"
                description="No resource submissions to review at the moment"
              />
            ) : (
              <div className="space-y-4">
                {resourceSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Resource Submission</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Submitted by user • {new Date(submission.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={submission.status === SubmissionStatus.PENDING ? "secondary" : submission.status === SubmissionStatus.APPROVED ? "default" : "outline"}>
                          {submission.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Resource Details</h4>
                          <p className="text-sm text-muted-foreground">
                            Resource ID: {submission.resourceId}
                          </p>
                        </div>
                        
                        {submission.reviewNotes && (
                          <div>
                            <h4 className="font-medium mb-2">Notes</h4> 
                            <p className="text-sm text-muted-foreground">{submission.reviewNotes}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Resource
                          </Button>
                          {submission.status === SubmissionStatus.PENDING && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleApproveSubmission(submission.id, 'resource')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectSubmission(submission.id, 'resource', 'Please provide more details')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
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

          {/* Service Submissions Tab */}
          <TabsContent value="services">
            {serviceSubmissions.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No service submissions"
                description="No service submissions to review at the moment"
              />
            ) : (
              <div className="space-y-4">
                {serviceSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Service Submission</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Submitted by user • {new Date(submission.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={submission.status === SubmissionStatus.PENDING ? "secondary" : submission.status === SubmissionStatus.APPROVED ? "default" : "outline"}>
                          {submission.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Service Details</h4>
                          <p className="text-sm text-muted-foreground">
                            Service ID: {submission.serviceId}
                          </p>
                        </div>
                        
                        {submission.reviewNotes && (
                          <div>
                            <h4 className="font-medium mb-2">Notes</h4> 
                            <p className="text-sm text-muted-foreground">{submission.reviewNotes}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Service
                          </Button>
                          {submission.status === SubmissionStatus.PENDING && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleApproveSubmission(submission.id, 'service')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectSubmission(submission.id, 'service', 'Please provide more details')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
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
