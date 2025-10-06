"use client"

import { Profile } from '@/lib/contracts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface ProfileCardProps {
  profile: Profile
  showActions?: boolean
  className?: string
}

export function ProfileCard({ profile, showActions = true, className }: ProfileCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
            ) : (
              <span className="text-lg font-semibold">
                {profile.displayName.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{profile.displayName}</h3>
              {profile.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            {profile.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{profile.location}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {profile.bio && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {profile.bio}
          </p>
        )}
        
        {profile.craftTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {profile.craftTypes.slice(0, 3).map((craft, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {craft}
              </Badge>
            ))}
            {profile.craftTypes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.craftTypes.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={`/profiles/${profile.id}`}>
                View Profile
              </Link>
            </Button>
            <Button size="sm" className="flex-1" disabled title="UI-only prototype">
              Connect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
