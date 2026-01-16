"use client";

import { translations, type Language } from "@/lib/translations";
import { MenuItemCard } from "./menu-item-card";
import { MenuCategoryWithItems } from "@/lib/types";

interface MenuSectionProps {
  category: MenuCategoryWithItems;
  language: Language;
}

export function MenuSection({ category, language }: MenuSectionProps) {
  const name =
    language === "fr"
      ? category.nameFr
      : language === "ar"
      ? category.nameAr
      : category.nameEn;
  const t = translations[language];

  return (
    <section id={category.id} className="px-6 py-14 scroll-mt-16">
      {/* Section header - more elegant */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px flex-1 bg-border/50" />
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
            {name}
          </h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>
        <p className="text-center text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {category.items.length} {t.items}
        </p>
      </div>

      {/* Menu items list */}
      <div className="max-w-2xl mx-auto">
        {category.items.map((item, index) => (
          <div
            key={item.id}
            className="animate-reveal"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <MenuItemCard item={item} language={language} />
          </div>
        ))}
      </div>
    </section>
  );
}
