"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/menu/header";
import { CategoryNav } from "@/components/menu/category-nav";
import { ChefRecommendations } from "@/components/menu/chef-recommendations";
import { MenuSection } from "@/components/menu/menu-section";
import { EmptyState } from "@/components/menu/empty-state";
import { SplashScreen } from "@/components/menu/splash-screen";
import type { Category, MenuItem, Restaurant } from "@/lib/types";
import { useMenuFiltering } from "@/hooks/use-menu-filtering";
import { useCategoryScrollSpy } from "@/hooks/use-category-scroll-spy";
import { Footer } from "./footer";
import { Language } from "@/lib/translations";

interface MenuPageClientProps {
  restaurant: Restaurant | null;
  categories: Category[];
  menuItems: MenuItem[];
}

export function MenuPageClient({ restaurant, categories, menuItems }: MenuPageClientProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [language, setLanguage] = useState<Language>("en");

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);
  const handleSearchToggle = useCallback(
    () => setIsSearchOpen((prev) => !prev),
    []
  );

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    const section = document.getElementById(categoryId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveCategory(categoryId);
  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  // Set initial active category
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // Filter menu data
  const { chefRecommendations, filteredCategories } = useMenuFiltering(
    categories,
    menuItems,
    searchQuery
  );

  // Track active category on scroll
  useCategoryScrollSpy(filteredCategories, handleCategoryChange);

  const hasResults = filteredCategories.length > 0;
  const showChefRecommendations =
    !searchQuery && chefRecommendations.length > 0;

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} restaurant={restaurant} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Header
        restaurant={restaurant}
        language={language}
        onLanguageChange={handleLanguageChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onSearchToggle={handleSearchToggle}
      />

      {hasResults && (
        <CategoryNav
          categories={filteredCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryClick}
          language={language}
        />
      )}

      <main className="pb-20">
        {showChefRecommendations && (
          <ChefRecommendations
            items={chefRecommendations}
            language={language}
          />
        )}

        {hasResults ? (
          filteredCategories.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              language={language}
            />
          ))
        ) : (
          <EmptyState language={language} />
        )}
      </main>

      <Footer restaurant={restaurant} language={language} />
    </div>
  );
}
