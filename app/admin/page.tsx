"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorState } from '@/components/common/ErrorState'
import { AdminService } from '@/lib/services/admin'
import { 
  Shield, Flag, FileText, Users, BarChart3, Settings, 
  AlertTriangle, CheckCircle, Clock, TrendingUp
} from 'lucide-react'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfiles: 0,
    totalPosts: 0,
    totalResources: 0,
    totalServices: 0,
    totalEvents: 0,
    totalTickets: 0
  })
  const [moderationStats, setModerationStats] = useState({
    pendingProfileFlags: 0,
    pendingPostFlags: 0,
    pendingResourceSubmissions: 0,
    pendingServiceSubmissions: 0,
    openTickets: 0
  })

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [analytics, moderation] = await Promise.all([
        AdminService.getAnalytics(),
        AdminService.getModerationStats()
      ])
      
      setStats({
        totalUsers: analytics.totalUsers,
        totalProfiles: analytics.totalProfiles,
        totalPosts: analytics.totalPosts,
        totalResources: analytics.totalResources,
        totalServices: analytics.totalServices,
        totalEvents: analytics.totalEvents,
        totalTickets: analytics.totalTickets
      })
      
      setModerationStats(moderation)
    } catch (err) {
      setError('Failed to load admin data')
      console.error('Error loading admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading admin dashboard...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadAdminData} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage the platform, moderate content, and oversee community activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
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
                  <p className="text-2xl font-bold">{stats.totalPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Flag className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Flags</p>
                  <p className="text-2xl font-bold">{moderationStats.pendingProfileFlags + moderationStats.pendingPostFlags}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Growth</p>
                  <p className="text-2xl font-bold">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Moderation Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Content Moderation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Flags</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{moderationStats.pendingProfileFlags}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/admin/content">Review</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Post Flags</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{moderationStats.pendingPostFlags}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/admin/content">Review</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Resource Submissions</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{moderationStats.pendingResourceSubmissions}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/admin/submissions">Review</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Service Submissions</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{moderationStats.pendingServiceSubmissions}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/admin/submissions">Review</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Open Tickets</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{moderationStats.openTickets}</Badge>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm text-muted-foreground">99.9%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New user registration: Priya Sharma</span>
                  <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Resource submission approved</span>
                  <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Profile flag reported</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Service submission pending review</span>
                  <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/content">
                  <Flag className="h-4 w-4 mr-2" />
                  Review Content Flags
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/submissions">
                  <FileText className="h-4 w-4 mr-2" />
                  Review Submissions
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/dropdowns">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Dropdowns
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
