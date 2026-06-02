"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { useMemo } from "react"

export function ProductGrid() {
  const searchParams = useSearchParams()

  const filteredProducts = useMemo(() => {
    let result = [...products]

    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const tag = searchParams.get("tag")
    const sort = searchParams.get("sort")
    const search = searchParams.get("q")

    if (category) {
      result = result.filter((p) => p.category === category)
    }

    if (brand) {
      result = result.filter((p) => p.brand === brand)
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= Number.parseFloat(maxPrice))
    }

    if (tag) {
      result = result.filter((p) => p.tags.includes(tag))
    }

    if (search) {
      const query = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query),
      )
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        break
    }

    return result
  }, [searchParams])

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-foreground">No products found</p>
        <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
