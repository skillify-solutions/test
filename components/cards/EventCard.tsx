"use client"

import { Event } from '@/lib/contracts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

interface EventCardProps {
  event: Event
  showActions?: boolean
  className?: string
}

export function EventCard({ event, showActions = true, className }: EventCardProps) {
  const isUpcoming = event.startDate > new Date()
  const isPast = event.endDate < new Date()
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate">{event.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant={isUpcoming ? 'default' : isPast ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {isUpcoming ? 'Upcoming' : isPast ? 'Past' : 'Ongoing'}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {event.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {event.description}
          </p>
        )}
        
        <div className="space-y-2 mb-3">
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
        
        {/* targetAudiences removed: not part of Event interface */}
        
        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={`/events/${event.id}`}>
                View Details
              </Link>
            </Button>
            {isUpcoming && (
              <Button size="sm" className="flex-1" disabled title="UI-only prototype">
                Register
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
