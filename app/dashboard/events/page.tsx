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
import { EventService } from '@/lib/services/events'
import { Event, UserRole } from '@/lib/contracts'
import { Calendar, Plus, Search, MapPin, Users, Clock, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    targetAudiences: [] as UserRole[]
  })

  const audiences = ['MAKER', 'DESIGN_CONSULTANT', 'BUYER', 'SERVICE_PROVIDER', 'MAKER_BUYER']

  useEffect(() => {
    loadEvents()
  }, [selectedFilter])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let eventsData: Event[]
      if (selectedFilter === 'upcoming') {
        eventsData = await EventService.getUpcoming(50)
      } else if (selectedFilter === 'past') {
        eventsData = await EventService.getPast(50)
      } else {
        const response = await EventService.list(1, 50)
        eventsData = response.data
      }
      
      setEvents(eventsData)
    } catch (err) {
      setError('Failed to load events')
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.title.trim() || !newEvent.startDate || !newEvent.endDate) return
    
    try {
      await EventService.create({
        title: newEvent.title,
        description: newEvent.description,
        type: 'workshop',
        location: newEvent.location,
        startDate: new Date(newEvent.startDate),
        endDate: new Date(newEvent.endDate),
        isOnline: false,
        organizerId: 'current_user',
        tags: [],
        isPublic: true
      })
      
      setNewEvent({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        targetAudiences: []
      })
      setShowCreateForm(false)
      loadEvents() // Refresh events
    } catch (err) {
      console.error('Failed to create event:', err)
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isUpcoming = (event: Event) => event.startDate > new Date()
  const isPast = (event: Event) => event.endDate < new Date()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading events...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadEvents} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Events</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Submit Event
            </Button>
          </div>
          <p className="text-muted-foreground">
            Discover workshops, exhibitions, and events for the handmade community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as 'all' | 'upcoming' | 'past')}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Create Event Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Title *</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Traditional Pottery Workshop"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the event in detail..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <Input
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Mumbai, Maharashtra"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Audiences</label>
                    <div className="flex flex-wrap gap-2">
                      {audiences.map((audience) => (
                        <label key={audience} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newEvent.targetAudiences.includes(audience as UserRole)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewEvent(prev => ({ ...prev, targetAudiences: [...prev.targetAudiences, audience as UserRole] }))
                              } else {
                                setNewEvent(prev => ({ ...prev, targetAudiences: prev.targetAudiences.filter(a => a !== audience) }))
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{audience.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date *</label>
                    <Input
                      type="datetime-local"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date *</label>
                    <Input
                      type="datetime-local"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={!newEvent.title.trim() || !newEvent.startDate || !newEvent.endDate}>
                    Submit Event
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

        {/* Events */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No events found"
            description={searchQuery ? "Try adjusting your search criteria" : "No events available at the moment"}
            action={{
              label: "Submit Event",
              onClick: () => setShowCreateForm(true)
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{event.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={isUpcoming(event) ? "default" : isPast(event) ? "secondary" : "outline"}>
                          {isUpcoming(event) ? "Upcoming" : isPast(event) ? "Past" : "Ongoing"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(event.startDate, 'MMM d, yyyy')} - {format(event.endDate, 'MMM d, yyyy')}
                      </span>
                    </div>
                    {event.maxAttendees && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Max {event.maxAttendees} attendees</span>
                      </div>
                    )}
                  </div>
                  
                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag.replace('_', ' ')}
                        </Badge>
                      ))}
                      {event.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{event.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    {isUpcoming(event) && (
                      <Button size="sm" disabled title="UI-only prototype">
                        Register
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
