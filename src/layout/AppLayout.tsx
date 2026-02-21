import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { clearSession, getSession } from '@/lib/storage'

export function AppLayout() {
  const session = getSession()
  const location = useLocation()

  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar session={session} />
      <main className="ml-72 p-8">
        <div className="mb-6 flex justify-end">
          <Button variant="outline" onClick={() => { clearSession(); window.location.href = '/login' }}>Logout</Button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
