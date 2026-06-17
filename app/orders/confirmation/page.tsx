"use client"

import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function OrderConfirmationPage() {
  const { t } = useLanguage()
  const orderNumber = `SPX-${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-full bg-green-500/10 p-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold md:text-3xl">{t("orders.confirmed")}</h1>
        <p className="mt-2 text-muted-foreground">{t("orders.thankYou")}</p>
        <div className="mt-6 w-full rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{t("orders.orderNumber")}</p>
          <p className="mt-1 text-lg font-bold">{orderNumber}</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{t("orders.emailConfirmation")}</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/orders">
              <Package className="mr-2 h-4 w-4" />
              {t("orders.viewOrders")}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/products">
              {t("cart.continueShopping")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
