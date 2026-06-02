import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { HeroBanner } from "@/components/hero-banner"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { NewArrivals } from "@/components/new-arrivals"
import ChatWidget from "@/components/chat-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts />
        <NewArrivals />
      </main>
      <BottomNav />
      <ChatWidget />
    </div>
  )
}
