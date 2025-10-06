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
import { TicketService } from '@/lib/services/tickets'
import { Ticket, TicketStatus, TicketPriority } from '@/lib/contracts'
import { HelpCircle, Plus, Search, MessageCircle, Clock, AlertCircle } from 'lucide-react'

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: TicketPriority.MEDIUM as TicketPriority
  })

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const ticketsData = await TicketService.getByUser('current_user')
      setTickets(ticketsData)
    } catch (err) {
      setError('Failed to load tickets')
      console.error('Error loading tickets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTicket.subject.trim() || !newTicket.description.trim()) return
    
    try {
      await TicketService.create({
        submittedBy: 'current_user',
        subject: newTicket.subject,
        description: newTicket.description,
        priority: newTicket.priority,
        status: TicketStatus.OPEN,
        category: '', // Provide a default or form value as needed
      })
      
      setNewTicket({
        subject: '',
        description: '',
        priority: TicketPriority.MEDIUM
      })
      setShowCreateForm(false)
      loadTickets() // Refresh tickets
    } catch (err) {
      console.error('Failed to create ticket:', err)
    }
  }

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN:
        return 'bg-red-100 text-red-800'
      case TicketStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800'
      case TicketStatus.RESOLVED:
        return 'bg-green-100 text-green-800'
      case TicketStatus.CLOSED:
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.HIGH:
        return 'bg-red-100 text-red-800'
      case TicketPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800'
      case TicketPriority.LOW:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading tickets...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadTickets} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Support Tickets</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </div>
          <p className="text-muted-foreground">
            Get help and support from our team
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Create Ticket Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <Input
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <Select value={newTicket.priority} onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value as TicketPriority }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TicketPriority.LOW}>Low</SelectItem>
                      <SelectItem value={TicketPriority.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={TicketPriority.HIGH}>High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please provide detailed information about your issue..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={!newTicket.subject.trim() || !newTicket.description.trim()}>
                    Create Ticket
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

        {/* Tickets */}
        {filteredTickets.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="No tickets found"
            description={searchQuery ? "Try adjusting your search criteria" : "You haven't created any support tickets yet"}
            action={{
              label: "Create Ticket",
              onClick: () => setShowCreateForm(true)
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Created {new Date(ticket.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {ticket.description}
                  </p>
                  
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <span>Assigned to: {ticket.assignedTo}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    {ticket.status === TicketStatus.OPEN && (
                      <Button size="sm" variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    )}
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
