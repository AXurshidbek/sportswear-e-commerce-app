"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/data"

export interface Store {
  id: string
  name: string
  description: string
  logo?: string
  banner?: string
  ownerId: string
  ownerName: string
  rating: number
  totalSales: number
  createdAt: string
  isVerified: boolean
  isActive: boolean
  categories: string[]
  contactEmail: string
  contactPhone?: string
  address?: string
}

export interface StoreProduct extends Product {
  storeId: string
  storeName: string
  discount?: number
  discountType?: "percentage" | "fixed"
  discountEndDate?: string
}

interface StoreContextType {
  stores: Store[]
  storeProducts: StoreProduct[]
  addStore: (store: Omit<Store, "id" | "createdAt" | "rating" | "totalSales" | "isVerified">) => Store
  updateStore: (id: string, updates: Partial<Store>) => void
  getStoreById: (id: string) => Store | undefined
  getStoreProducts: (storeId: string) => StoreProduct[]
  addProduct: (product: Omit<StoreProduct, "id">) => StoreProduct
  updateProduct: (id: string, updates: Partial<StoreProduct>) => void
  deleteProduct: (id: string) => void
  getAllProducts: () => StoreProduct[]
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const defaultStores: Store[] = [
  {
    id: "store-1",
    name: "SPORTX Official",
    description: "Official SPORTX store with premium athletic wear",
    ownerId: "vendor-1",
    ownerName: "SPORTX Inc",
    rating: 4.8,
    totalSales: 15420,
    createdAt: "2024-01-15",
    isVerified: true,
    isActive: true,
    categories: ["men", "women", "kids", "Aksesuarlar"],
    contactEmail: "store@sportx.com",
  },
  {
    id: "store-2",
    name: "FitGear Pro",
    description: "Professional fitness equipment and apparel",
    ownerId: "vendor-2",
    ownerName: "FitGear LLC",
    rating: 4.5,
    totalSales: 8340,
    createdAt: "2024-03-20",
    isVerified: true,
    isActive: true,
    categories: ["men", "women", "Aksesuarlar"],
    contactEmail: "info@fitgearpro.com",
  },
]

export function StoreProvider({ children }: { children: ReactNode }) {
  const [stores, setStores] = useState<Store[]>(defaultStores)
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([])

  useEffect(() => {
    const storedStores = localStorage.getItem("stores")
    const storedProducts = localStorage.getItem("storeProducts")
    if (storedStores) {
      setStores(JSON.parse(storedStores))
    }
    if (storedProducts) {
      setStoreProducts(JSON.parse(storedProducts))
    } else {
      // Initialize with default products from data.ts mapped to stores
      const initialProducts: StoreProduct[] = [
        {
          id: "sp-1",
          name: "Pro Running Shoes X1",
          price: 129.99,
          originalPrice: 159.99,
          image: "/black-running-shoes-athletic.jpg",
          images: ["/black-running-shoes-side-view.jpg"],
          category: "men",
          subcategory: "shoes",
          brand: "SPORTX",
          sizes: ["7", "8", "9", "10", "11", "12"],
          colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "White", hex: "#ffffff" },
          ],
          rating: 4.8,
          reviews: 234,
          description: "Experience unmatched performance with our Pro Running Shoes X1.",
          features: ["Lightweight mesh upper", "Responsive cushioning", "Durable rubber outsole"],
          inStock: true,
          tags: ["running", "performance", "bestseller"],
          storeId: "store-1",
          storeName: "SPORTX Official",
          discount: 20,
          discountType: "percentage",
        },
        {
          id: "sp-2",
          name: "Elite Training Tee",
          price: 45.0,
          image: "/black-athletic-training-tshirt.jpg",
          images: ["/black-training-tee-front.jpg"],
          category: "men",
          subcategory: "tops",
          brand: "SPORTX",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Navy", hex: "#1e3a5f" },
          ],
          rating: 4.6,
          reviews: 156,
          description: "Stay cool and comfortable during intense workouts.",
          features: ["Moisture-wicking fabric", "Four-way stretch", "Anti-odor technology"],
          inStock: true,
          tags: ["training", "gym", "essential"],
          storeId: "store-1",
          storeName: "SPORTX Official",
        },
        {
          id: "sp-3",
          name: "Women's Flex Leggings",
          price: 68.0,
          originalPrice: 85.0,
          image: "/black-womens-athletic-leggings.jpg",
          images: ["/womens-leggings-front.jpg"],
          category: "women",
          subcategory: "bottoms",
          brand: "SPORTX",
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Purple", hex: "#7c3aed" },
          ],
          rating: 4.9,
          reviews: 412,
          description: "High-performance leggings with superior stretch and support.",
          features: ["High-waisted design", "Hidden pocket", "Squat-proof"],
          inStock: true,
          tags: ["yoga", "gym", "bestseller"],
          storeId: "store-1",
          storeName: "SPORTX Official",
          discount: 15,
          discountType: "percentage",
        },
        {
          id: "sp-4",
          name: "Power Grip Gloves",
          price: 35.0,
          image: "/fitness-gym-gloves-black.jpg",
          images: ["/gym-gloves-detail.jpg"],
          category: "Aksesuarlar",
          subcategory: "gloves",
          brand: "FitGear",
          sizes: ["S", "M", "L", "XL"],
          colors: [{ name: "Black", hex: "#1a1a1a" }],
          rating: 4.4,
          reviews: 89,
          description: "Premium gym gloves with enhanced grip technology.",
          features: ["Padded palms", "Breathable mesh", "Wrist support"],
          inStock: true,
          tags: ["gym", "training", "Aksesuarlar"],
          storeId: "store-2",
          storeName: "FitGear Pro",
        },
        {
          id: "sp-5",
          name: "Women's Sports Bra Pro",
          price: 48.0,
          image: "/womens-black-sports-bra-athletic.jpg",
          images: ["/sports-bra-front-view.jpg"],
          category: "women",
          subcategory: "tops",
          brand: "SPORTX",
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "White", hex: "#ffffff" },
          ],
          rating: 4.8,
          reviews: 278,
          description: "Maximum support sports bra for high-impact activities.",
          features: ["High support", "Adjustable straps", "Moisture-wicking"],
          inStock: true,
          tags: ["sports bra", "running", "gym"],
          storeId: "store-1",
          storeName: "SPORTX Official",
        },
        {
          id: "sp-6",
          name: "CrossFit Training Shorts",
          price: 55.0,
          image: "/mens-athletic-training-shorts-black.jpg",
          images: ["/training-shorts-front.jpg"],
          category: "men",
          subcategory: "bottoms",
          brand: "FitGear",
          sizes: ["S", "M", "L", "XL"],
          colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Gray", hex: "#6b7280" },
          ],
          rating: 4.7,
          reviews: 89,
          description: "Built for intense CrossFit workouts with maximum mobility.",
          features: ["Quick-dry fabric", "Built-in liner", "Deep pockets"],
          inStock: true,
          tags: ["crossfit", "training", "performance"],
          storeId: "store-2",
          storeName: "FitGear Pro",
          discount: 10,
          discountType: "fixed",
        },
      ]
      setStoreProducts(initialProducts)
      localStorage.setItem("storeProducts", JSON.stringify(initialProducts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores))
  }, [stores])

  useEffect(() => {
    localStorage.setItem("storeProducts", JSON.stringify(storeProducts))
  }, [storeProducts])

  const addStore = (store: Omit<Store, "id" | "createdAt" | "rating" | "totalSales" | "isVerified">): Store => {
    const newStore: Store = {
      ...store,
      id: `store-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      rating: 0,
      totalSales: 0,
      isVerified: false,
    }
    setStores((prev) => [...prev, newStore])
    return newStore
  }

  const updateStore = (id: string, updates: Partial<Store>) => {
    setStores((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const getStoreById = (id: string) => stores.find((s) => s.id === id)

  const getStoreProducts = (storeId: string) => storeProducts.filter((p) => p.storeId === storeId)

  const addProduct = (product: Omit<StoreProduct, "id">): StoreProduct => {
    const newProduct: StoreProduct = {
      ...product,
      id: `sp-${Date.now()}`,
    }
    setStoreProducts((prev) => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (id: string, updates: Partial<StoreProduct>) => {
    setStoreProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProduct = (id: string) => {
    setStoreProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const getAllProducts = () =>
    storeProducts.filter((p) => {
      const store = stores.find((s) => s.id === p.storeId)
      return store?.isActive
    })

  return (
    <StoreContext.Provider
      value={{
        stores,
        storeProducts,
        addStore,
        updateStore,
        getStoreById,
        getStoreProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error("useStore must be used within StoreProvider")
  return context
}
