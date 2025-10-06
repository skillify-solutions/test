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
    <aside className="w-64 border-r border-amber-200/20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isAdmin ? 'Manage your platform' : 'Manage your profile'}
          </p>
        </div>
        <nav className="space-y-2">
          {items.map((item, index) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-200"
                    : "text-gray-600 hover:text-amber-700 hover:bg-amber-50 hover:shadow-sm hover:scale-[1.02]"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-200",
                  active ? "text-white" : "text-gray-500 group-hover:text-amber-600"
                )} />
                <span className="transition-all duration-200">{item.title}</span>
                {active && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
