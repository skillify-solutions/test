import { 
  User, UserRole, Profile, MediaAsset, MediaType, CatalogItem, Post, 
  PostLike, PostComment, Connection, ConnectionStatus, MessageThread, 
  Message, Resource, Service, Event, FAQ, Ticket, TicketStatus, 
  TicketPriority, ProfileFlag, PostFlag, FlagStatus, DropdownOption,
  AnalyticsEvent, ResourceSubmission, ServiceSubmission, SubmissionStatus,
  PostType
} from '@/lib/contracts'
import { MOCK_DATA_CONFIG } from '@/lib/services/config'

// Mock data factories
export class MockFactory {
  private static idCounter = 1

  static generateId(): string {
    return `mock_${this.idCounter++}`
  }

  static createUser(overrides: Partial<User> = {}): User {
    const roles = Object.values(UserRole)
    const randomRole = roles[Math.floor(Math.random() * roles.length)]
    
    return {
      id: this.generateId(),
      email: `user${this.idCounter}@example.com`,
      role: randomRole,
      isActive: true,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createProfile(userId: string, overrides: Partial<Profile> = {}): Profile {
    const names = ['Priya Sharma', 'Rajesh Kumar', 'Anita Patel', 'Vikram Singh', 'Sunita Devi', 'Amit Kumar', 'Kavita Joshi', 'Ravi Verma']
    const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad']
    const craftTypes = ['Pottery', 'Textiles', 'Woodwork', 'Metalwork', 'Jewelry', 'Painting', 'Sculpture', 'Weaving']
    const materials = ['Clay', 'Cotton', 'Wood', 'Metal', 'Stone', 'Glass', 'Leather', 'Bamboo']
    const techniques = ['Hand-thrown', 'Hand-woven', 'Hand-carved', 'Hand-forged', 'Hand-painted', 'Hand-stitched', 'Hand-molded', 'Hand-embroidered']
    const certifications = ['GI Tag', 'Handmade', 'Organic', 'Fair Trade', 'Eco-friendly', 'Traditional', 'Heritage', 'Authentic']

    return {
      id: this.generateId(),
      userId,
      displayName: names[Math.floor(Math.random() * names.length)],
      bio: 'Passionate artisan with years of experience in traditional crafts',
      location: locations[Math.floor(Math.random() * locations.length)],
      languages: ['Hindi', 'English'],
      craftTypes: this.randomSubset(craftTypes, 2),
      materials: this.randomSubset(materials, 3),
      techniques: this.randomSubset(techniques, 2),
      experience: `${Math.floor(Math.random() * 20) + 1}+ years`,
      isPublic: Math.random() > 0.2,
      isVerified: Math.random() > 0.4,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createMediaAsset(ownerId: string, type: MediaType, overrides: Partial<MediaAsset> = {}): MediaAsset {
    const filenames = {
      [MediaType.IMAGE]: ['pottery1.jpg', 'textile2.jpg', 'woodwork3.jpg', 'jewelry4.jpg'],
      [MediaType.VIDEO]: ['craft_demo.mp4', 'technique_tutorial.mp4', 'workshop_process.mp4'],
      [MediaType.PDF]: ['catalog.pdf', 'technique_guide.pdf', 'materials_list.pdf']
    }

    return {
      id: this.generateId(),
      ownerId,
      type,
      filename: filenames[type][Math.floor(Math.random() * filenames[type].length)],
      url: `/mock-assets/${type}/${filenames[type][Math.floor(Math.random() * filenames[type].length)]}`,
      size: Math.floor(Math.random() * 5 * 1024 * 1024) + 1024 * 1024, // 1-6MB
      metadata: { width: 1920, height: 1080 },
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      ...overrides
    }
  }

  static createCatalogItem(profileId: string, overrides: Partial<CatalogItem> = {}): CatalogItem {
    const titles = ['Traditional Pottery Set', 'Handwoven Textile Collection', 'Wooden Sculpture', 'Metal Jewelry Set', 'Painted Ceramic Bowl', 'Embroidered Shawl']
    const categories = ['Pottery', 'Textiles', 'Woodwork', 'Metalwork', 'Ceramics', 'Fabric Arts']
    const subcategories = ['Traditional', 'Modern', 'Contemporary', 'Vintage', 'Custom', 'Limited Edition']
    const tags = ['traditional', 'handmade', 'authentic', 'heritage', 'craft', 'artisan', 'indian', 'cultural']

    return {
      id: this.generateId(),
      profileId,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Beautiful handcrafted item made with traditional techniques and authentic materials.',
      images: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        '/mock-assets/' + Math.random().toString(36).substring(7) + '.jpg'
      ),
      category: categories[Math.floor(Math.random() * categories.length)],
      subcategory: subcategories[Math.floor(Math.random() * subcategories.length)],
      price: Math.floor(Math.random() * 5000) + 100,
      currency: 'INR',
      tags: this.randomSubset(tags, 3),
      isAvailable: Math.random() > 0.2,
      createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createPost(authorId: string, overrides: Partial<Post> = {}): Post {
    const contents = [
      'Just finished this beautiful pottery piece using traditional techniques passed down through generations.',
      'Excited to share my latest textile creation - handwoven with natural dyes.',
      'Working on a new wood carving project. The grain of this wood is absolutely stunning.',
      'Attended an amazing craft workshop today. Learned so many new techniques!',
      'My latest jewelry collection is inspired by traditional Indian designs with a modern twist.'
    ]

    return {
      id: this.generateId(),
      authorId,
      type: PostType.TEXT,
      content: contents[Math.floor(Math.random() * contents.length)],
      mediaUrls: Math.random() > 0.5 ? ['/mock-assets/' + Math.random().toString(36).substring(7) + '.jpg'] : [],
      tags: this.randomSubset(['traditional', 'handmade', 'craft', 'artisan'], 2),
      isPublic: true,
      likesCount: Math.floor(Math.random() * 50),
      commentsCount: Math.floor(Math.random() * 20),
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createConnection(requesterId: string, targetId: string, overrides: Partial<Connection> = {}): Connection {
    const statuses = Object.values(ConnectionStatus)
    
    return {
      id: this.generateId(),
      requesterId,
      targetId,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createMessage(threadId: string, senderId: string, overrides: Partial<Message> = {}): Message {
    const contents = [
      'Hello! I saw your beautiful pottery work and would love to connect.',
      'Thank you for accepting my connection request. Your craftsmanship is amazing!',
      'I\'m interested in learning more about your techniques. Do you offer workshops?',
      'Your latest collection is stunning. Do you have any pieces available for purchase?',
      'I\'d love to collaborate on a project. Are you open to partnerships?'
    ]

    return {
      id: this.generateId(),
      threadId,
      senderId,
      content: contents[Math.floor(Math.random() * contents.length)],
      type: Math.random() > 0.8 ? 'image' : Math.random() > 0.9 ? 'file' : 'text',
      metadata: Math.random() > 0.5 ? { timestamp: Date.now() } : undefined,
      createdAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000),
      readAt: Math.random() > 0.3 ? new Date() : undefined,
      ...overrides
    }
  }

  static createResource(overrides: Partial<Resource> = {}): Resource {
    const titles = ['Pottery Techniques Guide', 'Textile Dyeing Methods', 'Wood Carving Basics', 'Jewelry Making Tutorial', 'Traditional Weaving Patterns']
    const categories = ['Tutorial', 'Guide', 'Template', 'Pattern', 'Technique']
    const tags = ['tutorial', 'guide', 'technique', 'traditional', 'craft', 'learning']

    return {
      id: this.generateId(),
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Comprehensive guide covering traditional techniques and modern applications.',
      fileUrl: `/resources/${titles[Math.floor(Math.random() * titles.length)].toLowerCase().replace(/\s+/g, '_')}.pdf`,
      fileType: 'pdf',
      fileSize: Math.floor(Math.random() * 5 * 1024 * 1024) + 1024 * 1024,
      downloadCount: Math.floor(Math.random() * 100),
      isApproved: Math.random() > 0.3,
      tags: this.randomSubset(tags, 3),
      category: categories[Math.floor(Math.random() * categories.length)],
      submittedBy: 'mock_user',
      isPublic: Math.random() > 0.2,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createService(providerId: string, overrides: Partial<Service> = {}): Service {
    const titles = ['Design Consultation', 'Craft Training', 'Market Access Support', 'Quality Certification', 'Business Development']
    const categories = ['Consultation', 'Training', 'Support', 'Certification', 'Development']
    const tags = ['consultation', 'training', 'support', 'development', 'certification']

    return {
      id: this.generateId(),
      providerId,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Professional services to help artisans grow their business and improve their craft.',
      category: categories[Math.floor(Math.random() * categories.length)],
      subcategory: 'Professional',
      isPublic: Math.random() > 0.2,
      tags: this.randomSubset(tags, 3),
      price: Math.floor(Math.random() * 50000) + 5000,
      currency: 'INR',
      duration: ['1 hour', '2 hours', 'Half day', 'Full day'][Math.floor(Math.random() * 4)],
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Online'][Math.floor(Math.random() * 5)],
      isRemote: Math.random() > 0.5,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createEvent(overrides: Partial<Event> = {}): Event {
    const titles = ['Craft Exhibition', 'Artisan Workshop', 'Traditional Craft Fair', 'Design Conference', 'Heritage Festival']
    const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad']
    const startDate = new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000)
    const endDate = new Date(startDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000)

    return {
      id: this.generateId(),
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Join us for an amazing showcase of traditional crafts and contemporary design.',
      type: 'workshop',
      location: locations[Math.floor(Math.random() * locations.length)],
      startDate,
      endDate,
      isOnline: Math.random() > 0.7,
      organizerId: 'mock_organizer',
      tags: this.randomSubset(['workshop', 'exhibition', 'conference', 'fair', 'festival'], 2),
      maxAttendees: Math.floor(Math.random() * 200) + 50,
      isPublic: Math.random() > 0.2,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createFAQ(overrides: Partial<FAQ> = {}): FAQ {
    const questions = [
      'How do I create a profile?',
      'What is the verification process?',
      'How can I connect with other artisans?',
      'What resources are available?',
      'How do I submit my services?'
    ]
    const answers = [
      'Creating a profile is simple. Click on "Sign Up" and follow the registration process.',
      'Verification involves submitting documentation and having your work reviewed by our team.',
      'Use the search and filter features to find artisans, then send connection requests.',
      'Browse our resource library for tutorials, guides, and templates.',
      'Go to the Services section and click "Submit Service" to add your offerings.'
    ]
    const categories = ['General', 'Profile', 'Connections', 'Resources', 'Services']

    const index = Math.floor(Math.random() * questions.length)
    return {
      id: this.generateId(),
      question: questions[index],
      answer: answers[index],
      category: categories[index],
      order: typeof overrides.order === 'number' ? overrides.order : index + 1,
      isActive: true,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createTicket(userId: string, overrides: Partial<Ticket> = {}): Ticket {
    const subjects = [
      'Profile verification issue',
      'Connection request problem',
      'Resource download error',
      'Service submission question',
      'Account access issue'
    ]
    const descriptions = [
      'I\'m having trouble with my profile verification. Can you help?',
      'My connection requests are not being sent properly.',
      'I cannot download resources from the library.',
      'I need help submitting my services to the directory.',
      'I\'m unable to access my account dashboard.'
    ]
    const statuses = Object.values(TicketStatus)
    const priorities = Object.values(TicketPriority)

    const index = Math.floor(Math.random() * subjects.length)
    return {
      id: this.generateId(),
      submittedBy: userId,
      subject: subjects[index],
      description: descriptions[index],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      category: '',
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createDropdownOption(overrides: Partial<DropdownOption> = {}): DropdownOption {
    const categories = ['craft_type', 'material', 'technique', 'region', 'certification']
    const values = {
      craft_type: ['Pottery', 'Textiles', 'Woodwork', 'Metalwork', 'Jewelry', 'Painting', 'Sculpture', 'Weaving'],
      material: ['Clay', 'Cotton', 'Wood', 'Metal', 'Stone', 'Glass', 'Leather', 'Bamboo'],
      technique: ['Hand-thrown', 'Hand-woven', 'Hand-carved', 'Hand-forged', 'Hand-painted', 'Hand-stitched', 'Hand-molded', 'Hand-embroidered'],
      region: ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'],
      certification: ['GI Tag', 'Handmade', 'Organic', 'Fair Trade', 'Eco-friendly', 'Traditional', 'Heritage', 'Authentic']
    }

    const category = categories[Math.floor(Math.random() * categories.length)]
    const categoryValues = values[category as keyof typeof values]
    const value = categoryValues[Math.floor(Math.random() * categoryValues.length)]

    return {
      id: this.generateId(),
      key: value.toLowerCase().replace(/\s+/g, '_'),
      value,
      category,
      label: typeof overrides.label === 'string' ? overrides.label : value,
      order: typeof overrides.order === 'number' ? overrides.order : 1,
      isActive: true,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      ...overrides
    }
  }

  static createAnalyticsEvent(eventType: string, userId?: string, overrides: Partial<AnalyticsEvent> = {}): AnalyticsEvent {
    return {
      id: this.generateId(),
      eventType,
      userId,
      metadata: { timestamp: Date.now(), source: 'web' },
      createdAt: new Date(),
      ...overrides
    }
  }

  // Helper method to get random subset of array
  private static randomSubset<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
}
