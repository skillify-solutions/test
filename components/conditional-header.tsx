"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render SiteHeader for dashboard and admin pages
  // as they have their own navigation (TopNav in AppShell)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    return null;
  }
  
  return <SiteHeader />;
}
