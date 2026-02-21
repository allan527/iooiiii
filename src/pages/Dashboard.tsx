import { Activity, BadgeDollarSign, Landmark, TrendingUp, UserPlus, Users } from 'lucide-react'
import { KpiCard } from '@/components/KpiCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatUGX } from '@/lib/format'
import { getData, getSession } from '@/lib/storage'

function BarChart() {
  const values = [35, 55, 42, 68, 40, 52, 61]
  return (
    <div className="mt-6 flex h-44 items-end gap-3">
      {values.map((v, idx) => (
        <div key={idx} className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-600 to-indigo-400" style={{ height: `${v * 1.8}px` }} />
      ))}
    </div>
  )
}

export function DashboardPage() {
  const data = getData()
  const session = getSession()

  const activeClients = data.clients.filter((client) => client.status === 'active')
  const activeLoans = data.clients.filter((client) => client.outstanding > 0)
  const moneyLent = data.clients.reduce((sum, client) => sum + client.loanAmount, 0)
  const outstanding = data.clients.reduce((sum, client) => sum + client.outstanding, 0)
  const netWorth = moneyLent - outstanding + 45000000
  const businessProfit = data.transactions
    .filter((tx) => tx.type === 'payment_received')
    .reduce((sum, tx) => sum + tx.amount, 0) - data.cashbook.filter((c) => c.type === 'out').reduce((s, c) => s + c.amount, 0)

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Dashboard</h2>
        <p className="mt-2 text-slate-500">Welcome back! Here's your business overview.</p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active Clients" value={activeClients.length.toString()} icon={Users} gradient="bg-gradient-to-br from-sky-500 to-blue-700" />
        <KpiCard label="Active Loans" value={activeLoans.length.toString()} icon={Landmark} gradient="bg-gradient-to-br from-emerald-500 to-green-700" />
        <KpiCard label="Money Lent" value={formatUGX(moneyLent)} icon={BadgeDollarSign} gradient="bg-gradient-to-br from-violet-500 to-fuchsia-700" />
        <KpiCard label="Outstanding" value={formatUGX(outstanding)} icon={Activity} gradient="bg-gradient-to-br from-orange-500 to-rose-600" />
      </section>

      {session?.role === 'owner' ? (
        <section className="grid gap-5 lg:grid-cols-2">
          <KpiCard label="NET WORTH (OWNER ONLY)" value={formatUGX(netWorth)} description="Assets minus outstanding liabilities" icon={TrendingUp} gradient="bg-gradient-to-br from-amber-400 to-orange-600" />
          <KpiCard label="BUSINESS PROFIT (OWNER ONLY)" value={formatUGX(businessProfit)} description="Collections after operating expenses" icon={BadgeDollarSign} gradient="bg-gradient-to-br from-emerald-500 to-lime-600" />
        </section>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-2">
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>New Borrowers</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="mt-4 space-y-3">
                {data.clients.slice(0, 4).map((client) => (
                  <div key={client.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-slate-500">{client.phone}</p>
                    </div>
                    <UserPlus className="h-4 w-4 text-violet-600" />
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="week" className="mt-4 text-sm text-slate-500">24 new borrowers joined this week.</TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Loan Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Daily loan performance snapshot.</p>
            <BarChart />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
