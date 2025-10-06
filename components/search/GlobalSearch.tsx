"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }
  
  return (
    <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2 rounded-full border px-2 py-1">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artisans, services, resources..."
        className="h-8 w-64 border-0 focus-visible:ring-0"
        aria-label="Global search"
      />
      <Button type="submit" size="sm" className="rounded-full h-8 px-4">
        Search
      </Button>
    </form>
  )
}
