"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Store,
  Settings,
  LogOut,
  BarChart3,
  Menu,
  X,
  Home,
  Tag,
  ShoppingCart,
  Plus,
  Percent,
  DollarSign,
  Trash2,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VendorDiscountsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { stores, getStoreProducts, updateProduct } = useStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState("")
  const [discountAmount, setDiscountAmount] = useState("")
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")

  if (!user || user.role !== "vendor") {
    router.push("/login")
    return null
  }

  const myStore = stores.find((s) => s.ownerId === user.id)
  const myProducts = myStore ? getStoreProducts(myStore.id) : []
  const productsWithDiscount = myProducts.filter((p) => p.discount)
  const productsWithoutDiscount = myProducts.filter((p) => !p.discount)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleAddDiscount = () => {
    if (!selectedProductId || !discountAmount) return

    updateProduct(selectedProductId, {
      discount: Number.parseFloat(discountAmount),
      discountType,
    })

    setSelectedProductId("")
    setDiscountAmount("")
    setDiscountType("percentage")
    setDialogOpen(false)
  }

  const handleRemoveDiscount = (productId: string) => {
    updateProduct(productId, {
      discount: undefined,
      discountType: undefined,
    })
  }

  const calculateDiscountedPrice = (price: number, discount: number, type: "percentage" | "fixed") => {
    if (type === "percentage") return price - (price * discount) / 100
    return price - discount
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold lg:text-xl">Discounts</h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Discount</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Discount to Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Select Product</Label>
                  <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productsWithoutDiscount.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Discount Type</Label>
                  <Select value={discountType} onValueChange={(v) => setDiscountType(v as "percentage" | "fixed")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Discount Amount</Label>
                  <div className="relative">
                    {discountType === "percentage" ? (
                      <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    ) : (
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    )}
                    <Input
                      type="number"
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(e.target.value)}
                      placeholder="0"
                      className="pl-10"
                      min="0"
                      max={discountType === "percentage" ? "100" : undefined}
                    />
                  </div>
                </div>
                <Button onClick={handleAddDiscount} className="w-full" disabled={!selectedProductId || !discountAmount}>
                  Apply Discount
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="p-4 lg:p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Active Discounts</p>
              </div>
              <p className="mt-2 text-2xl font-bold">{productsWithDiscount.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Products Without Discount</p>
              </div>
              <p className="mt-2 text-2xl font-bold">{productsWithoutDiscount.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-green-500" />
                <p className="text-sm text-muted-foreground">Avg. Discount</p>
              </div>
              <p className="mt-2 text-2xl font-bold">
                {productsWithDiscount.length > 0
                  ? (
                      productsWithDiscount.reduce((acc, p) => acc + (p.discount || 0), 0) / productsWithDiscount.length
                    ).toFixed(0)
                  : 0}
                %
              </p>
            </div>
          </div>

          {/* Products with Discounts */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Products with Discounts</h2>
            {productsWithDiscount.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {productsWithDiscount.map((product) => (
                  <div key={product.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-bold text-green-500">
                            $
                            {calculateDiscountedPrice(product.price, product.discount!, product.discountType!).toFixed(
                              2,
                            )}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <Badge className="mt-2 bg-red-500 text-white">
                          {product.discountType === "percentage" ? `-${product.discount}%` : `-$${product.discount}`}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleRemoveDiscount(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card py-8 text-center">
                <Tag className="mx-auto mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">No active discounts</p>
              </div>
            )}
          </div>

          {/* Products without Discounts */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Products without Discounts</h2>
            {productsWithoutDiscount.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {productsWithoutDiscount.map((product) => (
                  <div key={product.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProductId(product.id)
                          setDialogOpen(true)
                        }}
                      >
                        Add Discount
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card py-8 text-center">
                <Package className="mx-auto mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">All products have discounts</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
