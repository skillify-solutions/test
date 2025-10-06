"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { PostService } from '@/lib/services/posts'
import { Post, PostType } from '@/lib/contracts'
import { FileText, Plus, Search, Edit, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPost, setNewPost] = useState({
    content: '',
    isPublic: true
  })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const postsData = await PostService.getByAuthor('current_user')
      setPosts(postsData)
    } catch (err) {
      setError('Failed to load posts')
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.content.trim()) return
    
    try {
      await PostService.create({
        authorId: 'current_user',
        type: PostType.TEXT,
        content: newPost.content,
        mediaUrls: [],
        tags: [],
        isPublic: newPost.isPublic
      })
      
      setNewPost({ content: '', isPublic: true })
      setShowCreateForm(false)
      loadPosts() // Refresh posts
    } catch (err) {
      console.error('Failed to create post:', err)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await PostService.delete(postId)
      loadPosts() // Refresh posts
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading posts...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadPosts} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">My Posts</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
          <p className="text-muted-foreground">
            Share your work and connect with the community
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Create Post Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="What's on your mind? Share your latest work, techniques, or thoughts..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newPost.isPublic}
                      onChange={(e) => setNewPost(prev => ({ ...prev, isPublic: e.target.checked }))}
                    />
                    <span className="text-sm">Make this post public</span>
                  </label>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={!newPost.content.trim()}>
                    Post
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

        {/* Posts */}
        {filteredPosts.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No posts found"
            description={searchQuery ? "Try adjusting your search criteria" : "Share your first post with the community"}
            action={{
              label: "Create Post",
              onClick: () => setShowCreateForm(true)
            }}
          />
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-semibold">A</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Your Post</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={post.isPublic ? "default" : "secondary"}>
                        {post.isPublic ? "Public" : "Private"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm mb-4">{post.content}</p>
                  
                  {post.mediaUrls && post.mediaUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {post.mediaUrls.slice(0, 4).map((url, index) => (
                        <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">🖼️</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likesCount}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.commentsCount}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
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
