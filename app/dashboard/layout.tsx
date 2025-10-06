import { AppShell } from '@/components/shell/AppShell'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell showSidebar={true}>
      {children}
    </AppShell>
  )
}
