"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Globe, Search, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/routes.config";
import { Input } from "@/components/ui/input";
import LoginModal from "@/components/LoginModal";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
  <Link href="/" className="text-sm font-semibold tracking-tight text-[color:var(--brand)]">Artisan</Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
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
              );
            })}
          </ul>
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Eng</span>
          </div>
          <form action="/search" className="hidden sm:flex items-center gap-2 rounded-full border px-2 py-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input name="q" aria-label="Search" placeholder="Enter your search query here" className="h-8 w-64 border-0 focus-visible:ring-0" />
            <Button type="submit" size="sm" className="rounded-full h-8 px-4" withArrow={false}>Search</Button>
          </form>
          <LoginModal>
            <button className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors border-muted-foreground/30 bg-background hover:border-red-500 hover:text-red-500" aria-label="Login">
              <User className="h-4 w-4" />
            </button>
          </LoginModal>
        </div>
        <div className="lg:hidden ml-auto flex items-center gap-2">
          <LoginModal>
            <button className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors border-muted-foreground/30 bg-background hover:border-red-500 hover:text-red-500" aria-label="Login">
              <User className="h-4 w-4" />
            </button>
          </LoginModal>
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
                      <Link href={item.href} className="block py-1">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;

