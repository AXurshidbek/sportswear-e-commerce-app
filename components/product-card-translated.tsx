'use client'

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCardTranslated({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()

  const inWishlist = isInWishlist(product.id)
  const priceInUZS = product.price * 12500 // Convert to base currency

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-lg text-sm font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-accent">
            {formatPrice(priceInUZS)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice * 12500)}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t('products.addToCart')}
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
            className={inWishlist ? 'bg-accent text-accent-foreground' : ''}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-3 block text-center text-sm text-accent hover:underline font-medium"
        >
          {t('products.viewDetails')}
        </Link>
      </div>
    </div>
  )
}
