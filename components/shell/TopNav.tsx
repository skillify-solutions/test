"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Globe, User, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navItems } from '@/lib/routes.config'
import LoginModal from '@/components/LoginModal'

export function TopNav() {
  const pathname = usePathname()
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState(null)
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsLoggedIn(parsedUser.isLoggedIn)
      }
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = '/'
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/20 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent hover:from-amber-700 hover:to-orange-700 transition-all duration-200">
          Artisan
        </Link>
        
        {/* Dashboard Navigation - Simplified */}
        <nav className="hidden lg:block">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200 hover:bg-amber-50 px-3 py-2 rounded-lg">
              Dashboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/" className="text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200 hover:bg-amber-50 px-3 py-2 rounded-lg">
              Back to Site
            </Link>
          </div>
        </nav>
        
        {/* Right side actions */}
        <div className="ml-auto hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
            <Globe className="h-4 w-4" />
            <span>Eng</span>
          </div>
          <form action="/search" className="hidden sm:flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200">
            <Search className="h-4 w-4 text-gray-400" />
            <Input name="q" aria-label="Search" placeholder="Search artisans, crafts..." className="h-8 w-64 border-0 focus-visible:ring-0 bg-transparent" />
            <Button type="submit" size="sm" className="rounded-full h-8 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" withArrow={false}>Search</Button>
          </form>
          
          {/* User Actions */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user?.name?.charAt(0)}</span>
                </div>
                <span className="text-sm text-amber-700 font-medium">Welcome, {user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <LoginModal>
              <button className="w-12 h-12 rounded-full border-2 border-amber-200 flex items-center justify-center transition-all duration-200 bg-white hover:border-amber-400 hover:bg-amber-50 hover:scale-105 shadow-sm hover:shadow-md" aria-label="Login">
                <User className="h-5 w-5 text-amber-600" />
              </button>
            </LoginModal>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div className="lg:hidden ml-auto flex items-center gap-3">
          {isLoggedIn ? (
            <Button variant="outline" size="icon" onClick={handleLogout} className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200">
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <LoginModal>
              <button className="w-10 h-10 rounded-full border-2 border-amber-200 flex items-center justify-center transition-all duration-200 bg-white hover:border-amber-400 hover:bg-amber-50 hover:scale-105 shadow-sm" aria-label="Login">
                <User className="h-4 w-4 text-amber-600" />
              </button>
            </LoginModal>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu" className="hover:bg-amber-50 hover:border-amber-300 transition-all duration-200">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-8">
                <div className="space-y-4">
                  <Link href="/dashboard" className="block py-2 text-base font-medium">
                    Dashboard
                  </Link>
                  <Link href="/" className="block py-2 text-base text-muted-foreground">
                    Back to Site
                  </Link>
                </div>
                <div className="mt-8 space-y-4">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <LoginModal>
                      <Button className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </LoginModal>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
