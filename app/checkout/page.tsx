"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Truck, Tag, Check, Smartphone } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { calculateShipping, calculateTax, STANDARD_SHIPPING_UZS } from "@/lib/pricing"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymeModal, setShowPaymeModal] = useState(false)
  const [paymeProcessing, setPaymeProcessing] = useState(false)

  const shipping = calculateShipping(total)
  const tax = calculateTax(total)
  const finalTotal = total - discount + shipping + tax

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SPORT20") {
      setDiscount(total * 0.2)
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      setDiscount(STANDARD_SHIPPING_UZS)
    }
  }

  const completeOrder = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    clearCart()
    router.push("/orders/confirmation")
  }

  const handlePlaceOrder = async () => {
    if (paymentMethod === "payme") {
      setShowPaymeModal(true)
      return
    }
    await completeOrder()
  }

  const handlePaymeConfirm = async () => {
    setPaymeProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setPaymeProcessing(false)
    setShowPaymeModal(false)
    await completeOrder()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">{t("checkout.noItems")}</h1>
          <Button asChild className="mt-6">
            <Link href="/products">{t("cart.continueShopping")}</Link>
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
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("checkout.backToCart")}
        </Link>

        <h1 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">{t("checkout.title")}</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 shrink-0" />
                <h2 className="text-lg font-bold">{t("checkout.shippingInfo")}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{t("checkout.firstName")}</Label>
                  <Input id="firstName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">{t("checkout.lastName")}</Label>
                  <Input id="lastName" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">{t("checkout.email")}</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">{t("checkout.address")}</Label>
                  <Input id="address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">{t("checkout.city")}</Label>
                  <Input id="city" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="zip">{t("checkout.zipCode")}</Label>
                  <Input id="zip" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">{t("checkout.phone")}</Label>
                  <Input id="phone" type="tel" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 shrink-0" />
                <h2 className="text-lg font-bold">{t("checkout.paymentMethod")}</h2>
              </div>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                      paymentMethod === "card" ? "border-foreground bg-muted" : "border-border",
                    )}
                  >
                    <RadioGroupItem value="card" />
                    <div className="min-w-0">
                      <p className="font-medium">{t("checkout.card")}</p>
                      <p className="text-sm text-muted-foreground">{t("checkout.cardDesc")}</p>
                    </div>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                      paymentMethod === "payme" ? "border-foreground bg-muted" : "border-border",
                    )}
                  >
                    <RadioGroupItem value="payme" />
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00CCCC] text-sm font-bold text-white">
                        P
                      </div>
                      <div>
                        <p className="font-medium">{t("checkout.payme")}</p>
                        <p className="text-sm text-muted-foreground">{t("checkout.paymeDesc")}</p>
                      </div>
                    </div>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                      paymentMethod === "cod" ? "border-foreground bg-muted" : "border-border",
                    )}
                  >
                    <RadioGroupItem value="cod" />
                    <div className="min-w-0">
                      <p className="font-medium">{t("checkout.cod")}</p>
                      <p className="text-sm text-muted-foreground">{t("checkout.codDesc")}</p>
                    </div>
                  </label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 grid gap-4">
                  <div>
                    <Label htmlFor="cardNumber">{t("checkout.cardNumber")}</Label>
                    <Input id="cardNumber" className="mt-1" placeholder="8600 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">{t("checkout.expiryDate")}</Label>
                      <Input id="expiry" className="mt-1" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">{t("checkout.cvv")}</Label>
                      <Input id="cvv" className="mt-1" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-4 sm:p-6">
              <h2 className="text-lg font-bold">{t("checkout.orderSummary")}</h2>

              <div className="mt-4 max-h-48 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="line-clamp-1 font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        {item.size} x {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t("checkout.promoCode")}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder={t("checkout.enterCode")}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="min-w-0 flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={handleApplyPromo} className="shrink-0">
                    {t("checkout.apply")}
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="mt-2 text-sm text-green-500">
                    {t("checkout.discountApplied")}: -{formatPrice(discount)}
                  </p>
                )}
              </div>

              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>{t("common.discount")}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.shipping")}</span>
                  <span>{shipping === 0 ? t("common.free") : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.tax")}</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 font-bold">
                  <span>{t("cart.total")}</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full gap-2" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? (
                  t("checkout.processing")
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    {t("checkout.placeOrder")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />

      <Dialog open={showPaymeModal} onOpenChange={setShowPaymeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00CCCC] text-sm font-bold text-white">
                P
              </div>
              {t("checkout.paymeDemoTitle")}
            </DialogTitle>
            <DialogDescription>{t("checkout.paymeDemoDesc")}</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
            <Smartphone className="mx-auto h-12 w-12 text-[#00CCCC]" />
            <p className="mt-4 text-sm text-muted-foreground">{t("checkout.paymeDemoAmount")}</p>
            <p className="mt-1 text-3xl font-bold">{formatPrice(finalTotal)}</p>
            {paymeProcessing && (
              <p className="mt-4 text-sm font-medium text-[#00CCCC]">{t("checkout.paymeDemoSuccess")}</p>
            )}
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              className="w-full bg-[#00CCCC] hover:bg-[#00b8b8] text-white"
              onClick={handlePaymeConfirm}
              disabled={paymeProcessing}
            >
              {paymeProcessing ? t("checkout.processing") : t("checkout.paymeDemoConfirm")}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setShowPaymeModal(false)} disabled={paymeProcessing}>
              {t("checkout.paymeDemoCancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
