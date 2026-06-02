import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"

export default function OrderConfirmationPage() {
  const orderNumber = `SPX-${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-full bg-green-500/10 p-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold md:text-3xl">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="mt-6 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Order Number</p>
          <p className="mt-1 text-lg font-bold">{orderNumber}</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          You will receive an email confirmation shortly with your order details.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/orders">
              <Package className="mr-2 h-4 w-4" />
              View Orders
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
