import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string
  description?: string
  icon: LucideIcon
  gradient: string
}

export function KpiCard({ label, value, description, icon: Icon, gradient }: KpiCardProps) {
  return (
    <Card className={cn('relative overflow-hidden rounded-2xl border-none text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg', gradient)}>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20" />
      <div className="relative flex items-start justify-between p-6">
        <div>
          <p className="text-sm font-medium text-white/90">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">{value}</p>
          {description ? <p className="mt-2 text-xs text-white/80">{description}</p> : null}
        </div>
        <div className="rounded-xl bg-white/25 p-3">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}
