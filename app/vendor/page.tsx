"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Store,
  Settings,
  LogOut,
  BarChart3,
  Menu,
  X,
  Home,
  Tag,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function VendorDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { stores, getStoreProducts, deleteProduct, storeProducts } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Redirect if not vendor
  if (!user || user.role !== "vendor") {
    router.push("/login")
    return null
  }

  // Find vendor's store
  const myStore = stores.find((s) => s.ownerId === user.id)
  const myProducts = myStore ? getStoreProducts(myStore.id) : []

  const filteredProducts = myProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate stats
  const totalRevenue = myProducts.reduce((acc, p) => acc + p.price * (p.reviews || 0), 0)
  const totalOrders = myProducts.reduce((acc, p) => acc + (p.reviews || 0), 0)
  const avgRating = myProducts.length > 0 ? myProducts.reduce((acc, p) => acc + p.rating, 0) / myProducts.length : 0

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId)
  }

  const calculateDiscountedPrice = (price: number, discount?: number, discountType?: "percentage" | "fixed") => {
    if (!discount) return price
    if (discountType === "percentage") {
      return price - (price * discount) / 100
    }
    return price - discount
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="text-xl font-bold">
            SPORTX
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-6 rounded-lg bg-muted p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Store className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium">{myStore?.name || "My Store"}</p>
                <p className="text-xs text-muted-foreground">Vendor Account</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/vendor"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/vendor/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/vendor/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/vendor/discounts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Tag className="h-5 w-5" />
              Discounts
            </Link>
            <Link
              href="/vendor/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Store Settings
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <Link
            href="/"
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Back to Store
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
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold lg:text-xl">Dashboard</h1>
          <Link href="/vendor/products/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Product</span>
            </Button>
          </Link>
        </header>

        <div className="p-4 lg:p-6">
          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              <p className="mt-1 text-xs text-green-500">+12% from last month</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Orders</span>
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">{totalOrders}</p>
              <p className="mt-1 text-xs text-blue-500">+8% from last month</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Products</span>
                <Package className="h-5 w-5 text-purple-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">{myProducts.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {myProducts.filter((p) => p.inStock).length} in stock
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Rating</span>
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">{avgRating.toFixed(1)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on {myProducts.reduce((acc, p) => acc + p.reviews, 0)} reviews
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold">My Products</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Discount</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <span className="font-medium line-clamp-1">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="capitalize">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {product.discount ? (
                          <div>
                            <span className="font-medium">
                              $
                              {calculateDiscountedPrice(product.price, product.discount, product.discountType).toFixed(
                                2,
                              )}
                            </span>
                            <span className="ml-1 text-xs text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {product.discount ? (
                          <Badge className="bg-red-500 text-white">
                            {product.discountType === "percentage" ? `-${product.discount}%` : `-$${product.discount}`}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">⭐ {product.rating}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/vendor/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No products found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {myProducts.length === 0 ? "Start by adding your first product" : "Try adjusting your search"}
                </p>
                {myProducts.length === 0 && (
                  <Link href="/vendor/products/new">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
