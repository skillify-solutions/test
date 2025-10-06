import { 
  ProfileFlag, PostFlag, FlagStatus, DropdownOption, AnalyticsEvent,
  ResourceSubmission, ServiceSubmission, SubmissionStatus, Ticket, TicketStatus
} from '@/lib/contracts'
import { MOCK_DELAY } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let profileFlags: ProfileFlag[] = []
let postFlags: PostFlag[] = []
const dropdownOptions: DropdownOption[] = []
let analyticsEvents: AnalyticsEvent[] = []

// Initialize mock data
const initializeMockData = () => {
  if (profileFlags.length === 0) {
    // Create profile flags
    profileFlags = Array.from({ length: 5 }, () => ({
      id: MockFactory.generateId(),
      profileId: `profile_${Math.floor(Math.random() * 5) + 1}`,
      reporterId: `user_${Math.floor(Math.random() * 5) + 1}`,
      reason: ['Inappropriate content', 'Fake profile', 'Spam', 'Misleading information'][Math.floor(Math.random() * 4)],
      status: Object.values(FlagStatus)[Math.floor(Math.random() * Object.values(FlagStatus).length)],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    }))

    // Create post flags
    postFlags = Array.from({ length: 8 }, () => ({
      id: MockFactory.generateId(),
      postId: `post_${Math.floor(Math.random() * 10) + 1}`,
      reporterId: `user_${Math.floor(Math.random() * 5) + 1}`,
      reason: ['Inappropriate content', 'Not craft related', 'Spam', 'Misleading information'][Math.floor(Math.random() * 4)],
      status: Object.values(FlagStatus)[Math.floor(Math.random() * Object.values(FlagStatus).length)],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    }))

    // Create dropdown options
    const categories = ['craft_type', 'material', 'technique', 'region', 'certification']
    categories.forEach(category => {
      const values = {
        craft_type: ['Pottery', 'Textiles', 'Woodwork', 'Metalwork', 'Jewelry', 'Painting', 'Sculpture', 'Weaving'],
        material: ['Clay', 'Cotton', 'Wood', 'Metal', 'Stone', 'Glass', 'Leather', 'Bamboo'],
        technique: ['Hand-thrown', 'Hand-woven', 'Hand-carved', 'Hand-forged', 'Hand-painted', 'Hand-stitched', 'Hand-molded', 'Hand-embroidered'],
        region: ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'],
        certification: ['GI Tag', 'Handmade', 'Organic', 'Fair Trade', 'Eco-friendly', 'Traditional', 'Heritage', 'Authentic']
      }
      
      const categoryValues = values[category as keyof typeof values]
      categoryValues.forEach((value, idx) => {
        dropdownOptions.push({
          id: MockFactory.generateId(),
          key: value.toLowerCase().replace(/\s+/g, '_'),
          value,
          category,
          label: value,
          order: idx + 1,
          isActive: true,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          updatedAt: new Date()
        })
      })
    })

    // Create analytics events
    analyticsEvents = Array.from({ length: 100 }, () => 
      MockFactory.createAnalyticsEvent(
        ['page_view', 'profile_view', 'resource_download', 'connection_request', 'message_sent'][Math.floor(Math.random() * 5)],
        `user_${Math.floor(Math.random() * 5) + 1}`
      )
    )
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class AdminService {
  // Flag management
  static async getProfileFlags(): Promise<ProfileFlag[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return profileFlags.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async getPostFlags(): Promise<PostFlag[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return postFlags.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async resolveProfileFlag(flagId: string, status: FlagStatus): Promise<ProfileFlag | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const flag = profileFlags.find(f => f.id === flagId)
    if (!flag) return null
    
  flag.status = status
    
    return flag
  }

  static async resolvePostFlag(flagId: string, status: FlagStatus): Promise<PostFlag | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const flag = postFlags.find(f => f.id === flagId)
    if (!flag) return null
    
  flag.status = status
    
    return flag
  }

  // Dropdown management
  static async getDropdownOptions(category?: string): Promise<DropdownOption[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    let options = dropdownOptions
    if (category) {
      options = options.filter(option => option.category === category)
    }
    
    return options.sort((a, b) => a.value.localeCompare(b.value))
  }

  static async createDropdownOption(option: Omit<DropdownOption, 'id' | 'createdAt' | 'updatedAt'>): Promise<DropdownOption> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newOption: DropdownOption = {
      ...option,
      id: MockFactory.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    dropdownOptions.push(newOption)
    return newOption
  }

  static async updateDropdownOption(id: string, updates: Partial<DropdownOption>): Promise<DropdownOption | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = dropdownOptions.findIndex(o => o.id === id)
    if (index === -1) return null
    
    dropdownOptions[index] = {
      ...dropdownOptions[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return dropdownOptions[index]
  }

  static async deleteDropdownOption(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = dropdownOptions.findIndex(o => o.id === id)
    if (index === -1) return false
    
    dropdownOptions.splice(index, 1)
    return true
  }

  // Analytics
  static async getAnalytics(): Promise<{
    totalUsers: number
    totalProfiles: number
    totalPosts: number
    totalResources: number
    totalServices: number
    totalEvents: number
    totalTickets: number
    recentActivity: AnalyticsEvent[]
    topDownloads: { resource: string; downloads: number }[]
    activeRoles: { role: string; count: number }[]
  }> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return {
      totalUsers: 50,
      totalProfiles: 45,
      totalPosts: 100,
      totalResources: 25,
      totalServices: 30,
      totalEvents: 15,
      totalTickets: 20,
      recentActivity: analyticsEvents.slice(-10).reverse(),
      topDownloads: [
        { resource: 'Pottery Techniques Guide', downloads: 45 },
        { resource: 'Textile Dyeing Methods', downloads: 38 },
        { resource: 'Wood Carving Basics', downloads: 32 },
        { resource: 'Jewelry Making Tutorial', downloads: 28 },
        { resource: 'Traditional Weaving Patterns', downloads: 25 }
      ],
      activeRoles: [
        { role: 'MAKER', count: 25 },
        { role: 'BUYER', count: 15 },
        { role: 'DESIGN_CONSULTANT', count: 8 },
        { role: 'SERVICE_PROVIDER', count: 5 },
        { role: 'MAKER_BUYER', count: 3 }
      ]
    }
  }

  static async getModerationStats(): Promise<{
    pendingProfileFlags: number
    pendingPostFlags: number
    pendingResourceSubmissions: number
    pendingServiceSubmissions: number
    openTickets: number
  }> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return {
      pendingProfileFlags: profileFlags.filter(f => f.status === FlagStatus.PENDING).length,
      pendingPostFlags: postFlags.filter(f => f.status === FlagStatus.PENDING).length,
      pendingResourceSubmissions: 3,
      pendingServiceSubmissions: 2,
      openTickets: 5
    }
  }

  // Content moderation
  static async hideProfile(profileId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    // In real app, this would update the profile's visibility
    return true
  }

  static async hidePost(postId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    // In real app, this would update the post's visibility
    return true
  }

  static async deleteProfile(profileId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    // In real app, this would soft delete the profile
    return true
  }

  static async deletePost(postId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    // In real app, this would soft delete the post
    return true
  }

  // Submission management
  static async approveSubmission(submissionId: string, adminId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    // In real app, this would update the submission status to approved
    return true
  }

  static async rejectSubmission(submissionId: string, adminId: string, notes?: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    // In real app, this would update the submission status to rejected
    return true
  }

  // Submissions management
  static async getPendingSubmissions(): Promise<{
    resources: ResourceSubmission[]
    services: ServiceSubmission[]
  }> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return {
      resources: [],
      services: []
    }
  }
}
