import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">Kategoriyalar bo'yicha savdo</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              <Image
                src={category.image || "https://i.guim.co.uk/img/media/e5a60fe02429db588fdd910fcfa259b9c78b4e60/0_73_3313_1988/master/3313.jpg?width=620&dpr=2&s=none&crop=none"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-foreground md:text-xl">{category.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Shop Now</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
