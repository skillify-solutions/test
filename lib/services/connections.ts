import { Connection, ConnectionStatus, User, UserRole } from '@/lib/contracts'
import { MOCK_DELAY } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let connections: Connection[] = []

// Initialize mock data
const initializeMockData = () => {
  if (connections.length === 0) {
    // Create connections between users
    const userIds = ['user_1', 'user_2', 'user_3', 'user_4', 'user_5']
    
    connections = Array.from({ length: 20 }, () => {
      const requesterId = userIds[Math.floor(Math.random() * userIds.length)]
      let targetId = userIds[Math.floor(Math.random() * userIds.length)]
      
      // Ensure requester and target are different
      while (targetId === requesterId) {
        targetId = userIds[Math.floor(Math.random() * userIds.length)]
      }
      
      return MockFactory.createConnection(requesterId, targetId)
    })
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ConnectionService {
  static async getConnections(userId: string): Promise<Connection[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return connections.filter(c => 
      (c.requesterId === userId || c.targetId === userId) && 
      c.status === ConnectionStatus.ACCEPTED
    )
  }

  static async getPendingRequests(userId: string): Promise<Connection[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return connections.filter(c => 
      c.targetId === userId && c.status === ConnectionStatus.PENDING
    )
  }

  static async getSentRequests(userId: string): Promise<Connection[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return connections.filter(c => 
      c.requesterId === userId && c.status === ConnectionStatus.PENDING
    )
  }

  static async sendRequest(requesterId: string, targetId: string): Promise<Connection> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Check if connection already exists
    const existingConnection = connections.find(c => 
      (c.requesterId === requesterId && c.targetId === targetId) ||
      (c.requesterId === targetId && c.targetId === requesterId)
    )
    
    if (existingConnection) {
      return existingConnection
    }
    
    const newConnection: Connection = {
      id: MockFactory.generateId(),
      requesterId,
      targetId,
      status: ConnectionStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    connections.push(newConnection)
    return newConnection
  }

  static async acceptRequest(connectionId: string): Promise<Connection | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const connection = connections.find(c => c.id === connectionId)
    if (!connection) return null
    
    connection.status = ConnectionStatus.ACCEPTED
    connection.updatedAt = new Date()
    
    return connection
  }

  static async rejectRequest(connectionId: string): Promise<Connection | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const connection = connections.find(c => c.id === connectionId)
    if (!connection) return null
    
    connection.status = ConnectionStatus.REJECTED
    connection.updatedAt = new Date()
    
    return connection
  }

  static async removeConnection(connectionId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const index = connections.findIndex(c => c.id === connectionId)
    if (index === -1) return false
    
    connections.splice(index, 1)
    return true
  }

  static async getSuggestions(userId: string, limit: number = 10): Promise<User[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Mock user suggestions - in real app, this would be based on algorithms
    const allUsers: User[] = [
      { id: 'user_1', email: 'user1@example.com', role: UserRole.MAKER, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'user_2', email: 'user2@example.com', role: UserRole.DESIGN_CONSULTANT, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'user_3', email: 'user3@example.com', role: UserRole.BUYER, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'user_4', email: 'user4@example.com', role: UserRole.SERVICE_PROVIDER, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'user_5', email: 'user5@example.com', role: UserRole.MAKER_BUYER, isActive: true, createdAt: new Date(), updatedAt: new Date() }
    ]
    
    // Filter out current user and already connected users
    const connectedUserIds = connections
      .filter(c => (c.requesterId === userId || c.targetId === userId) && c.status === ConnectionStatus.ACCEPTED)
      .map(c => c.requesterId === userId ? c.targetId : c.requesterId)
    
    const suggestions = allUsers
      .filter(user => user.id !== userId && !connectedUserIds.includes(user.id))
      .slice(0, limit)
    
    return suggestions
  }

  static async isConnected(userId1: string, userId2: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return connections.some(c => 
      ((c.requesterId === userId1 && c.targetId === userId2) ||
       (c.requesterId === userId2 && c.targetId === userId1)) &&
      c.status === ConnectionStatus.ACCEPTED
    )
  }

  static async getConnectionStatus(userId1: string, userId2: string): Promise<ConnectionStatus | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const connection = connections.find(c => 
      (c.requesterId === userId1 && c.targetId === userId2) ||
      (c.requesterId === userId2 && c.targetId === userId1)
    )
    
    return connection?.status || null
  }
}
