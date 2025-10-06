import { Resource, ResourceSubmission, SubmissionStatus, PaginatedResponse, SortOptions } from '@/lib/contracts'
import { MOCK_DELAY, DEFAULT_PAGE_SIZE } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let resources: Resource[] = []
let resourceSubmissions: ResourceSubmission[] = []

// Initialize mock data
const initializeMockData = () => {
  if (resources.length === 0) {
    // Create resources
    resources = Array.from({ length: 30 }, () => MockFactory.createResource())
    
    // Create some submissions
    resourceSubmissions = Array.from({ length: 10 }, () => ({
      id: MockFactory.generateId(),
      resourceId: resources[Math.floor(Math.random() * resources.length)].id,
      submittedBy: `user_${Math.floor(Math.random() * 5) + 1}`,
      status: Object.values(SubmissionStatus)[Math.floor(Math.random() * Object.values(SubmissionStatus).length)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      reviewedAt: Math.random() > 0.5 ? new Date() : undefined,
      reviewedBy: Math.random() > 0.5 ? 'admin_1' : undefined,
      reviewNotes: Math.random() > 0.5 ? 'Approved after review' : undefined
    }))
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ResourceService {
  static async list(
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
    category?: string,
    search?: string,
    sort?: SortOptions
  ): Promise<PaginatedResponse<Resource>> {
    await delay(MOCK_DELAY)
    initializeMockData()

    let filteredResources = resources.filter(r => r.isApproved)

    // Apply filters
    if (category) {
      filteredResources = filteredResources.filter(r => r.category.toLowerCase().includes(category.toLowerCase()))
    }

    if (search) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }

    // Apply sorting
    if (sort) {
      filteredResources.sort((a, b) => {
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
      filteredResources.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredResources.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total: filteredResources.length,
      page,
      limit,
      hasNext: endIndex < filteredResources.length,
      hasPrev: page > 1
    }
  }

  static async get(id: string): Promise<Resource | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return resources.find(r => r.id === id) || null
  }

  static async create(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt' | 'downloadCount' | 'isApproved'>): Promise<Resource> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newResource: Resource = {
      ...resource,
      id: MockFactory.generateId(),
      downloadCount: 0,
      isApproved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    resources.push(newResource)
    
    // Create submission record
    const submission: ResourceSubmission = {
      id: MockFactory.generateId(),
      resourceId: newResource.id,
      submittedBy: resource.submittedBy || 'current_user',
      status: SubmissionStatus.PENDING,
      createdAt: new Date()
    }
    
    resourceSubmissions.push(submission)
    
    return newResource
  }

  static async update(id: string, updates: Partial<Resource>): Promise<Resource | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = resources.findIndex(r => r.id === id)
    if (index === -1) return null
    
    resources[index] = {
      ...resources[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return resources[index]
  }

  static async delete(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = resources.findIndex(r => r.id === id)
    if (index === -1) return false
    
    resources.splice(index, 1)
    return true
  }

  static async download(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const resource = resources.find(r => r.id === id)
    if (!resource) return false
    
    resource.downloadCount += 1
    return true
  }

  static async getSubmissions(): Promise<ResourceSubmission[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return resourceSubmissions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async approveSubmission(submissionId: string, approvedBy: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const submission = resourceSubmissions.find(s => s.id === submissionId)
    if (!submission) return false
    
    submission.status = SubmissionStatus.APPROVED
    submission.reviewedAt = new Date()
    submission.reviewedBy = approvedBy
    
    // Approve the resource
    const resource = resources.find(r => r.id === submission.resourceId)
    if (resource) {
      resource.isApproved = true
      // Store approvedBy in a comment or remove this line since Resource doesn't have this field
    }
    
    return true
  }

  static async rejectSubmission(submissionId: string, reviewedBy: string, notes?: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const submission = resourceSubmissions.find(s => s.id === submissionId)
    if (!submission) return false
    
    submission.status = SubmissionStatus.REJECTED
    submission.reviewedAt = new Date()
    submission.reviewedBy = reviewedBy
    submission.reviewNotes = notes
    
    return true
  }

  static async getCategories(): Promise<string[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const categories = [...new Set(resources.map(r => r.category))]
    return categories.sort()
  }

  static async getPopular(): Promise<Resource[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return resources
      .filter(r => r.isApproved)
      .sort((a, b) => b.downloadCount - a.downloadCount)
      .slice(0, 10)
  }

  static async search(query: string): Promise<Resource[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return resources.filter(r => 
 
      r.isApproved && (
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description?.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    )
  }
}
