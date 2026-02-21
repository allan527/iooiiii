import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate, formatUGX } from '@/lib/format'
import { getData } from '@/lib/storage'

export function ClientsPage() {
  const { clients } = getData()

  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardHeader><CardTitle>Clients</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Loan</TableHead><TableHead>Outstanding</TableHead><TableHead>Date Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.slice(0, 30).map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{formatUGX(client.loanAmount)}</TableCell>
                <TableCell>{formatUGX(client.outstanding)}</TableCell>
                <TableCell>{formatDate(client.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
