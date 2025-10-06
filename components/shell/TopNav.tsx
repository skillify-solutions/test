"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Globe, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LanguageSwitch } from './LanguageSwitch'
import { GlobalSearch } from '@/components/search/GlobalSearch'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Makers', href: '/makers' },
  { label: 'Consultants', href: '/consultants' },
  { label: 'Buyers', href: '/buyers' },
  { label: 'Services', href: '/services' },
  { label: 'Resources', href: '/resources' },
  { label: 'Community', href: '/community' },
  { label: 'Events', href: '/events' },
  { label: 'Help', href: '/help' }
]

export function TopNav() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="text-sm font-semibold tracking-tight text-[color:var(--brand)]">
          Artisan
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      active
                        ? "underline underline-offset-8 decoration-2"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        {/* Right side actions */}
        <div className="ml-auto hidden md:flex items-center gap-3">
          {/* Language Switch */}
          <LanguageSwitch />
          
          {/* Global Search */}
          <GlobalSearch />
          
          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled title="UI-only prototype">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" disabled title="UI-only prototype">
              Sign Up
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="lg:hidden ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" disabled title="UI-only prototype">
            <User className="h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-8">
                <ul className="grid gap-4 text-base">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className={`block py-1 ${
                          pathname === item.href ? 'font-medium' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-4">
                  <Button className="w-full" disabled title="UI-only prototype">
                    Sign In
                  </Button>
                  <Button variant="outline" className="w-full" disabled title="UI-only prototype">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
