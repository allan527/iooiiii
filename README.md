# Texas Finance Dashboard

Frontend-only React + TypeScript (Vite) dashboard that stores all data in `localStorage` and simulates SMS behavior with toast + `console.log`.

## Tech Stack

- React + TypeScript + Vite
- React Router (RouterProvider, data mode)
- Tailwind CSS v4
- shadcn-style UI components (Card, Button, Table, Input, Label, Dialog, Select, Tabs)
- lucide-react icons
- Sonner toasts

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- No backend / database / API calls are used.
- Demo finance data is seeded automatically on first load.
- Owner account email is fixed to `william@boss.com`; owner-only cards show only for owner role.
- Staff login hides owner-only KPI cards.
- SMS behavior is simulated only.
