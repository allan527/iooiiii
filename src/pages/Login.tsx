import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { initData, setSession, type Role } from '@/lib/storage'
import { toast } from 'sonner'

export function LoginPage() {
  const [role, setRole] = useState<Role>('owner')
  const [email, setEmail] = useState('william@boss.com')
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    initData()
    const fixedEmail = role === 'owner' ? 'william@boss.com' : email || 'staff@texasfinance.com'
    setSession({ role, email: fixedEmail })
    toast.success(`Signed in as ${role}`)
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md rounded-2xl border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Texas Finance Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(value: string) => setRole(value as Role)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
            </div>
            <Button type="submit" variant="gradient" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
