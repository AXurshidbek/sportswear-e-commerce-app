"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingBag, Heart, User, Menu, X, Clock, TrendingUp, ChevronDown, Store, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartBadge } from "@/components/cart-badge"
import { useSearch } from "@/contexts/search-context"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import LanguageCurrencySelector from "@/components/language-currency-selector"
import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const trendingSearchKeys = ["Running Shoes", "Yoga Pants", "Training Shorts", "Sports Bra"]

export function Header() {
  const router = useRouter()
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useSearch()
  const { user } = useAuth()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const categories = [
    {
      name: t("nav.men"),
      href: "/products?category=men",
      subcategories: [
        { name: t("nav.menShoes"), href: "/products?category=men&subcategory=shoes" },
        { name: t("nav.menTops"), href: "/products?category=men&subcategory=tops" },
        { name: t("nav.menBottoms"), href: "/products?category=men&subcategory=bottoms" },
        { name: t("nav.menJackets"), href: "/products?category=men&subcategory=jackets" },
      ],
    },
    {
      name: t("nav.women"),
      href: "/products?category=women",
      subcategories: [
        { name: t("nav.womenShoes"), href: "/products?category=women&subcategory=shoes" },
        { name: t("nav.womenTops"), href: "/products?category=women&subcategory=tops" },
        { name: t("nav.womenBottoms"), href: "/products?category=women&subcategory=bottoms" },
        { name: t("nav.womenSportsBras"), href: "/products?category=women&subcategory=sports-bras" },
      ],
    },
    {
      name: t("nav.kids"),
      href: "/products?category=kids",
      subcategories: [
        { name: t("nav.kidsShoes"), href: "/products?category=kids&subcategory=shoes" },
        { name: t("nav.kidsClothing"), href: "/products?category=kids&subcategory=clothing" },
      ],
    },
    {
      name: t("nav.accessories"),
      href: "/products?category=accessories",
      subcategories: [
        { name: t("nav.accBags"), href: "/products?category=accessories&subcategory=bags" },
        { name: t("nav.accSocks"), href: "/products?category=accessories&subcategory=socks" },
        { name: t("nav.accGloves"), href: "/products?category=accessories&subcategory=gloves" },
        { name: t("nav.accHats"), href: "/products?category=accessories&subcategory=hats" },
      ],
    },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim())
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchFocused(false)
      setSearchQuery("")
    }
  }

  const handleQuickSearch = (query: string) => {
    addRecentSearch(query)
    router.push(`/products?search=${encodeURIComponent(query)}`)
    setIsSearchFocused(false)
    setSearchQuery("")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="border-b border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-2">
          <div ref={searchRef} className="relative mx-auto max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("header.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="h-10 w-full rounded-full border-border/50 bg-background pl-10 pr-4 text-sm focus:border-accent focus:ring-accent"
              />
            </form>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-card p-4 shadow-xl">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {t("header.recentSearches")}
                      </span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        {t("header.clear")}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.slice(0, 5).map((search) => (
                        <button
                          key={search}
                          onClick={() => handleQuickSearch(search)}
                          className="group flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {search}
                          <X
                            className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeRecentSearch(search)
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <span className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {t("header.trending")}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearchKeys.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleQuickSearch(search)}
                        className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-14 items-center gap-2 px-4 md:h-16 md:gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("header.menu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-background p-0">
            <SheetTitle className="sr-only">{t("header.menu")}</SheetTitle>
            <div className="flex h-14 items-center border-b border-border px-4">
              <span className="text-lg font-bold">{t("nav.categories")}</span>
            </div>
            <nav className="p-4">
              {categories.map((category) => (
                <div key={category.name} className="mb-4">
                  <Link
                    href={category.href}
                    className="mb-2 block text-lg font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {category.name}
                  </Link>
                  <div className="ml-4 space-y-2">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-6 border-t border-border pt-4">
                <Link
                  href="/stores"
                  className="flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-accent"
                >
                  <Store className="h-5 w-5" />
                  {t("header.allStores")}
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight md:text-2xl">
          SPORTX
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 md:flex lg:gap-6">
          {categories.map((category) => (
            <DropdownMenu key={category.name}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
                  {category.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={category.href} className="font-medium">
                    {t("header.all")} {category.name}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {category.subcategories.map((sub) => (
                  <DropdownMenuItem key={sub.href} asChild>
                    <Link href={sub.href}>{sub.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Link
            href="/stores"
            className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            <Store className="h-4 w-4" />
            {t("nav.stores")}
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-2">
          <LanguageCurrencySelector />
          <a
            href="https://drive.google.com/file/d/1LcoKPkqvDYdYIKFP9HjxLn-I0QkFUenI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block"
          >
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Download className="h-4 w-4" />
              <span className="text-xs font-medium">{t("header.downloadApp")}</span>
            </Button>
          </a>

          <Link href="/wishlist" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">{t("header.wishlist")}</span>
            </Button>
          </Link>

          <Link href="/cart" className="hidden md:block">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <CartBadge className="absolute -right-1 -top-1 h-5 w-5 text-xs" />
              <span className="sr-only">{t("header.cart")}</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">{t("header.profile")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("header.myProfile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">{t("header.myOrders")}</Link>
                  </DropdownMenuItem>
                  {user.role === "vendor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/vendor" className="text-accent">
                          {t("header.vendorDashboard")}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="text-accent">
                          {t("header.adminPanel")}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">{t("header.signIn")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">{t("header.createAccount")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/vendor/register" className="text-accent">
                      {t("header.becomeSeller")}
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
