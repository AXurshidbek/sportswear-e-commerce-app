"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { promotions } from "@/lib/data"
import { cn } from "@/lib/utils"

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + promotions.length) % promotions.length)
  const next = () => setCurrent((c) => (c + 1) % promotions.length)

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden md:h-[70vh]">
      {promotions.map((promo, index) => (
        <div
          key={promo.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === current ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <Image
            src={promo.image || "https://gloryshinesports.com/images/pictures-58_banner.jpg"}
            alt={promo.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <p className="text-sm font-medium uppercase tracking-widest text-accent md:text-base">{promo.subtitle}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-6xl">{promo.title}</h1>
            <p className="mt-2 text-muted-foreground md:text-lg">{promo.description}</p>
            <Button asChild className="mt-6" size="lg">
              <Link href={promo.link}>{promo.cta}</Link>
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 backdrop-blur-sm transition-colors hover:bg-background/80"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 backdrop-blur-sm transition-colors hover:bg-background/80"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === current ? "w-6 bg-foreground" : "w-2 bg-foreground/40",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
