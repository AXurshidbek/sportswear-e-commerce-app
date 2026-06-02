"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useStore } from "@/contexts/store-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle, Package, Mail, Phone, MapPin, Heart, ShoppingBag } from "lucide-react"

export default function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getStoreById, getStoreProducts } = useStore()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  const store = getStoreById(id)
  const products = getStoreProducts(id)

  if (!store) {
    notFound()
  }

  const calculateDiscountedPrice = (price: number, discount?: number, discountType?: "percentage" | "fixed") => {
    if (!discount) return price
    if (discountType === "percentage") {
      return price - (price * discount) / 100
    }
    return price - discount
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Store Header */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
                {store.logo ? (
                  <img
                    src={store.logo || "/placeholder.svg"}
                    alt={store.name}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-muted-foreground">{store.name[0]}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{store.name}</h1>
                  {store.isVerified && <CheckCircle className="h-5 w-5 text-accent" />}
                </div>
                <p className="mt-1 text-muted-foreground">{store.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{store.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>{store.totalSales.toLocaleString()} sales</span>
                  </div>
                  <span className="text-muted-foreground">Member since {store.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {store.contactEmail}
              </div>
              {store.contactPhone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {store.contactPhone}
                </div>
              )}
              {store.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {store.address}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {store.categories.map((cat) => (
              <Badge key={cat} variant="outline" className="capitalize">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Store Products */}
        <h2 className="mb-4 text-xl font-semibold">Products ({products.length})</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const discountedPrice = calculateDiscountedPrice(product.price, product.discount, product.discountType)
            const inWishlist = isInWishlist(product.id)

            return (
              <div key={product.id} className="group relative rounded-xl border border-border bg-card overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.discount && (
                      <Badge className="absolute left-2 top-2 bg-red-500 text-white">
                        {product.discountType === "percentage" ? `-${product.discount}%` : `-$${product.discount}`}
                      </Badge>
                    )}
                  </div>
                </Link>

                <button
                  onClick={() =>
                    inWishlist
                      ? removeFromWishlist(product.id)
                      : addToWishlist({
                          id: product.id,
                          name: product.name,
                          price: discountedPrice,
                          image: product.image,
                        })
                  }
                  className="absolute right-2 top-2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                </button>

                <div className="p-3">
                  <p className="mb-1 text-xs text-muted-foreground">{product.brand}</p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-accent">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold">${discountedPrice.toFixed(2)}</span>
                    {product.discount && (
                      <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full gap-1"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: discountedPrice,
                        image: product.image,
                        size: product.sizes[0],
                        color: product.colors[0].name,
                        quantity: 1,
                      })
                    }
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {products.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No products yet</h3>
            <p className="text-muted-foreground">This store hasn't added any products</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
