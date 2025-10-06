"use client"

import { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { SideNav } from './SideNav'
import { usePathname } from 'next/navigation'

interface AppShellProps {
  children: ReactNode
  showSidebar?: boolean
}

export function AppShell({ children, showSidebar = false }: AppShellProps) {
  const pathname = usePathname()
  
  // Determine if we should show sidebar based on route
  const shouldShowSidebar = showSidebar || pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        {shouldShowSidebar && <SideNav />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
