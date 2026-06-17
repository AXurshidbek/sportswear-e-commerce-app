"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useWishlist } from "@/contexts/wishlist-context"
import { useLanguage } from "@/contexts/language-context"
import { products } from "@/lib/data"

export default function WishlistPage() {
  const { items } = useWishlist()
  const { t } = useLanguage()

  const wishlistProducts = products.filter((p) => items.some((item) => item.id === p.id))

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">{t("wishlist.empty")}</h1>
          <p className="mt-2 text-muted-foreground">{t("profile.saveFavorites")}</p>
          <Button asChild className="mt-6">
            <Link href="/products">{t("profile.browseProducts")}</Link>
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
        <h1 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
          {t("wishlist.title")} ({items.length})
        </h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
