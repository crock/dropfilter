import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '@/components/Header'
import Footer from '../components/Footer'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 max-w-6xl py-4">
          <Outlet />
        </div>
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
})
