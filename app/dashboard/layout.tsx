import { AppShell } from '@/components/shell/AppShell'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppShell showSidebar={true}>
        {children}
      </AppShell>
    </div>
  )
}
