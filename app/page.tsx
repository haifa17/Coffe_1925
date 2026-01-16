import { fetchCategories, fetchItems } from "@/lib/api";
import { MenuPageClient } from "@/components/menu/menu-page-client";

export const metadata = {
  title: "Menu | The 1925",
  description: "Explore our exquisite menu featuring chef recommendations and carefully curated dishes",
};

// Revalidate every 5 minutes (adjust based on your needs)
export const revalidate = 300;

export default async function MenuPage() {
  // Fetch data on the server
  const [categories, menuItems] = await Promise.all([
    fetchCategories(),
    fetchItems(),
  ]);

  // Pass data to client component
  return <MenuPageClient categories={categories} menuItems={menuItems} />;
}