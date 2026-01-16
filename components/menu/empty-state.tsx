"use client"

import { Search } from "lucide-react"
import { type Language, translations } from "@/lib/translations"

interface EmptyStateProps {
  language: Language
}

export function EmptyState({ language }: EmptyStateProps) {
  const t = translations[language]

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-2xl text-foreground mb-3">{t.noResults}</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">{t.tryDifferent}</p>
      </div>
    </div>
  )
}
