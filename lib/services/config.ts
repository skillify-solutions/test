

// Feature flags for UI-only prototype
export const FEATURE_FLAGS = {
  ENABLE_ACCESS_GATE: true,
  ENABLE_VOICE_UPLOAD_STUB: true,
  ENABLE_ADMIN: true,
  ENABLE_ANALYTICS_GLANCE: true,
  ENABLE_MESSAGING: true,
  ENABLE_SOCIAL_FEED: true
}

// Mock persistence option
export const MOCK_PERSIST = false // Set to true to persist mocks in localStorage

// Mock API delay simulation
export const MOCK_DELAY = 300 // milliseconds

// Access gate configuration
export const ACCESS_GATE_LIMIT = 15 // Number of profiles before gate triggers

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12
export const MAX_PAGE_SIZE = 100

// File upload limits (UI-only)
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'application/pdf']

// Mock data configuration
export const MOCK_DATA_CONFIG = {
  USERS_COUNT: 50,
  PROFILES_COUNT: 45,
  POSTS_COUNT: 100,
  SERVICES_COUNT: 30,
  RESOURCES_COUNT: 25,
  EVENTS_COUNT: 15,
  TICKETS_COUNT: 20
}
