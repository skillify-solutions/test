"use client"

import { Post } from '@/lib/contracts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Share2, Flag, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: Post
  showActions?: boolean
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onFlag?: (postId: string) => void
  className?: string
}

export function PostCard({ 
  post, 
  showActions = true, 
  onLike,
  onComment,
  onShare,
  onFlag,
  className 
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likesCount)
  
  const handleLike = () => {
    if (onLike) {
      onLike(post.id)
    } else {
      setIsLiked(!isLiked)
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    }
  }
  
  const handleComment = () => {
    if (onComment) {
      onComment(post.id)
    }
  }
  
  const handleShare = () => {
    if (onShare) {
      onShare(post.id)
    } else {
      // Mock share - copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`)
    }
  }
  
  const handleFlag = () => {
    if (onFlag) {
      onFlag(post.id)
    }
  }
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-semibold">A</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Artisan Name</h4>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(post.createdAt)} ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleFlag}>
              <Flag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm mb-3">{post.content}</p>
        
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {post.mediaUrls.slice(0, 4).map((url, index) => (
              <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  {/* Display a generic media icon, or use file extension/type if available */}
                  📄
                </span>
              </div>
            ))}
            {post.mediaUrls.length > 4 && (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{post.mediaUrls.length - 4} more
                </span>
              </div>
            )}
          </div>
        )}
        
        {showActions && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleComment}>
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.commentsCount}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
