"use client"

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { TopNav } from './TopNav'
import { SideNav } from './SideNav'

interface AppShellProps {
  children: ReactNode
  showSidebar?: boolean
}

export function AppShell({ children, showSidebar = false }: AppShellProps) {
  const pathname = usePathname()
  
  // Determine if we should show sidebar based on route
  const shouldShowSidebar = showSidebar || pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  
  return (
    <>
      <TopNav />
      <div className="flex">
        {shouldShowSidebar && <SideNav />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  )
}
