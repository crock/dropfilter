import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 max-w-6xl py-4">
          <Outlet />
        </div>
      </main>
      { process.env.NODE_ENV === 'development' ? <TanStackRouterDevtools /> : null }
    </div>
  ),
})
