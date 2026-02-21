export type Role = 'owner' | 'staff'

export interface UserSession {
  email: string
  role: Role
}

export interface Client {
  id: string
  name: string
  phone: string
  loanAmount: number
  outstanding: number
  status: 'active' | 'missed'
  createdAt: string
}

export interface Transaction {
  id: string
  type: 'loan_disbursed' | 'payment_received'
  amount: number
  date: string
}

export interface FinanceData {
  clients: Client[]
  transactions: Transaction[]
  cashbook: { id: string; note: string; amount: number; type: 'in' | 'out'; date: string }[]
}

const STORAGE_KEY = 'texas-finance-data'
const SESSION_KEY = 'texas-finance-session'

const seedData: FinanceData = {
  clients: Array.from({ length: 125 }, (_, i) => ({
    id: `c-${i + 1}`,
    name: `Client ${i + 1}`,
    phone: `+256700${(1000 + i).toString().slice(-4)}`,
    loanAmount: 1000000 + (i % 5) * 250000,
    outstanding: 600000 + (i % 7) * 110000,
    status: i % 12 === 0 ? 'missed' : 'active',
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  })),
  transactions: [
    { id: 't1', type: 'loan_disbursed', amount: 184900000, date: new Date().toISOString() },
    { id: 't2', type: 'payment_received', amount: 32750000, date: new Date(Date.now() - 86400000).toISOString() },
  ],
  cashbook: [
    { id: 'cb1', note: 'Office rent', amount: 1800000, type: 'out', date: new Date().toISOString() },
    { id: 'cb2', note: 'Collections', amount: 12500000, type: 'in', date: new Date().toISOString() },
  ],
}

export function initData() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
}

export function getData(): FinanceData {
  initData()
  return JSON.parse(localStorage.getItem(STORAGE_KEY) as string) as FinanceData
}

export function saveData(data: FinanceData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function addClient(client: Omit<Client, 'id' | 'createdAt'>) {
  const data = getData()
  const newClient: Client = { ...client, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  data.clients.unshift(newClient)
  data.transactions.unshift({ id: crypto.randomUUID(), type: 'loan_disbursed', amount: client.loanAmount, date: new Date().toISOString() })
  saveData(data)
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY)
  return raw ? (JSON.parse(raw) as UserSession) : null
}

export function setSession(session: UserSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
