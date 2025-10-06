"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorState } from '@/components/common/ErrorState'
import { AdminService } from '@/lib/services/admin'
import { BarChart3, Users, FileText, Download, TrendingUp, Eye, MessageSquare, Calendar } from 'lucide-react'

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalProfiles: 0,
    totalPosts: 0,
    totalResources: 0,
    totalServices: 0,
    totalEvents: 0,
    totalTickets: 0,
    recentActivity: [] as unknown[],
    topDownloads: [] as unknown[],
    activeRoles: [] as unknown[]
  })

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const analyticsData = await AdminService.getAnalytics()
      setAnalytics(analyticsData)
    } catch (err) {
      setError('Failed to load analytics')
      console.error('Error loading analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadAnalytics} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Platform insights and user engagement metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{analytics.totalPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Resources</p>
                  <p className="text-2xl font-bold">{analytics.totalResources}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Growth</p>
                  <p className="text-2xl font-bold">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Downloads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Top Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topDownloads.map((item, index) => {
                  const downloadItem = item as Record<string, unknown>
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{String(downloadItem.resource)}</p>
                          <p className="text-sm text-muted-foreground">{String(downloadItem.downloads)} downloads</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{String(downloadItem.downloads)}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Active Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Roles Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.activeRoles.map((role, index) => {
                  const roleItem = role as Record<string, unknown>
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{String(roleItem.role).replace('_', ' ')}</p>
                          <p className="text-sm text-muted-foreground">{String(roleItem.count)} users</p>
                        </div>
                      </div>
                      <Badge variant="outline">{String(roleItem.count)}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => {
                const activityItem = activity as Record<string, unknown>
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{String(activityItem.eventType)}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(String(activityItem.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Platform Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 mx-auto mb-3 flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Profile Views</h3>
              <p className="text-2xl font-bold text-green-600">+25%</p>
              <p className="text-sm text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto mb-3 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Messages</h3>
              <p className="text-2xl font-bold text-blue-600">+18%</p>
              <p className="text-sm text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Events</h3>
              <p className="text-2xl font-bold text-purple-600">+32%</p>
              <p className="text-sm text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
