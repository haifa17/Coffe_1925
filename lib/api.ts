import type { Restaurant } from "@/lib/types";

export const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3000/api";
export const RESTAURANT_SLUG = process.env.NEXT_PUBLIC_RESTAURANT_SLUG || "";

// Fetch menu data from the public API
export async function fetchMenuData() {
  if (!RESTAURANT_SLUG) {
    throw new Error("NEXT_PUBLIC_RESTAURANT_SLUG is not set");
  }

  const res = await fetch(`${API_URL}/public/menu/${RESTAURANT_SLUG}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch menu data");
  const data = await res.json();

  return data.success ? data.data : null;
}

// Helper to extract categories from menu data
export async function fetchCategories() {
  const menuData = await fetchMenuData();
  if (!menuData) return [];

  return menuData.categories.map((cat: any) => ({
    id: cat.id,
    nameEn: cat.nameEn,
    nameFr: cat.nameFr,
    nameAr: cat.nameAr,
    icon: cat.icon,
    order: cat.order,
  }));
}

// Helper to extract items from menu data
export async function fetchItems() {
  const menuData = await fetchMenuData();
  if (!menuData) return [];

  // Flatten all items from all categories
  return menuData.categories.flatMap((cat: any) =>
    cat.items.map((item: any) => ({
      ...item,
      categoryId: cat.id,
    }))
  );
}

// Get restaurant info
export async function fetchRestaurant(): Promise<Restaurant | null> {
  const menuData = await fetchMenuData();
  return menuData?.restaurant || null;
}

// Fetch all data at once (optimized)
export async function fetchAllMenuData() {
  const menuData = await fetchMenuData();
  if (!menuData) return { restaurant: null, categories: [], menuItems: [] };

  const categories = menuData.categories.map((cat: any) => ({
    id: cat.id,
    nameEn: cat.nameEn,
    nameFr: cat.nameFr,
    nameAr: cat.nameAr,
    icon: cat.icon,
    order: cat.order,
  }));

  const menuItems = menuData.categories.flatMap((cat: any) =>
    cat.items.map((item: any) => ({
      ...item,
      categoryId: cat.id,
    }))
  );

  return {
    restaurant: menuData.restaurant,
    categories,
    menuItems,
  };
}
