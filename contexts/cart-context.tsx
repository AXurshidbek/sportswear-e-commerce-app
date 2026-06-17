"use client"

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CART_KEY = "cart"
const EMPTY_CART: CartItem[] = []

type Listener = () => void
let listeners: Listener[] = []

let snapshotCache: CartItem[] = EMPTY_CART
let snapshotRaw: string | null = "__init__"

function subscribe(listener: Listener) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function notify() {
  listeners.forEach((listener) => listener())
}

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART

  const raw = localStorage.getItem(CART_KEY)
  if (raw === snapshotRaw) return snapshotCache

  snapshotRaw = raw
  if (!raw) {
    snapshotCache = EMPTY_CART
    return snapshotCache
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[]
    snapshotCache = Array.isArray(parsed) ? parsed : EMPTY_CART
  } catch {
    snapshotCache = EMPTY_CART
  }

  return snapshotCache
}

function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART
}

function writeCartToStorage(items: CartItem[]) {
  const raw = JSON.stringify(items)
  snapshotCache = items.length === 0 ? EMPTY_CART : items
  snapshotRaw = raw
  localStorage.setItem(CART_KEY, raw)
  notify()
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getCartSnapshot, getServerCartSnapshot)

  const addItem = useCallback((item: CartItem) => {
    const prev = getCartSnapshot()
    const existing = prev.find(
      (i) => i.id === item.id && i.size === item.size && i.color === item.color,
    )
    const next = existing
      ? prev.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        )
      : [...prev, item]
    writeCartToStorage(next)
  }, [])

  const removeItem = useCallback((id: string, size: string, color: string) => {
    const next = getCartSnapshot().filter(
      (i) => !(i.id === id && i.size === size && i.color === color),
    )
    writeCartToStorage(next)
  }, [])

  const updateQuantity = useCallback((id: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      const next = getCartSnapshot().filter(
        (i) => !(i.id === id && i.size === size && i.color === color),
      )
      writeCartToStorage(next)
      return
    }
    const next = getCartSnapshot().map((i) =>
      i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i,
    )
    writeCartToStorage(next)
  }, [])

  const clearCart = useCallback(() => writeCartToStorage([]), [])

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
