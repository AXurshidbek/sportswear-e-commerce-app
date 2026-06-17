"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCurrency } from "@/contexts/currency-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist()
  const { formatPrice } = useCurrency()
  const inWishlist = isInWishlist(product.id)

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.originalPrice && (
            <span className="absolute left-2 top-2 rounded bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
              SALE
            </span>
          )}
        </div>
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="mt-1 text-sm font-medium text-foreground line-clamp-2">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs text-accent">★</span>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={() =>
          toggleItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
          })
        }
      >
        <Heart
          className={cn("h-4 w-4 transition-colors", inWishlist ? "fill-accent text-accent" : "text-foreground")}
        />
        <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
      </Button>
    </div>
  )
}
