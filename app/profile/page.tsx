"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const menuItems = [
  { icon: Package, label: "My Orders", href: "/orders" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MapPin, label: "Shipping Addresses", href: "/profile/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/profile/payments" },
  { icon: Bell, label: "Notifications", href: "/profile/notifications" },
  { icon: Settings, label: "Settings", href: "/profile/settings" },
]

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState("en")

  // Mock user data - in a real app this would come from auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* User Info */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            {user.avatar ? (
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Preferences */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">Preferences</h2>
          <div className="space-y-2">
            {/* Dark Mode */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="font-medium">Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>

            {/* Language */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="uz">O'zbek</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <Button variant="outline" className="mt-6 w-full gap-2 text-destructive hover:text-destructive bg-transparent">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>

        {/* Auth Links for non-logged in users */}
        <div className="mt-6 flex gap-3">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
