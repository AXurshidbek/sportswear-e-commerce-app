"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useStore } from "@/contexts/store-context"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, CheckCircle, Package, Store } from "lucide-react"

export default function StoresPage() {
  const { stores } = useStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStores = stores.filter(
    (store) =>
      store.isActive &&
      (store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">All Stores</h1>
          <p className="text-muted-foreground">Discover verified sellers and their products</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store) => (
            <Link
              key={store.id}
              href={`/stores/${store.id}`}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                  {store.logo ? (
                    <img
                      src={store.logo || "/placeholder.svg"}
                      alt={store.name}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <Store className="h-7 w-7 text-muted-foreground" />
                  )}
                </div>
                {store.isVerified && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-accent">{store.name}</h3>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{store.description}</p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{store.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{store.totalSales.toLocaleString()} sales</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {store.categories.slice(0, 3).map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs capitalize">
                    {cat}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="py-12 text-center">
            <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No stores found</h3>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
