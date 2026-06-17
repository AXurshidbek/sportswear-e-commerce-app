"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { formatPrice } = useCurrency()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add some items to get started</p>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Shopping Cart ({items.length})</h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <Link href={`/products/${item.id}`} className="shrink-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{total > 100 ? "Free" : formatPrice(9.99)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(total * 0.08)}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total + (total > 100 ? 0 : 9.99) + total * 0.08)}</span>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full bg-transparent">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
