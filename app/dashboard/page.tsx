"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorState } from '@/components/common/ErrorState'
import { 
  User, Package, Users, MessageSquare, FileText, Settings, 
  HelpCircle, Calendar, TrendingUp, Star, Download, Eye
} from 'lucide-react'
import { ProfileService } from '@/lib/services/profiles'
import { PostService } from '@/lib/services/posts'
import { ResourceService } from '@/lib/services/resources'
import { ServiceService } from '@/lib/services/services'
import { EventService } from '@/lib/services/events'
import { TicketService } from '@/lib/services/tickets'
import { ConnectionService } from '@/lib/services/connections'
import { MessagingService } from '@/lib/services/messaging'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    profileViews: 0,
    connections: 0,
    messages: 0,
    posts: 0,
    resources: 0,
    services: 0,
    events: 0,
    tickets: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Load various stats in parallel
      const [
        connections,
        messages,
        posts,
        resources,
        services,
        events,
        tickets
      ] = await Promise.all([
        ConnectionService.getConnections('current_user'),
        MessagingService.getUnreadCount('current_user'),
        PostService.getByAuthor('current_user'),
        ResourceService.list(1, 5),
        ServiceService.getByProvider('current_user'),
        EventService.getUpcoming(5),
        TicketService.getByUser('current_user')
      ])
      
      setStats({
        profileViews: Math.floor(Math.random() * 100) + 50, // Mock data
        connections: connections.length,
        messages,
        posts: posts.length,
        resources: resources.data.length,
        services: services.length,
        events: events.length,
        tickets: tickets.length
      })
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const dashboardCards = [
    {
      title: 'Profile',
      description: 'Manage your profile and showcase your work',
      icon: User,
      href: '/dashboard/profile',
      color: 'bg-blue-500',
      stats: `${stats.profileViews} views`
    },
    {
      title: 'Catalogue',
      description: 'Upload and manage your craft portfolio',
      icon: Package,
      href: '/dashboard/catalogue',
      color: 'bg-green-500',
      stats: `${stats.posts} items`
    },
    {
      title: 'Connections',
      description: 'Connect with other artisans and buyers',
      icon: Users,
      href: '/dashboard/connections',
      color: 'bg-purple-500',
      stats: `${stats.connections} connections`
    },
    {
      title: 'Messages',
      description: 'Communicate with your network',
      icon: MessageSquare,
      href: '/dashboard/messages',
      color: 'bg-orange-500',
      stats: `${stats.messages} unread`
    },
    {
      title: 'Posts',
      description: 'Share updates and showcase your work',
      icon: FileText,
      href: '/dashboard/posts',
      color: 'bg-pink-500',
      stats: `${stats.posts} posts`
    },
    {
      title: 'Services',
      description: 'Offer your services to the community',
      icon: Settings,
      href: '/dashboard/services',
      color: 'bg-indigo-500',
      stats: `${stats.services} services`
    },
    {
      title: 'Resources',
      description: 'Access learning materials and templates',
      icon: Download,
      href: '/dashboard/resources',
      color: 'bg-teal-500',
      stats: `${stats.resources} available`
    },
    {
      title: 'Tickets',
      description: 'Get help and support',
      icon: HelpCircle,
      href: '/dashboard/tickets',
      color: 'bg-red-500',
      stats: `${stats.tickets} open`
    },
    {
      title: 'Events',
      description: 'Discover workshops and exhibitions',
      icon: Calendar,
      href: '/dashboard/events',
      color: 'bg-yellow-500',
      stats: `${stats.events} upcoming`
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadDashboardData} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your activity on the platform.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">{stats.profileViews}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Connections</p>
                  <p className="text-2xl font-bold">{stats.connections}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">{stats.messages}</p>
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
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-2xl font-bold">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${card.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{card.stats}</Badge>
                    <Button asChild size="sm">
                      <Link href={card.href}>
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New connection request from Priya Sharma</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Your post received 5 new likes</span>
                  <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">New message from Rajesh Kumar</span>
                  <span className="text-xs text-muted-foreground ml-auto">6 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Resource &quot;Pottery Techniques Guide&quot; downloaded</span>
                  <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
