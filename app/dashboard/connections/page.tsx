"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { ConnectionService } from '@/lib/services/connections'
import { Connection, ConnectionStatus, User } from '@/lib/contracts'
import { Users, UserPlus, UserCheck, UserX, Search, MessageCircle } from 'lucide-react'

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([])
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([])
  const [sentRequests, setSentRequests] = useState<Connection[]>([])
  const [suggestions, setSuggestions] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadConnections()
  }, [])

  const loadConnections = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [connectionsData, pendingData, sentData, suggestionsData] = await Promise.all([
        ConnectionService.getConnections('current_user'),
        ConnectionService.getPendingRequests('current_user'),
        ConnectionService.getSentRequests('current_user'),
        ConnectionService.getSuggestions('current_user', 10)
      ])
      
      setConnections(connectionsData)
      setPendingRequests(pendingData)
      setSentRequests(sentData)
      setSuggestions(suggestionsData)
    } catch (err) {
      setError('Failed to load connections')
      console.error('Error loading connections:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (connectionId: string) => {
    try {
      await ConnectionService.acceptRequest(connectionId)
      loadConnections() // Refresh data
    } catch (err) {
      console.error('Failed to accept request:', err)
    }
  }

  const handleRejectRequest = async (connectionId: string) => {
    try {
      await ConnectionService.rejectRequest(connectionId)
      loadConnections() // Refresh data
    } catch (err) {
      console.error('Failed to reject request:', err)
    }
  }

  const handleSendRequest = async (targetId: string) => {
    try {
      await ConnectionService.sendRequest('current_user', targetId)
      loadConnections() // Refresh data
    } catch (err) {
      console.error('Failed to send request:', err)
    }
  }

  const handleRemoveConnection = async (connectionId: string) => {
    try {
      await ConnectionService.removeConnection(connectionId)
      loadConnections() // Refresh data
    } catch (err) {
      console.error('Failed to remove connection:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading connections...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadConnections} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Connections</h1>
          <p className="text-muted-foreground">
            Manage your network of artisans, buyers, and service providers
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search connections..."
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
              <div className="text-2xl font-bold">{connections.length}</div>
              <div className="text-sm text-muted-foreground">Connected</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{sentRequests.length}</div>
              <div className="text-sm text-muted-foreground">Sent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{suggestions.length}</div>
              <div className="text-sm text-muted-foreground">Suggestions</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="connections">Connections ({connections.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="sent">Sent ({sentRequests.length})</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
          </TabsList>

          {/* Connections Tab */}
          <TabsContent value="connections">
            {connections.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No connections yet"
                description="Start building your network by connecting with other artisans and buyers"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connections.map((connection) => (
                  <Card key={connection.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Connected User</CardTitle>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRemoveConnection(connection.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <EmptyState
                icon={UserPlus}
                title="No pending requests"
                description="You don't have any pending connection requests"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <UserPlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Request from User</CardTitle>
                          <p className="text-sm text-muted-foreground">Wants to connect</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <UserCheck className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <UserX className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sent Requests Tab */}
          <TabsContent value="sent">
            {sentRequests.length === 0 ? (
              <EmptyState
                icon={UserPlus}
                title="No sent requests"
                description="You haven't sent any connection requests yet"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sentRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <UserPlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Request to User</CardTitle>
                          <p className="text-sm text-muted-foreground">Pending approval</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">Pending</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions">
            {suggestions.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No suggestions"
                description="We couldn't find any connection suggestions at the moment"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((user) => (
                  <Card key={user.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{user.email}</CardTitle>
                          <p className="text-sm text-muted-foreground">{user.role.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleSendRequest(user.id)}
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        Connect
                      </Button>
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
