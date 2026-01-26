"use client";

import Image from "next/image";
import { translations, type Language } from "@/lib/translations";
import type { Restaurant } from "@/lib/types";

interface FooterProps {
  restaurant: Restaurant | null;
  language?: Language;
}

export function Footer({ restaurant, language = "en" }: FooterProps) {
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  const name = restaurant?.name || "The 1925";
  const tagline = restaurant?.tagline || t.tagline;

  return (
    <footer className="py-20 text-center border-t border-border/50 bg-muted/30">
      <div className="w-20 h-20 mx-auto mb-5 relative opacity-50">
        {restaurant?.logo ? (
          <img
            src={restaurant.logo}
            alt={name}
            className="w-full h-full object-contain"
          />
        ) : (
          <Image
            src="/images/logo.png"
            alt={name}
            fill
            className="object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
        )}
      </div>

      {tagline && (
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
          {tagline}
        </p>
      )}

      <p className="text-[9px] tracking-wider text-muted-foreground/60 mt-3">
         {currentYear} {name}
      </p>

      <p className="text-[8px] tracking-wider text-muted-foreground/40 mt-2">
        {t.poweredBy}
      </p>
    </footer>
  );
}
