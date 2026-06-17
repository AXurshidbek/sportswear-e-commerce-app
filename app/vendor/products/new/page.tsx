"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, X } from "lucide-react"

const availableCategories = ["men", "women", "kids", "Aksesuarlar"]
const availableSubcategories: Record<string, string[]> = {
  men: ["shoes", "tops", "bottoms", "jackets"],
  women: ["shoes", "tops", "bottoms", "sports-bras", "jackets"],
  kids: ["shoes", "clothing"],
  Aksesuarlar: ["bags", "socks", "gloves", "hats", "equipment"],
}

export default function NewProductPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { stores, addProduct } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const myStore = stores.find((s) => s.ownerId === user?.id)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    brand: myStore?.name || "",
    sizes: [] as string[],
    colors: [] as { name: string; hex: string }[],
    features: [] as string[],
    tags: [] as string[],
    inStock: true,
    discount: "",
    discountType: "percentage" as "percentage" | "fixed",
  })

  const [newSize, setNewSize] = useState("")
  const [newColorName, setNewColorName] = useState("")
  const [newColorHex, setNewColorHex] = useState("#000000")
  const [newFeature, setNewFeature] = useState("")
  const [newTag, setNewTag] = useState("")

  if (!user || user.role !== "vendor") {
    router.push("/login")
    return null
  }

  if (!myStore) {
    router.push("/vendor/register")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.name || !formData.price || !formData.category) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.sizes.length === 0) {
      setError("Please add at least one size")
      setIsLoading(false)
      return
    }

    if (formData.colors.length === 0) {
      setError("Please add at least one color")
      setIsLoading(false)
      return
    }

    try {
      addProduct({
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
        image: "/placeholder.svg?height=400&width=400&query=" + encodeURIComponent(formData.name),
        images: ["/placeholder.svg?height=600&width=600&query=" + encodeURIComponent(formData.name)],
        category: formData.category,
        subcategory: formData.subcategory,
        brand: formData.brand,
        sizes: formData.sizes,
        colors: formData.colors,
        rating: 0,
        reviews: 0,
        features: formData.features,
        tags: formData.tags,
        inStock: formData.inStock,
        storeId: myStore.id,
        storeName: myStore.name,
        discount: formData.discount ? Number.parseFloat(formData.discount) : undefined,
        discountType: formData.discount ? formData.discountType : undefined,
      })

      router.push("/vendor")
    } catch {
      setError("Failed to add product")
    } finally {
      setIsLoading(false)
    }
  }

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({ ...formData, sizes: [...formData.sizes, newSize] })
      setNewSize("")
    }
  }

  const removeSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter((s) => s !== size) })
  }

  const addColor = () => {
    if (newColorName && !formData.colors.find((c) => c.name === newColorName)) {
      setFormData({ ...formData, colors: [...formData.colors, { name: newColorName, hex: newColorHex }] })
      setNewColorName("")
      setNewColorHex("#000000")
    }
  }

  const removeColor = (colorName: string) => {
    setFormData({ ...formData, colors: formData.colors.filter((c) => c.name !== colorName) })
  }

  const addFeature = () => {
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData({ ...formData, features: [...formData.features, newFeature] })
      setNewFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    setFormData({ ...formData, features: formData.features.filter((f) => f !== feature) })
  }

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center gap-4">
          <Link href="/vendor">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Add New Product</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-6">
        {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Brand name"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Pricing & Discount</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="discountType">Discount Type</Label>
                <select
                  id="discountType"
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as "percentage" | "fixed" })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Category</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3"
                  required
                >
                  <option value="">Select category</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3"
                  disabled={!formData.category}
                >
                  <option value="">Select subcategory</option>
                  {formData.category &&
                    availableSubcategories[formData.category]?.map((sub) => (
                      <option key={sub} value={sub} className="capitalize">
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Sizes *</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.sizes.map((size) => (
                <span
                  key={size}
                  className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
                >
                  {size}
                  <button type="button" onClick={() => removeSize(size)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Add size (e.g., S, M, L, 42)"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
              />
              <Button type="button" onClick={addSize} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Colors */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Colors *</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.colors.map((color) => (
                <span key={color.name} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
                  <span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                  {color.name}
                  <button type="button" onClick={() => removeColor(color.name)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color name"
                className="flex-1"
              />
              <Input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-16"
              />
              <Button type="button" onClick={addColor} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Features</h2>
            <div className="space-y-2 mb-3">
              {formData.features.map((feature) => (
                <div key={feature} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(feature)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag (e.g., running, gym)"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stock */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">In Stock</h2>
                <p className="text-sm text-muted-foreground">Is this product currently available?</p>
              </div>
              <Switch
                checked={formData.inStock}
                onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
