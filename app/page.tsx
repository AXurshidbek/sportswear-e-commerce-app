import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { HeroBanner } from "@/components/hero-banner"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { NewArrivals } from "@/components/new-arrivals"
import ChatWidget from "@/components/chat-widget"
import { TranslationDemo } from "@/components/translation-demo"

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <HeroBanner />
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <TranslationDemo />
        </div>
        <CategoryGrid />
        <FeaturedProducts />
        <NewArrivals />
      </main>
      <BottomNav />
      <ChatWidget />
    </div>
  )
}
