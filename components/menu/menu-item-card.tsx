"use client";

import Image from "next/image";
import { Star, Flame, Leaf } from "lucide-react";
import { type Language, translations } from "@/lib/translations";
import { MenuItem } from "@/lib/types";

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
  variant?: "default" | "featured";
}

function formatPrice(price: number): string {
  return (price / 1000).toFixed(3);
}

export function MenuItemCard({
  item,
  language,
  variant = "default",
}: MenuItemCardProps) {
  const t = translations[language];
  const nameMap = {
    en: item.nameEn,
    fr: item.nameFr,
    ar: item.nameAr,
  };

  const descriptionMap = {
    en: item.descriptionEn,
    fr: item.descriptionFr,
    ar: item.descriptionAr,
  };

  const name = nameMap[language] ?? "";
  const description = descriptionMap[language] ?? "";

  if (variant === "featured") {
    return (
      <div className="group relative bg-card rounded-2xl overflow-hidden hover-lift border border-border/30 shadow-sm">
        {/* Image */}
        {item.image && (
          <div className="relative aspect-4/3 overflow-hidden bg-muted">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={name || ""}
              fill
              className="object-cover image-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

            {/* Chef badge - positioned top right */}
            {item.isChefRecommendation && (
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1.5 text-[10px] tracking-wider text-primary-foreground bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase font-medium">
                  <Star className="h-3 w-3 fill-current" />
                  Chef
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-serif text-xl text-foreground leading-tight">
              {name}
            </h3>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed  mb-4">
              {description}
            </p>
          )}

          {/* Price and tags row */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              {item.isPopular && (
                <Star className="h-3.5 w-3.5 text-primary fill-primary" />
              )}
              {item.isSpicy && (
                <Flame className="h-3.5 w-3.5 text-orange-500" />
              )}
              {item.isVegetarian && (
                <Leaf className="h-3.5 w-3.5 text-green-600" />
              )}
            </div>
            <span className="text-xl font-serif text-primary font-medium">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex gap-5 py-5 border-b border-border/30 transition-all duration-300 hover:bg-muted/30 -mx-4 px-4 rounded-lg">
      {/* Image */}
      {item.image && (
        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={name || ""}
            fill
            className="object-cover image-zoom"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-serif text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1  leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <span className="text-lg font-serif text-primary font-medium whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>

        {/*Tags */}
        {(item.isPopular || item.isSpicy || item.isVegetarian) && (
          <div className="flex items-center gap-2 mt-2">
            {item.isPopular && (
              <Star className="h-3 w-3 text-primary fill-primary" />
            )}
            {item.isSpicy && <Flame className="h-3 w-3 text-orange-500" />}
            {item.isVegetarian && <Leaf className="h-3 w-3 text-green-600" />}
          </div>
        )}
      </div>
    </div>
  );
}
