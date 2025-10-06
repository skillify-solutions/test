"use client"

import { Service } from '@/lib/contracts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  service: Service
  showActions?: boolean
  className?: string
}

export function ServiceCard({ service, showActions = true, className }: ServiceCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate">{service.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {service.category}
              </Badge>
              {service.isPublic && (
                <Badge variant="outline" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Public
                </Badge>
              )}
            </div>
            {service.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{service.location}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {service.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {service.description}
          </p>
        )}
        
        {service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {service.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {service.price && (
          <p className="text-sm font-medium text-primary mb-3">
            {service.currency} {service.price}
          </p>
        )}
        
        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={`/services/${service.id}`}>
                View Details
              </Link>
            </Button>
            <Button size="sm" className="flex-1" disabled title="UI-only prototype">
              Contact
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
