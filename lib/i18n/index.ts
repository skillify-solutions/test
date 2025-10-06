// Simple i18n implementation for UI-only prototype
export type Language = 'en' | 'hi'

export interface Dictionary {
  nav: {
    home: string
    explore: string
    makers: string
    consultants: string
    buyers: string
    services: string
    resources: string
    community: string
    events: string
    help: string
  }
  common: {
    search: string
    filter: string
    clear: string
    save: string
    cancel: string
    edit: string
    delete: string
    view: string
    loading: string
    error: string
    success: string
  }
  auth: {
    signIn: string
    signUp: string
    signOut: string
    email: string
    password: string
    confirmPassword: string
  }
  dashboard: {
    overview: string
    profile: string
    catalogue: string
    connections: string
    messages: string
    posts: string
    services: string
    resources: string
    tickets: string
    events: string
  }
  admin: {
    dashboard: string
    content: string
    submissions: string
    dropdowns: string
    appearance: string
    analytics: string
  }
}

export const dictionaries: Record<Language, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      explore: 'Explore',
      makers: 'Makers',
      consultants: 'Consultants',
      buyers: 'Buyers',
      services: 'Services',
      resources: 'Resources',
      community: 'Community',
      events: 'Events',
      help: 'Help'
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password'
    },
    dashboard: {
      overview: 'Overview',
      profile: 'Profile',
      catalogue: 'Catalogue',
      connections: 'Connections',
      messages: 'Messages',
      posts: 'Posts',
      services: 'Services',
      resources: 'Resources',
      tickets: 'Tickets',
      events: 'Events'
    },
    admin: {
      dashboard: 'Dashboard',
      content: 'Content',
      submissions: 'Submissions',
      dropdowns: 'Dropdowns',
      appearance: 'Appearance',
      analytics: 'Analytics'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      explore: 'खोजें',
      makers: 'कारीगर',
      consultants: 'सलाहकार',
      buyers: 'खरीदार',
      services: 'सेवाएं',
      resources: 'संसाधन',
      community: 'समुदाय',
      events: 'कार्यक्रम',
      help: 'सहायता'
    },
    common: {
      search: 'खोजें',
      filter: 'फिल्टर',
      clear: 'साफ़ करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      view: 'देखें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता'
    },
    auth: {
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signOut: 'साइन आउट',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें'
    },
    dashboard: {
      overview: 'अवलोकन',
      profile: 'प्रोफाइल',
      catalogue: 'कैटलॉग',
      connections: 'कनेक्शन',
      messages: 'संदेश',
      posts: 'पोस्ट',
      services: 'सेवाएं',
      resources: 'संसाधन',
      tickets: 'टिकट',
      events: 'कार्यक्रम'
    },
    admin: {
      dashboard: 'डैशबोर्ड',
      content: 'सामग्री',
      submissions: 'प्रस्तुतियां',
      dropdowns: 'ड्रॉपडाउन',
      appearance: 'दिखावट',
      analytics: 'विश्लेषण'
    }
  }
}

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language]
}

export function useTranslation(language: Language = 'en') {
  return getDictionary(language)
}
