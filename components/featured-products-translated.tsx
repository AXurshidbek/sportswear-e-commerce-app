'use client'

import { products } from "@/lib/data"
import { ProductCardTranslated } from "./product-card-translated"
import { useLanguage } from "@/contexts/language-context"

export function FeaturedProductsTranslated() {
  const { t } = useLanguage()
  const featured = products.slice(0, 8)

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {t('products.featured')}
          </h2>
          <p className="text-muted-foreground">
            {t('products.allProducts')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCardTranslated key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
