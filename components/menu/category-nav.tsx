"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { Language } from "@/lib/translations"
import { Category } from "@/lib/types"

interface CategoryNavProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  language: Language
}

// Elegant icon mapping - using simple text-based icons
const categoryIcons: Record<string, string> = {
  "chef-recommendations": "★",
  coffee: "◉",
  "cold-drinks": "◈",
  cocktails: "◆",
  smoothies: "●",
  breakfast: "◐",
  crepes: "◑",
  brioches: "◒",
  pizza: "◓",
  pasta: "◔",
  burgers: "◕",
  meat: "◖",
  fish: "◗",
  sandwiches: "◘",
  tacos: "◙",
  pastries: "◚",
  ice_cream: "◛",
}

export function CategoryNav({ categories, activeCategory, onCategoryChange, language }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const activeButton = activeRef.current
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      const scrollLeft =
        buttonRect.left - containerRect.left - containerRect.width / 2 + buttonRect.width / 2 + container.scrollLeft

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }, [activeCategory])

  return (
    <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar px-4 py-4">
        {categories.map((category) => {
          const isActive = category.id === activeCategory
          return (
            <button
              key={category.id}
              ref={isActive ? activeRef : null}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "relative px-4 py-2 whitespace-nowrap transition-all duration-300 rounded-full mx-1",
                isActive
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <span className="font-serif text-sm">{language === "en" ? category.nameEn : category.nameFr}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
