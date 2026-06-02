import { Suspense } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSort } from "@/components/product-sort"

export default function ProductsPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">All Products</h1>
          <div className="flex items-center gap-3">
            <Suspense fallback={null}>
              <ProductFilters />
            </Suspense>
            <Suspense fallback={null}>
              <ProductSort />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>
      <BottomNav />
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-card" />
          <div className="mt-3 h-3 w-16 rounded bg-card" />
          <div className="mt-2 h-4 w-full rounded bg-card" />
          <div className="mt-2 h-4 w-20 rounded bg-card" />
        </div>
      ))}
    </div>
  )
}
