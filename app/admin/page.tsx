"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Store,
  Package,
  ShoppingCart,
  DollarSign,
  Menu,
  X,
  Home,
  LogOut,
  Settings,
  Shield,
  CheckCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { stores, storeProducts } = useStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user || user.role !== "admin") {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Calculate platform stats
  const totalStores = stores.length
  const activeStores = stores.filter((s) => s.isActive).length
  const verifiedStores = stores.filter((s) => s.isVerified).length
  const totalProducts = storeProducts.length
  const totalRevenue = storeProducts.reduce((acc, p) => acc + p.price * p.reviews, 0)
  const productsWithDiscount = storeProducts.filter((p) => p.discount).length

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Shield className="h-6 w-6 text-accent" />
            Admin
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <div className="mb-6 rounded-lg bg-accent/10 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Shield className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">Platform Admin</p>
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/stores"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Store className="h-5 w-5" />
              Stores
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Users
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <Link
            href="/"
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold lg:text-xl">Dashboard</h1>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <p className="mt-2 text-3xl font-bold">${totalRevenue.toFixed(0)}</p>
              <p className="mt-1 text-sm text-green-500">+15% from last month</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Stores</span>
                <Store className="h-5 w-5 text-blue-500" />
              </div>
              <p className="mt-2 text-3xl font-bold">{totalStores}</p>
              <p className="mt-1 text-sm text-muted-foreground">{activeStores} active</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Products</span>
                <Package className="h-5 w-5 text-purple-500" />
              </div>
              <p className="mt-2 text-3xl font-bold">{totalProducts}</p>
              <p className="mt-1 text-sm text-muted-foreground">{productsWithDiscount} on sale</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Verified Stores</span>
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-2 text-3xl font-bold">{verifiedStores}</p>
              <p className="mt-1 text-sm text-muted-foreground">{totalStores - verifiedStores} pending</p>
            </div>
          </div>

          {/* Recent Stores */}
          <div className="mb-8 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-semibold">Recent Stores</h2>
              <Link href="/admin/stores">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {stores.slice(0, 5).map((store) => (
                <div key={store.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Store className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{store.name}</p>
                        {store.isVerified && <CheckCircle className="h-4 w-4 text-accent" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{store.ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={store.isActive ? "default" : "secondary"}>
                      {store.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{store.totalSales} sales</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Products */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-semibold">Recent Products</h2>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {storeProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.storeName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.discount && (
                      <Badge className="bg-red-500 text-white">
                        {product.discountType === "percentage" ? `-${product.discount}%` : `-$${product.discount}`}
                      </Badge>
                    )}
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
