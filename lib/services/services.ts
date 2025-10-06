import { Service, ServiceSubmission, SubmissionStatus, PaginatedResponse, SortOptions } from '@/lib/contracts'
import { MOCK_DELAY, DEFAULT_PAGE_SIZE } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let services: Service[] = []
let serviceSubmissions: ServiceSubmission[] = []

// Initialize mock data
const initializeMockData = () => {
  if (services.length === 0) {
    // Create services
    services = Array.from({ length: 25 }, () => MockFactory.createService('user_1'))
    
    // Create some submissions
    serviceSubmissions = Array.from({ length: 8 }, () => ({
      id: MockFactory.generateId(),
      serviceId: services[Math.floor(Math.random() * services.length)].id,
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

export class ServiceService {
  static async list(
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
    category?: string,
    search?: string,
    sort?: SortOptions
  ): Promise<PaginatedResponse<Service>> {
    await delay(MOCK_DELAY)
    initializeMockData()

    let filteredServices = services.filter(s => s.isPublic)

    // Apply filters
    if (category) {
      filteredServices = filteredServices.filter(s => s.category.toLowerCase().includes(category.toLowerCase()))
    }

    if (search) {
      filteredServices = filteredServices.filter(s => 
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }

    // Apply sorting
    if (sort) {
      filteredServices.sort((a, b) => {
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
      filteredServices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredServices.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total: filteredServices.length,
      page,
      limit,
      hasNext: endIndex < filteredServices.length,
      hasPrev: page > 1
    }
  }

  static async get(id: string): Promise<Service | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return services.find(s => s.id === id) || null
  }

  static async create(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'isApproved'>): Promise<Service> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newService: Service = {
      ...service,
      id: MockFactory.generateId(),
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    services.push(newService)
    
    // Create submission record
    const submission: ServiceSubmission = {
      id: MockFactory.generateId(),
      serviceId: newService.id,
      submittedBy: 'current_user',
      status: SubmissionStatus.PENDING,
      createdAt: new Date()
    }
    
    serviceSubmissions.push(submission)
    
    return newService
  }

  static async update(id: string, updates: Partial<Service>): Promise<Service | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = services.findIndex(s => s.id === id)
    if (index === -1) return null
    
    services[index] = {
      ...services[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return services[index]
  }

  static async delete(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = services.findIndex(s => s.id === id)
    if (index === -1) return false
    
    services.splice(index, 1)
    return true
  }

  static async getSubmissions(): Promise<ServiceSubmission[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return serviceSubmissions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async approveSubmission(submissionId: string, approvedBy: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const submission = serviceSubmissions.find(s => s.id === submissionId)
    if (!submission) return false
    
    submission.status = SubmissionStatus.APPROVED
    submission.reviewedAt = new Date()
    submission.reviewedBy = approvedBy
    
    // Approve the service
    const service = services.find(s => s.id === submission.serviceId)
    if (service) {
      service.isPublic = true
      // Store approvedBy in comment since Service interface doesn't have this field
    }
    
    return true
  }

  static async rejectSubmission(submissionId: string, reviewedBy: string, notes?: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const submission = serviceSubmissions.find(s => s.id === submissionId)
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
    
    const categories = [...new Set(services.map(s => s.category))]
    return categories.sort()
  }

  static async getByProvider(providerId: string): Promise<Service[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return services
      .filter(s => s.providerId === providerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async search(query: string): Promise<Service[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return services.filter(s => 
      s.isPublic && (
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.description?.toLowerCase().includes(query.toLowerCase()) ||
        s.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    )
  }
}
