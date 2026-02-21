import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addClient } from '@/lib/storage'
import { toast } from 'sonner'

export function AddClientPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', loanAmount: 0, outstanding: 0 })

  const submit = (event: FormEvent) => {
    event.preventDefault()
    addClient({ ...form, status: 'active' })
    toast.success('Client added successfully')
    toast('SMS simulated: Loan notification sent')
    console.log('[SMS SIMULATION] Loan onboarding message sent to', form.phone)
    navigate('/clients')
  }

  return (
    <Card className="max-w-xl rounded-2xl border-none shadow-sm">
      <CardHeader><CardTitle>Add Client</CardTitle></CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={submit}>
          <div className="space-y-1"><Label>Name</Label><Input required value={form.name} onChange={(event) => setForm((s) => ({ ...s, name: event.target.value }))} /></div>
          <div className="space-y-1"><Label>Phone</Label><Input required value={form.phone} onChange={(event) => setForm((s) => ({ ...s, phone: event.target.value }))} /></div>
          <div className="space-y-1"><Label>Loan Amount</Label><Input required type="number" value={form.loanAmount} onChange={(event) => setForm((s) => ({ ...s, loanAmount: Number(event.target.value) }))} /></div>
          <div className="space-y-1"><Label>Outstanding Amount</Label><Input required type="number" value={form.outstanding} onChange={(event) => setForm((s) => ({ ...s, outstanding: Number(event.target.value) }))} /></div>
          <Button type="submit" variant="gradient">Save Client</Button>
        </form>
      </CardContent>
    </Card>
  )
}
