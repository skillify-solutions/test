import { Ticket, TicketStatus, TicketPriority, PaginatedResponse, SortOptions } from '@/lib/contracts'
import { MOCK_DELAY, DEFAULT_PAGE_SIZE } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let tickets: Ticket[] = []

// Initialize mock data
const initializeMockData = () => {
  if (tickets.length === 0) {
    tickets = Array.from({ length: 15 }, () => MockFactory.createTicket('user_1'))
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class TicketService {
  static async list(
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE,
    filters?: {
      status?: TicketStatus
      priority?: TicketPriority
      assignedTo?: string
    },
    sort?: SortOptions
  ): Promise<PaginatedResponse<Ticket>> {
    await delay(MOCK_DELAY)
    initializeMockData()

    let filteredTickets = [...tickets]

    // Apply filters
    if (filters) {
      if (filters.status) {
        filteredTickets = filteredTickets.filter(t => t.status === filters.status)
      }
      if (filters.priority) {
        filteredTickets = filteredTickets.filter(t => t.priority === filters.priority)
      }
      if (filters.assignedTo) {
        filteredTickets = filteredTickets.filter(t => t.assignedTo === filters.assignedTo)
      }
    }

    // Apply sorting
    if (sort) {
      filteredTickets.sort((a, b) => {
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
      filteredTickets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredTickets.slice(startIndex, endIndex)

    const total = filteredTickets.length;
    const hasNext = endIndex < total;
    const hasPrev = startIndex > 0;
    return {
      data: paginatedData,
      total,
      page,
      limit,
      hasNext,
      hasPrev
    }
  }

  static async get(id: string): Promise<Ticket | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    return tickets.find(t => t.id === id) || null
  }

  static async create(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newTicket: Ticket = {
      ...ticket,
      id: MockFactory.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    tickets.push(newTicket)
    return newTicket
  }

  static async update(id: string, updates: Partial<Ticket>): Promise<Ticket | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = tickets.findIndex(t => t.id === id)
    if (index === -1) return null
    
    tickets[index] = {
      ...tickets[index],
      ...updates,
      updatedAt: new Date()
    }
    
    return tickets[index]
  }

  static async delete(id: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = tickets.findIndex(t => t.id === id)
    if (index === -1) return false
    
    tickets.splice(index, 1)
    return true
  }

  static async getByUser(userId: string): Promise<Ticket[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return tickets
      .filter(t => t.submittedBy === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async getByStatus(status: TicketStatus): Promise<Ticket[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return tickets
      .filter(t => t.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async getByPriority(priority: TicketPriority): Promise<Ticket[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return tickets
      .filter(t => t.priority === priority)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  static async assignTicket(ticketId: string, assignedTo: string): Promise<Ticket | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const ticket = tickets.find(t => t.id === ticketId)
    if (!ticket) return null
    
    ticket.assignedTo = assignedTo
    ticket.updatedAt = new Date()
    
    return ticket
  }

  static async updateStatus(ticketId: string, status: TicketStatus): Promise<Ticket | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const ticket = tickets.find(t => t.id === ticketId)
    if (!ticket) return null
    
    ticket.status = status
    ticket.updatedAt = new Date()
    
    return ticket
  }

  static async getStats(): Promise<{
    total: number
    open: number
    inProgress: number
    resolved: number
    closed: number
    highPriority: number
  }> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === TicketStatus.OPEN).length,
      inProgress: tickets.filter(t => t.status === TicketStatus.IN_PROGRESS).length,
      resolved: tickets.filter(t => t.status === TicketStatus.RESOLVED).length,
      closed: tickets.filter(t => t.status === TicketStatus.CLOSED).length,
      highPriority: tickets.filter(t => t.priority === TicketPriority.HIGH).length
    }
  }
}
