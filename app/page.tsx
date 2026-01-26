import { fetchAllMenuData } from "@/lib/api";
import { MenuPageClient } from "@/components/menu/menu-page-client";
import type { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const { restaurant } = await fetchAllMenuData();

  if (!restaurant) {
    return {
      title: "Menu | The 1925",
      description: "Explore our exquisite menu",
    };
  }

  return {
    title: `${restaurant.name} - Menu`,
    description: restaurant.tagline || `View the menu of ${restaurant.name}`,
    openGraph: {
      title: `${restaurant.name} - Menu`,
      description: restaurant.tagline || `View the menu of ${restaurant.name}`,
      images: restaurant.heroImage ? [restaurant.heroImage] : [],
    },
  };
}

// Revalidate every 5 minutes (adjust based on your needs)
export const revalidate = 300;

export default async function MenuPage() {
  // Fetch all data at once (optimized)
  const { restaurant, categories, menuItems } = await fetchAllMenuData();

  // Pass data to client component
  return (
    <MenuPageClient
      restaurant={restaurant}
      categories={categories}
      menuItems={menuItems}
    />
  );
}
