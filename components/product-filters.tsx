"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { categories, brands } from "@/lib/data"
import { useState, useCallback } from "react"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 200])
  const [open, setOpen] = useState(false)

  const currentCategory = searchParams.get("category")
  const currentBrand = searchParams.get("brand")

  const activeFiltersCount = [
    currentCategory,
    currentBrand,
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
  ].filter(Boolean).length

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/products?${params.toString()}`)
    },
    [router, searchParams],
  )

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    } else {
      params.delete("minPrice")
    }
    if (priceRange[1] < 200) {
      params.set("maxPrice", priceRange[1].toString())
    } else {
      params.delete("maxPrice")
    }
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products")
    setPriceRange([0, 200])
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto bg-background">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filters
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="mb-3 font-medium text-foreground">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={currentCategory === cat.id}
                    onCheckedChange={(checked) => updateFilter("category", checked ? cat.id : null)}
                  />
                  <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer">
                    {cat.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="mb-3 font-medium text-foreground">Brand</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={currentBrand === brand}
                    onCheckedChange={(checked) => updateFilter("brand", checked ? brand : null)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="mb-3 font-medium text-foreground">Price Range</h3>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={200} step={10} className="mb-4" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={applyPriceFilter}>
              Apply Price
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
