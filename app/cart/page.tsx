"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { calculateShipping, calculateTax } from "@/lib/pricing"
import { useLocalizedProductById } from "@/hooks/use-localized-product"

function CartItemRow({
  item,
  formatPrice,
  updateQuantity,
  removeItem,
}: {
  item: { id: string; name: string; price: number; image: string; size: string; color: string; quantity: number }
  formatPrice: (n: number) => string
  updateQuantity: (id: string, size: string, color: string, qty: number) => void
  removeItem: (id: string, size: string, color: string) => void
}) {
  const localized = useLocalizedProductById(item.id)
  const displayName = localized?.name ?? item.name

  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card p-3 sm:gap-4 sm:p-4">
      <Link href={`/products/${item.id}`} className="shrink-0">
        <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted sm:h-24 sm:w-24">
          <Image src={item.image || "/placeholder.svg"} alt={displayName} fill className="object-cover" />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/products/${item.id}`} className="line-clamp-2 font-medium hover:underline">
              {displayName}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.color} / {item.size}
            </p>
          </div>
          <p className="shrink-0 font-bold">{formatPrice(item.price * item.quantity)}</p>
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
  )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">{t("cart.empty")}</h1>
          <p className="mt-2 text-muted-foreground">{t("profile.addItemsHint")}</p>
          <Button asChild className="mt-6">
            <Link href="/products">{t("cart.continueShopping")}</Link>
          </Button>
        </main>
        <BottomNav />
      </div>
    )
  }

  const shipping = calculateShipping(total)
  const tax = calculateTax(total)
  const grandTotal = total + shipping + tax

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t("cart.title")} ({items.length})
          </h1>
          <Button variant="ghost" size="sm" onClick={clearCart} className="self-start sm:self-auto">
            {t("profile.clearCart")}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={`${item.id}-${item.size}-${item.color}`}
                  item={item}
                  formatPrice={formatPrice}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-4 sm:p-6">
              <h2 className="text-lg font-bold">{t("checkout.orderSummary")}</h2>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.shipping")}</span>
                  <span>{shipping === 0 ? t("common.free") : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.tax")}</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-bold">
                    <span>{t("cart.total")}</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/checkout">{t("profile.proceedCheckout")}</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full bg-transparent">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("cart.continueShopping")}
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
