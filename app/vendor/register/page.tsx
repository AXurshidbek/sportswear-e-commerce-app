"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/contexts/auth-context"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, ArrowRight, CheckCircle } from "lucide-react"

const availableCategories = ["men", "women", "kids", "accessories"]

export default function VendorRegisterPage() {
  const router = useRouter()
  const { user, register } = useAuth()
  const { addStore } = useStore()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Account details
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Store details
  const [storeName, setStoreName] = useState("")
  const [storeDescription, setStoreDescription] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [address, setAddress] = useState("")

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setStep(2)
    setContactEmail(email)
  }

  const handleStoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (selectedCategories.length === 0) {
      setError("Please select at least one category")
      setIsLoading(false)
      return
    }

    try {
      // Register the user as vendor
      const registered = await register(name, email, password, "vendor")
      if (!registered) {
        setError("Email already exists")
        setIsLoading(false)
        return
      }

      // Get the updated user to get storeId
      const userData = JSON.parse(localStorage.getItem("user") || "{}")

      // Create the store
      addStore({
        name: storeName,
        description: storeDescription,
        ownerId: userData.id,
        ownerName: name,
        isActive: true,
        categories: selectedCategories,
        contactEmail,
        contactPhone: contactPhone || undefined,
        address: address || undefined,
      })

      router.push("/vendor")
    } catch {
      setError("Failed to create store")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // If already logged in as vendor, redirect
  if (user?.role === "vendor") {
    router.push("/vendor")
    return null
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <Store className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">Become a Seller</h1>
            <p className="mt-2 text-muted-foreground">Start selling your products on SPORTX marketplace</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-accent" : "text-muted-foreground"}`}>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
              >
                {step > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
              </div>
              <span className="text-sm font-medium">Account</span>
            </div>
            <div className="h-px w-8 bg-border" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-accent" : "text-muted-foreground"}`}>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
              >
                2
              </div>
              <span className="text-sm font-medium">Store</span>
            </div>
          </div>

          {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          {/* Step 1: Account Details */}
          {step === 1 && (
            <form onSubmit={handleAccountSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Account Details</h2>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-accent hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {/* Step 2: Store Details */}
          {step === 2 && (
            <form onSubmit={handleStoreSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Store Details</h2>

              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="My Sportswear Store"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Tell customers about your store..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Categories (select at least one)</Label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        selectedCategories.includes(category)
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="store@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone (optional)</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address (optional)</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, Country"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm leading-tight text-muted-foreground">
                  I agree to the seller terms and conditions and understand the commission structure
                </Label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Creating Store..." : "Create Store"}
                </Button>
              </div>
            </form>
          )}

          {/* Benefits */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Why sell on SPORTX?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Access to millions of active customers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Easy-to-use seller dashboard
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Competitive commission rates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Secure payments and fast payouts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Marketing and promotional tools
              </li>
            </ul>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
