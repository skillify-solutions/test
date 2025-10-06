"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, User, Package, Users, MessageSquare, FileText, 
  Settings, HelpCircle, Calendar, Flag, BarChart3, Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const dashboardItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User
  },
  {
    title: 'Catalogue',
    href: '/dashboard/catalogue',
    icon: Package
  },
  {
    title: 'Connections',
    href: '/dashboard/connections',
    icon: Users
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare
  },
  {
    title: 'Posts',
    href: '/dashboard/posts',
    icon: FileText
  },
  {
    title: 'Services',
    href: '/dashboard/services',
    icon: Settings
  },
  {
    title: 'Resources',
    href: '/dashboard/resources',
    icon: FileText
  },
  {
    title: 'Tickets',
    href: '/dashboard/tickets',
    icon: HelpCircle
  },
  {
    title: 'Events',
    href: '/dashboard/events',
    icon: Calendar
  }
]

const adminItems = [
  {
    title: 'Overview',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: Flag
  },
  {
    title: 'Submissions',
    href: '/admin/submissions',
    icon: FileText
  },
  {
    title: 'Dropdowns',
    href: '/admin/dropdowns',
    icon: Settings
  },
  {
    title: 'Appearance',
    href: '/admin/appearance',
    icon: Settings
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3
  }
]

export function SideNav() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const items = isAdmin ? adminItems : dashboardItems
  
  return (
    <aside className="w-64 border-r bg-background">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
        </h2>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
