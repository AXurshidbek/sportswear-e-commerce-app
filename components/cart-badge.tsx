"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

interface CartBadgeProps {
  className?: string
}

/** Renders cart count only after client mount to avoid SSR hydration mismatch. */
export function CartBadge({ className }: CartBadgeProps) {
  const { itemCount } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || itemCount <= 0) return null

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-accent font-bold text-accent-foreground",
        className,
      )}
    >
      {itemCount > 9 ? "9+" : itemCount}
    </span>
  )
}
