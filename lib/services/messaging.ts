import { MessageThread, Message } from '@/lib/contracts'
import { MOCK_DELAY } from '@/lib/services/config'
import { MockFactory } from '@/lib/mocks/factories'

// Mock data storage
let messageThreads: MessageThread[] = []
const messages: Message[] = []

// Initialize mock data
const initializeMockData = () => {
  if (messageThreads.length === 0) {
    // Create message threads
    const participants = [
      ['user_1', 'user_2'],
      ['user_1', 'user_3'],
      ['user_2', 'user_4'],
      ['user_3', 'user_5'],
      ['user_1', 'user_4', 'user_5']
    ]
    
    messageThreads = participants.map(participantList => ({
      id: MockFactory.generateId(),
      participants: participantList,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    }))
    
    // Create messages for each thread
    messageThreads.forEach(thread => {
      const messageCount = Math.floor(Math.random() * 10) + 1
      const threadMessages = Array.from({ length: messageCount }, (_, index) => {
        const senderId = thread.participants[Math.floor(Math.random() * thread.participants.length)]
        return MockFactory.createMessage(thread.id, senderId, {
          content: [
            'Hello! I saw your beautiful pottery work and would love to connect.',
            'Thank you for accepting my connection request. Your craftsmanship is amazing!',
            'I\'m interested in learning more about your techniques. Do you offer workshops?',
            'Your latest collection is stunning. Do you have any pieces available for purchase?',
            'I\'d love to collaborate on a project. Are you open to partnerships?',
            'That sounds great! When would be a good time to discuss this further?',
            'I can share some of my previous work with you. Would you like to see it?',
            'The traditional techniques you use are fascinating. How long have you been practicing?',
            'I\'m organizing a craft exhibition next month. Would you be interested in participating?',
            'Your work has inspired me to try some new techniques. Thank you for sharing!'
          ][index % 10]
        })
      })
      
      messages.push(...threadMessages)
      
      // Set last message for thread
      thread.lastMessage = threadMessages[threadMessages.length - 1]
    })
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class MessagingService {
  static async getThreads(userId: string): Promise<MessageThread[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return messageThreads
      .filter(thread => thread.participants.includes(userId))
      .sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0))
  }

  static async getThread(threadId: string): Promise<MessageThread | null> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return messageThreads.find(thread => thread.id === threadId) || null
  }

  static async createThread(participants: string[]): Promise<MessageThread> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newThread: MessageThread = {
      id: MockFactory.generateId(),
      participants,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    messageThreads.push(newThread)
    return newThread
  }

  static async getMessages(threadId: string): Promise<Message[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    return messages
      .filter(message => message.threadId === threadId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  static async sendMessage(threadId: string, senderId: string, content: string): Promise<Message> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newMessage: Message = {
      id: MockFactory.generateId(),
      threadId,
      senderId,
      content,
      type: 'text',
      createdAt: new Date()
    }
    
    messages.push(newMessage)
    
    // Update thread's last message and timestamp
    const thread = messageThreads.find(t => t.id === threadId)
    if (thread) {
      thread.lastMessage = newMessage
      thread.updatedAt = new Date()
    }
    
    return newMessage
  }

  static async sendVoiceMessage(threadId: string, senderId: string, voiceFile: string): Promise<Message> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    const newMessage: Message = {
      id: MockFactory.generateId(),
      threadId,
      senderId,
      content: '[Voice Message]',
      type: 'file',
      metadata: {
        voiceFile,
        transcriptionText: 'This is a mock transcription of the voice message.'
      },
      createdAt: new Date()
    }
    
    messages.push(newMessage)
    
    // Update thread's last message and timestamp
    const thread = messageThreads.find(t => t.id === threadId)
    if (thread) {
      thread.lastMessage = newMessage
      thread.updatedAt = new Date()
    }
    
    return newMessage
  }

  static async getOrCreateThread(userId1: string, userId2: string): Promise<MessageThread> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Check if thread already exists
    const existingThread = messageThreads.find(thread => 
      thread.participants.includes(userId1) && 
      thread.participants.includes(userId2) &&
      thread.participants.length === 2
    )
    
    if (existingThread) {
      return existingThread
    }
    
    // Create new thread
    return this.createThread([userId1, userId2])
  }

  static async markAsRead(threadId: string, userId: string): Promise<boolean> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // In a real app, this would update read status in database
    // For mock, we'll just return success
    return true
  }

  static async getUnreadCount(userId: string): Promise<number> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Mock unread count - in real app, this would be calculated from read status
    return Math.floor(Math.random() * 5)
  }

  static async searchMessages(query: string, userId: string): Promise<Message[]> {
    await delay(MOCK_DELAY)
    initializeMockData()
    
    // Get threads for user
    const userThreads = messageThreads.filter(thread => thread.participants.includes(userId))
    const threadIds = userThreads.map(thread => thread.id)
    
    return messages
      .filter(message => 
        threadIds.includes(message.threadId) &&
        message.content.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
}
