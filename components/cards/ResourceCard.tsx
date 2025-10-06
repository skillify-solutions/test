"use client"

import { Resource } from '@/lib/contracts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, FileText, Star, Eye } from 'lucide-react'

interface ResourceCardProps {
  resource: Resource
  showActions?: boolean
  onDownload?: (resource: Resource) => void
  className?: string
}

export function ResourceCard({ 
  resource, 
  showActions = true, 
  onDownload,
  className 
}: ResourceCardProps) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(resource)
    } else {
      // Mock download
      console.log('Downloading resource:', resource.title)
    }
  }
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate">{resource.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {resource.category}
              </Badge>
              {resource.isApproved && (
                <Badge variant="outline" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{resource.downloadCount} downloads</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{Math.round(resource.fileSize / 1024)} KB</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {resource.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {resource.description}
          </p>
        )}
        
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {resource.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{resource.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {showActions && (
          <Button 
            size="sm" 
            className="w-full" 
            onClick={handleDownload}
            disabled={!resource.isApproved}
          >
            <Download className="h-4 w-4 mr-2" />
            {resource.isApproved ? 'Download' : 'Pending Approval'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
