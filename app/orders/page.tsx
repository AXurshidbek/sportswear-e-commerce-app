import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock orders data
const orders = [
  {
    id: "SPX-12345678",
    date: "2025-01-20",
    status: "delivered",
    total: 189.99,
    items: 3,
  },
  {
    id: "SPX-12345679",
    date: "2025-01-18",
    status: "shipped",
    total: 129.99,
    items: 2,
  },
  {
    id: "SPX-12345680",
    date: "2025-01-15",
    status: "pending",
    total: 75.0,
    items: 1,
  },
]

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500",
  shipped: "bg-blue-500/10 text-blue-500",
  delivered: "bg-green-500/10 text-green-500",
  canceled: "bg-red-500/10 text-red-500",
}

export default function OrdersPage() {
  if (orders.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">No orders yet</h1>
          <p className="mt-2 text-muted-foreground">Start shopping to see your orders here</p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse Products</Link>
          </Button>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()} · {order.items} item{order.items > 1 ? "s" : ""}
                </p>
                <span
                  className={cn(
                    "mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium capitalize",
                    statusColors[order.status as keyof typeof statusColors],
                  )}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold">${order.total.toFixed(2)}</p>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
