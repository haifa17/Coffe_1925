import { useMemo } from "react";
import type { Category, MenuItem, MenuCategoryWithItems } from "@/lib/types";

/**
 * Filters menu items based on search query
 */
function filterMenuItems(items: MenuItem[], query: string): MenuItem[] {
  if (!query.trim()) return items;

  const normalizedQuery = query.toLowerCase();

  return items.filter((item) => {
    const searchableText = [
      item.nameEn,
      item.nameFr,
      item.nameAr,
      item.descriptionEn,
      item.descriptionFr,
      item.descriptionAr,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Combines categories with their filtered items
 */
function buildCategoryMenuData(
  categories: Category[],
  menuItems: MenuItem[],
  searchQuery: string
): MenuCategoryWithItems[] {
  return categories
    .map((category) => {
      const categoryItems = menuItems.filter(
        (item) =>
          item.categoryId === category.id && item.isActive && item.available
      );

      const filteredItems = filterMenuItems(categoryItems, searchQuery);

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => category.items.length > 0);
}

/**
 * Hook to filter and organize menu data
 */
export function useMenuFiltering(
  categories: Category[],
  menuItems: MenuItem[],
  searchQuery: string
) {
  const chefRecommendations = useMemo(() => {
    return menuItems.filter(
      (item) => item.isActive && item.available && item.isChefRecommendation
    );
  }, [menuItems]);

  const filteredCategories = useMemo(() => {
    return buildCategoryMenuData(categories, menuItems, searchQuery);
  }, [categories, menuItems, searchQuery]);

  return { chefRecommendations, filteredCategories };
}