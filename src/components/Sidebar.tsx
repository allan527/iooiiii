import { Banknote, LayoutDashboard, ListChecks, PlusCircle, UserCircle2, Users, UsersRound, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { UserSession } from '@/lib/storage'

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/add-client', label: 'Add Client', icon: PlusCircle },
  { to: '/missed-payments', label: 'Missed Payments', icon: ListChecks },
  { to: '/user-performance', label: 'User Performance', icon: UsersRound },
  { to: '/client-allocation', label: 'Client Allocation', icon: UserCircle2 },
  { to: '/cashbook', label: 'Cashbook', icon: Wallet },
]

export function Sidebar({ session }: { session: UserSession }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-900 p-4 text-slate-100">
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2"><Banknote className="h-5 w-5" /></div>
          <div>
            <p className="text-xs uppercase text-violet-100">Finance Suite</p>
            <h1 className="text-lg font-bold">Texas Finance</h1>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-1">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white',
                isActive && 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
        <p className="text-xs uppercase text-slate-400">Logged in as</p>
        <p className="mt-1 text-sm font-semibold text-white">{session.email}</p>
      </div>
    </aside>
  )
}
