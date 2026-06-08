import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { SearchProvider } from "@/contexts/search-context"
import { AuthProvider } from "@/contexts/auth-context"
import { StoreProvider } from "@/contexts/store-context"
import { Suspense } from "react"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SPORTX | Premium Athletic Wear Marketplace",
  description:
    "Shop the latest sportswear from multiple vendors. Athletic apparel and accessories for men, women, and kids.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SPORTX",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AuthProvider>
          <StoreProvider>
            <SearchProvider>
              <CartProvider>
                <Suspense fallback={null}>
                  <WishlistProvider>{children}</WishlistProvider>
                </Suspense>
              </CartProvider>
            </SearchProvider>
          </StoreProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
