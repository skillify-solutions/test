// Pure TypeScript interfaces - no runtime dependencies
// These define the data contracts for the entire application

export enum UserRole {
  MAKER = 'MAKER',
  DESIGN_CONSULTANT = 'DESIGN_CONSULTANT',
  BUYER = 'BUYER',
  EXPLORER = 'EXPLORER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  MAKER_BUYER = 'MAKER_BUYER'
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  PDF = 'pdf'
}

export enum ConnectionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  BLOCKED = 'blocked'
}

export enum PostType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  LINK = 'link'
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export enum FlagStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed'
}

export enum SubmissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface User {
  id: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  userId: string
  displayName: string
  bio?: string
  avatar?: string
  coverImage?: string
  location?: string
  website?: string
  socialLinks?: Record<string, string>
  craftTypes: string[]
  materials: string[]
  techniques: string[]
  experience: string
  languages: string[]
  isPublic: boolean
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MediaAsset {
  id: string
  ownerId: string
  type: MediaType
  filename: string
  url: string
  size: number
  metadata: Record<string, unknown>
  createdAt: Date
}

export interface CatalogItem {
  id: string
  profileId: string
  title: string
  description: string
  category: string
  subcategory?: string
  price?: number
  currency?: string
  images: string[]
  tags: string[]
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  authorId: string
  type: PostType
  content: string
  mediaUrls?: string[]
  linkPreview?: {
    url: string
    title: string
    description: string
    image?: string
  }
  tags: string[]
  isPublic: boolean
  likesCount: number
  commentsCount: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface PostLike {
  id: string
  postId: string
  userId: string
  createdAt: Date
}

export interface PostComment {
  id: string
  postId: string
  authorId: string
  content: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface PostFlag {
  id: string
  postId: string
  reporterId: string
  reason: string
  description?: string
  status: FlagStatus
  createdAt: Date
  resolvedAt?: Date
  resolvedBy?: string
}

export interface ProfileFlag {
  id: string
  profileId: string
  reporterId: string
  reason: string
  description?: string
  status: FlagStatus
  createdAt: Date
  resolvedAt?: Date
  resolvedBy?: string
}

export interface Connection {
  id: string
  requesterId: string
  targetId: string
  status: ConnectionStatus
  message?: string
  createdAt: Date
  updatedAt: Date
}

export interface MessageThread {
  id: string
  participants: string[]
  lastMessage?: Message
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  threadId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file'
  metadata?: Record<string, unknown>
  createdAt: Date
  readAt?: Date
}

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  fileUrl: string
  fileType: string
  fileSize: number
  tags: string[]
  downloadCount: number
  isPublic: boolean
  submittedBy: string
  createdAt: Date
  updatedAt: Date
  isApproved: boolean
}

export interface ResourceSubmission {
  id: string
  resourceId: string
  submittedBy: string
  status: SubmissionStatus
  reviewNotes?: string
  reviewedBy?: string
  reviewedAt?: Date
  createdAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  providerId: string
  price?: number
  currency?: string
  duration?: string
  location?: string
  isRemote: boolean
  tags: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ServiceSubmission {
  id: string
  serviceId: string
  submittedBy: string
  status: SubmissionStatus
  reviewNotes?: string
  reviewedBy?: string
  reviewedAt?: Date
  createdAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'workshop' | 'exhibition' | 'meetup' | 'conference'
  startDate: Date
  endDate: Date
  location: string
  isOnline: boolean
  maxAttendees?: number
  registrationUrl?: string
  organizerId: string
  tags: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Ticket {
  id: string
  subject: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  category: string
  submittedBy: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

export interface DropdownOption {
  id: string
  key: string
  category: string
  value: string
  label: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AnalyticsEvent {
  id: string
  eventType: string
  userId?: string
  metadata: Record<string, unknown>
  createdAt: Date
}

// Utility types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface FilterOptions {
  [key: string]: unknown
}