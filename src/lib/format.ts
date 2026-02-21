export function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString('en-UG')}`
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-UG', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}
