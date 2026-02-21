import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layout/AppLayout'
import { AddClientPage } from '@/pages/AddClient'
import { ClientsPage } from '@/pages/Clients'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/Login'
import { PlaceholderPage } from '@/pages/Placeholder'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'add-client', element: <AddClientPage /> },
      { path: 'missed-payments', element: <PlaceholderPage title="Missed Payments" /> },
      { path: 'user-performance', element: <PlaceholderPage title="User Performance" /> },
      { path: 'client-allocation', element: <PlaceholderPage title="Client Allocation" /> },
      { path: 'cashbook', element: <PlaceholderPage title="Cashbook" /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
