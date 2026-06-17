"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { CartBadge } from "@/components/cart-badge"
import { useLanguage } from "@/contexts/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: "/", icon: Home, label: t("nav.home") },
    { href: "/products", icon: Search, label: t("nav.shop") },
    { href: "/cart", icon: ShoppingBag, label: t("header.cart") },
    { href: "/wishlist", icon: Heart, label: t("header.wishlist") },
    { href: "/profile", icon: User, label: t("header.profile") },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-2 text-[10px] transition-colors sm:text-xs",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.href === "/cart" && (
                  <CartBadge className="absolute -right-2 -top-1 h-4 w-4 text-[10px]" />
                )}
              </div>
              <span className="max-w-full truncate">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
