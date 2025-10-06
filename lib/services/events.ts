import { Event, UserRole, PaginatedResponse, SortOptions } from '@/lib/contracts'
import { MOCK_DELAY, DEFAULT_PAGE_SIZE } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let events: Event[] = []

// Initialize mock data
const initializeMockData = () => {
  if (events.length === 0) {
    events = Array.from({ length: 20 }, () => MockFactory.createEvent())
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class EventService {
  static async list(
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
    filters?: {
      location?: string
      dateRange?: { start: Date; end: Date }
      targetAudience?: UserRole
    },
    sort?: SortOptions
  ): Promise<PaginatedResponse<Event>> {
    await delay(MOCK_DELAY)
    initializeMockData()

  let filteredEvents = [...events]

    // Apply filters
    if (filters) {
      if (filters.location) {
        filteredEvents = filteredEvents.filter(e => 
          e.location.toLowerCase().includes(filters.location!.toLowerCase())
        )
      }
      
      if (filters.dateRange) {
        filteredEvents = filteredEvents.filter(e => 
          e.startDate >= filters.dateRange!.start && e.endDate <= filters.dateRange!.end
        )
      }
      
      // targetAudience filter removed: Event has no targetAudiences
    }

    // Apply sorting
    if (sort) {
      filteredEvents.sort((a, b) => {
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
      // Default sort by start date (upcoming first)
      filteredEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredEvents.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total: filteredEvents.length,
      page,
      limit,
      hasNext: endIndex < filteredEvents.length,
      hasPrev: startIndex > 0
    }
  }

  static async get(id: string): Promise<Event | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
  return events.find(e => e.id === id) || null
  }

  static async create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newEvent: Event = {
      ...event,
      id: MockFactory.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    events.push(newEvent)
    return newEvent
  }

  static async update(id: string, updates: Partial<Event>): Promise<Event | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return null
    
    events[index] = {
      ...events[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return events[index]
  }

  static async delete(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return false
    
  events.splice(index, 1)
  return true
  }

  static async getUpcoming(limit: number = 10): Promise<Event[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const now = new Date()
    return events
      .filter(e => e.startDate > now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, limit)
  }

  static async getPast(limit: number = 10): Promise<Event[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const now = new Date()
    return events
      .filter(e => e.endDate < now)
      .sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
      .slice(0, limit)
  }

  static async getByLocation(location: string): Promise<Event[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return events.filter(e => 
      e.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  static async getByTargetAudience(audience: UserRole): Promise<Event[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // targetAudiences is not part of Event, return empty array
    return []
  }

  static async search(query: string): Promise<Event[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return events.filter(e => 
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.description?.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase())
    )
  }

  static async getLocations(): Promise<string[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const locations = [...new Set(events.map(e => e.location))]
    return locations.sort()
  }

  static async getTargetAudiences(): Promise<UserRole[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
  // targetAudiences is not part of Event, return empty array
  return []
  }
}
