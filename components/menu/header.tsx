"use client";

import { Search, X, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Language, translations } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Logo } from "./logo";
import type { Restaurant } from "@/lib/types";

interface HeaderProps {
  restaurant: Restaurant | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  onSearchToggle: () => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
];

export function Header({
  restaurant,
  language,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onSearchToggle,
}: HeaderProps) {
  const t = translations[language];
  const { theme, setTheme } = useTheme();

  // Use restaurant tagline or fallback to translation
  const tagline = restaurant?.tagline || t.tagline;

  return (
    <header className="relative z-50">
      <div className="min-h-[55vh] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Hero Image Background */}
        {restaurant?.heroImage && (
          <div className="absolute inset-0 -z-10">
            <img
              src={restaurant.heroImage}
              alt={restaurant.name}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
        )}

        {/* Subtle background pattern (fallback when no hero image) */}
        {!restaurant?.heroImage && (
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 w-40 h-40 rounded-full border border-foreground" />
            <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full border border-foreground" />
            <div className="absolute top-40 right-20 w-16 h-16 rounded-full border border-foreground" />
          </div>
        )}

        {/* Top bar with controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5">
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            {LANGUAGES.map((lang, index) => (
              <div key={lang.code} className="flex items-center">
                <button
                  onClick={() => onLanguageChange(lang.code)}
                  className={cn(
                    "text-xs tracking-[0.15em] transition-colors hover:text-foreground",
                    language === lang.code
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {lang.label}
                </button>
                {index < LANGUAGES.length - 1 && (
                  <span className="text-muted-foreground/30 mx-2">/</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 text-muted-foreground hover:text-foreground rounded-full"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchToggle}
              className="h-10 w-10 text-muted-foreground hover:text-foreground rounded-full"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            {/* admin Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                window.open(process.env.NEXT_PUBLIC_ADMIN_URL, "_blank");
              }}
              className="h-10 w-10 text-muted-foreground hover:text-foreground rounded-full"
              aria-label="Login"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center animate-reveal">
          {/* Logo - use API logo if available, otherwise fallback to local */}
          <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-8">
            {restaurant?.logo ? (
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-full h-full object-contain rounded-2xl"
              />
            ) : (
              <Logo />
            )}
          </div>

          {/* Restaurant Name (if from API) */}
          {restaurant?.name && (
            <h1 className="font-serif text-3xl md:text-4xl text-foreground font-light tracking-wide mb-4">
              {restaurant.name}
            </h1>
          )}

          {/* Tagline */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-primary/60" />
              <p className="text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
                {tagline}
              </p>
              <div className="w-8 h-px bg-primary/60" />
            </div>
          </div>
        </div>

        {/* Decorative floating circles */}
        <div
          className="absolute top-1/3 left-6 w-24 h-24 border border-primary/10 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-1/3 right-8 w-20 h-20 border border-primary/10 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-10 h-10 border border-primary/5 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl transition-all duration-500",
          isSearchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchToggle}
            className="absolute top-6 right-6 h-12 w-12 text-muted-foreground hover:text-foreground rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="w-full max-w-lg">
            <p className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase text-center mb-10">
              {t.search}
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder={getSearchPlaceholder(language)}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus={isSearchOpen}
                className={cn(
                  "w-full bg-transparent border-b-2 border-border focus:border-primary text-2xl md:text-3xl font-serif font-light text-center text-foreground placeholder:text-muted-foreground/30 focus:outline-none py-4 transition-colors",
                  language === "ar" && "text-right"
                )}
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function getSearchPlaceholder(language: Language): string {
  const placeholders = {
    en: "What are you craving?",
    fr: "Que désirez-vous?",
    ar: "ماذا تريد",
  };
  return placeholders[language];
}
