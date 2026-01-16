export const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
export const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID;
export async function fetchCategories() {
  const res = await fetch(
    `${API_URL}/admin/categories?restaurantId=${RESTAURANT_ID}`
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.success ? data.data : [];
}

export async function fetchItems() {
  const res = await fetch(
    `${API_URL}/admin/menu-items?restaurantId=${RESTAURANT_ID}`
  );
  if (!res.ok) throw new Error("Failed to fetch items");
  const data = await res.json();

  return data.success ? data.data : [];
}
