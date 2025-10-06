import { Profile, User, UserRole, SortOptions, PaginatedResponse } from '@/lib/contracts'
import { MOCK_DELAY, DEFAULT_PAGE_SIZE } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let profiles: Profile[] = []
let users: User[] = []

// Initialize mock data
const initializeMockData = () => {
  if (profiles.length === 0) {
    // Create users first
    users = Array.from({ length: 20 }, () => MockFactory.createUser())
    
    // Create profiles for users
    profiles = users.map(user => MockFactory.createProfile(user.id, {
      displayName: `Profile for ${user.email}`,
      isVerified: Math.random() > 0.3,
      isPublic: Math.random() > 0.2
    }))
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ProfileService {
  static async list(
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
    filters?: {
      role?: UserRole
      craft?: string
      region?: string
      verified?: boolean
      tags?: string[]
    },
    sort?: SortOptions
  ): Promise<PaginatedResponse<Profile>> {
    await delay(MOCK_DELAY)
    initializeMockData()

    let filteredProfiles = [...profiles]

    // Apply filters
    if (filters) {
      if (filters.role) {
        const userIds = users.filter(u => u.role === filters.role).map(u => u.id)
        filteredProfiles = filteredProfiles.filter(p => userIds.includes(p.userId))
      }
      if (filters.craft) {
        filteredProfiles = filteredProfiles.filter(p => 
          p.craftTypes.some(ct => ct.toLowerCase().includes(filters.craft!.toLowerCase()))
        )
      }
      if (filters.region) {
        filteredProfiles = filteredProfiles.filter(p => 
          p.location?.toLowerCase().includes(filters.region!.toLowerCase())
        )
      }
      if (filters.verified !== undefined) {
        filteredProfiles = filteredProfiles.filter(p => p.isVerified === filters.verified)
      }
      if (filters.tags && filters.tags.length > 0) {
        filteredProfiles = filteredProfiles.filter(p => 
          filters.tags!.some(tag => 
            p.craftTypes.some(ct => ct.toLowerCase().includes(tag.toLowerCase())) ||
            p.materials.some(m => m.toLowerCase().includes(tag.toLowerCase())) ||
            p.techniques.some(t => t.toLowerCase().includes(tag.toLowerCase()))
          )
        )
      }
    }

    // Apply sorting
    if (sort) {
      filteredProfiles.sort((a, b) => {
        const aValue = (a as unknown as Record<string, unknown>)[sort.field] as string | number | Date | undefined
        const bValue = (b as unknown as Record<string, unknown>)[sort.field] as string | number | Date | undefined
        if (aValue === undefined || bValue === undefined) return 0;
        if (sort.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredProfiles.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total: filteredProfiles.length,
      page,
      limit,
      hasNext: endIndex < filteredProfiles.length,
      hasPrev: page > 1
    }
  }

  static async get(id: string): Promise<Profile | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return profiles.find(p => p.id === id) || null
  }

  static async getByUserId(userId: string): Promise<Profile | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return profiles.find(p => p.userId === userId) || null
  }

  static async create(profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Promise<Profile> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newProfile: Profile = {
      ...profile,
      id: MockFactory.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    profiles.push(newProfile)
    return newProfile
  }

  static async update(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = profiles.findIndex(p => p.id === id)
    if (index === -1) return null
    
    profiles[index] = {
      ...profiles[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return profiles[index]
  }

  static async delete(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = profiles.findIndex(p => p.id === id)
    if (index === -1) return false
    
    profiles.splice(index, 1)
    return true
  }

  static async search(query: string, filters?: {
    role?: UserRole
    craft?: string
    verified?: boolean
  }): Promise<Profile[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    let results = profiles.filter(p => 
      p.displayName.toLowerCase().includes(query.toLowerCase()) ||
      p.bio?.toLowerCase().includes(query.toLowerCase()) ||
      p.location?.toLowerCase().includes(query.toLowerCase()) ||
      p.craftTypes.some(ct => ct.toLowerCase().includes(query.toLowerCase())) ||
      p.materials.some(m => m.toLowerCase().includes(query.toLowerCase())) ||
      p.techniques.some(t => t.toLowerCase().includes(query.toLowerCase()))
    )

    // Apply additional filters
    if (filters) {
      if (filters.role) {
        const userIds = users.filter(u => u.role === filters.role).map(u => u.id)
        results = results.filter(p => userIds.includes(p.userId))
      }
      if (filters.verified !== undefined) {
        results = results.filter(p => p.isVerified === filters.verified)
      }
    }

    return results
  }

  static async getFeatured(): Promise<Profile[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Return verified profiles with public visibility
    return profiles
      .filter(p => p.isVerified && p.isPublic)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
  }

  static async getByRole(role: UserRole): Promise<Profile[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const userIds = users.filter(u => u.role === role).map(u => u.id)
    return profiles.filter(p => userIds.includes(p.userId))
  }
}
