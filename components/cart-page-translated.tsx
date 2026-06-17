'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import { Trash2 } from "lucide-react"

export function CartPageTranslated() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t('cart.title')}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t('cart.empty')}
          </p>
          <Button asChild>
            <Link href="/products">{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-[80vh] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          {t('cart.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border border-border rounded-lg bg-card"
                >
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price * 12500)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border border-border rounded hover:bg-secondary"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border border-border rounded hover:bg-secondary"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-red-500 hover:bg-red-50 dark:hover:bg-red-950 p-2 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-4">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {t('checkout.orderSummary')}
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-foreground">
                <span>{t('cart.subtotal')}</span>
                <span>{formatPrice(subtotal * 12500)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>{t('cart.shipping')}</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? t('common.yes') : formatPrice(shipping * 12500)}
                </span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>{t('cart.tax')}</span>
                <span>{formatPrice(tax * 12500)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-foreground">{t('cart.total')}</span>
              <span className="text-2xl font-bold text-accent">
                {formatPrice(total * 12500)}
              </span>
            </div>

            <Button asChild className="w-full mb-4">
              <Link href="/checkout">{t('cart.checkout')}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/products">{t('cart.continueShopping')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
