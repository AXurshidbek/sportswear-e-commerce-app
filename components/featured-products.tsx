"use client"

import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturedProducts() {
  const { t } = useLanguage()
  const featured = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4)

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{t("products.bestsellers")}</h2>
          <Link
            href="/products?tag=bestseller"
            className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("products.viewAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
