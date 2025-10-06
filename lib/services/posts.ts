import { Post, PostLike, PostComment, PostFlag, FlagStatus, PaginatedResponse, SortOptions } from '@/lib/contracts'
import { MOCK_DELAY, DEFAULT_PAGE_SIZE } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let posts: Post[] = []
let postLikes: PostLike[] = []
let postComments: PostComment[] = []
const postFlags: PostFlag[] = []

// Initialize mock data
const initializeMockData = () => {
  if (posts.length === 0) {
    // Create posts
    posts = Array.from({ length: 50 }, () => MockFactory.createPost('user_1'))
    
    // Create likes for posts
    postLikes = Array.from({ length: 200 }, () => ({
      id: MockFactory.generateId(),
      postId: posts[Math.floor(Math.random() * posts.length)].id,
      userId: `user_${Math.floor(Math.random() * 5) + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    }))

    // Create comments for posts
    postComments = Array.from({ length: 100 }, () => ({
      id: MockFactory.generateId(),
      postId: posts[Math.floor(Math.random() * posts.length)].id,
      authorId: `user_${Math.floor(Math.random() * 5) + 1}`,
      content: [
        'Amazing work! The craftsmanship is incredible.',
        'I love the traditional techniques you\'re using.',
        'This is so inspiring. Thank you for sharing!',
        'The attention to detail is remarkable.',
        'I\'d love to learn more about your process.',
        'Beautiful piece! Do you have more like this?',
        'The colors are so vibrant and authentic.',
        'This reminds me of my grandmother\'s work.'
      ][Math.floor(Math.random() * 8)],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    }))

    // Update post counts
    posts.forEach(post => {
      post.likesCount = postLikes.filter(like => like.postId === post.id).length
      post.commentsCount = postComments.filter(comment => comment.postId === post.id).length
    })
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class PostService {
  static async list(
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
    sort?: SortOptions
  ): Promise<PaginatedResponse<Post>> {
    await delay(MOCK_DELAY)
    initializeMockData()

    const sortedPosts = [...posts].filter(p => !p.deletedAt)

    // Apply sorting
    if (sort) {
      sortedPosts.sort((a, b) => {
        const aValue = (a as unknown as Record<string, unknown>)[sort.field] as string | number | Date | undefined
        const bValue = (b as unknown as Record<string, unknown>)[sort.field] as string | number | Date | undefined
        if (aValue === undefined || bValue === undefined) return 0;
        if (sort.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    } else {
      // Default sort by creation date (newest first)
      sortedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = sortedPosts.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total: sortedPosts.length,
      page,
      limit,
      hasNext: endIndex < sortedPosts.length,
      hasPrev: page > 1
    }
  }

  static async get(id: string): Promise<Post | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return posts.find(p => p.id === id && !p.deletedAt) || null
  }

  static async create(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'commentsCount'>): Promise<Post> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newPost: Post = {
      ...post,
      id: MockFactory.generateId(),
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    posts.push(newPost)
    return newPost
  }

  static async update(id: string, updates: Partial<Post>): Promise<Post | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) return null
    
    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return posts[index]
  }

  static async delete(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) return false
    
    posts[index].deletedAt = new Date()
    return true
  }

  static async like(postId: string, userId: string): Promise<PostLike> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Check if already liked
    const existingLike = postLikes.find(like => like.postId === postId && like.userId === userId)
    if (existingLike) {
      // Unlike
      const index = postLikes.findIndex(like => like.id === existingLike.id)
      postLikes.splice(index, 1)
      
      // Update post like count
      const post = posts.find(p => p.id === postId)
      if (post) {
        post.likesCount = Math.max(0, post.likesCount - 1)
      }
      
      return existingLike
    }
    
    // Like
    const newLike: PostLike = {
      id: MockFactory.generateId(),
      postId,
      userId,
      createdAt: new Date()
    }
    
    postLikes.push(newLike)
    
    // Update post like count
    const post = posts.find(p => p.id === postId)
    if (post) {
      post.likesCount += 1
    }
    
    return newLike
  }

  static async getLikes(postId: string): Promise<PostLike[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return postLikes.filter(like => like.postId === postId)
  }

  static async addComment(postId: string, authorId: string, content: string): Promise<PostComment> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newComment: PostComment = {
      id: MockFactory.generateId(),
      postId,
      authorId,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    postComments.push(newComment)
    
    // Update post comment count
    const post = posts.find(p => p.id === postId)
    if (post) {
      post.commentsCount += 1
    }
    
    return newComment
  }

  static async getComments(postId: string): Promise<PostComment[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return postComments
      .filter(comment => comment.postId === postId && !comment.deletedAt)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  static async flag(postId: string, flaggedBy: string, reason: string): Promise<PostFlag> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newFlag: PostFlag = {
      id: MockFactory.generateId(),
      postId,
      reporterId: flaggedBy,
      reason,
      status: FlagStatus.PENDING,
      createdAt: new Date()
    }
    
    postFlags.push(newFlag)
    return newFlag
  }

  static async getFlags(postId: string): Promise<PostFlag[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return postFlags.filter(flag => flag.postId === postId)
  }

  static async getByAuthor(authorId: string): Promise<Post[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return posts
      .filter(p => p.authorId === authorId && !p.deletedAt)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async getFeed(userId: string): Promise<Post[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Simple feed algorithm - return recent posts from verified users
    return posts
      .filter(p => !p.deletedAt && p.isPublic)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 20)
  }
}
