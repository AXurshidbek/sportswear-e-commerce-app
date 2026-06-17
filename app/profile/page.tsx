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
  DollarSign,
} from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage, type Language } from "@/contexts/language-context"
import { useCurrency, type Currency } from "@/contexts/currency-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const { currency, setCurrency } = useCurrency()
  const [darkMode, setDarkMode] = useState(true)

  const menuItems = [
    { icon: Package, label: t("profile.myOrders"), href: "/orders" },
    { icon: Heart, label: t("profile.myWishlist"), href: "/wishlist" },
    { icon: MapPin, label: t("profile.shippingAddresses"), href: "/profile/addresses" },
    { icon: CreditCard, label: t("profile.paymentMethods"), href: "/profile/payments" },
    { icon: Bell, label: t("profile.notifications"), href: "/profile/notifications" },
    { icon: Settings, label: t("profile.settings"), href: "/profile/settings" },
  ]

  const displayUser = user ?? {
    name: "Bobur Mahmudov",
    email: "mahmudobbobur787@gmail.com",
    avatar: null as string | null,
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted">
            {displayUser.avatar ? (
              <img
                src={displayUser.avatar}
                alt={displayUser.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold">{displayUser.name}</h1>
            <p className="truncate text-sm text-muted-foreground">{displayUser.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">{t("profile.preferences")}</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
                <span className="font-medium">{t("profile.darkMode")}</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="font-medium">{t("profile.language")}</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="max-w-[140px] rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <option value="uz">O&apos;zbekcha</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="font-medium">{t("profile.currency")}</span>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="max-w-[100px] rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <option value="UZS">UZS</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>

        {user ? (
          <Button
            variant="outline"
            className="mt-6 w-full gap-2 text-destructive hover:text-destructive bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {t("profile.signOut")}
          </Button>
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/login">{t("profile.signIn")}</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/register">{t("profile.createAccount")}</Link>
            </Button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
