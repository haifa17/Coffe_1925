// ----- Types -----
export interface BaseModel {
  id: string;
  created_at?: string;
  updated_at?: string;
  deletedAt?: string | null;
}

export interface MenuItem extends BaseModel {
  restaurantId: string;
  categoryId: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  descriptionAr?: string;
  price: number;
  image?: string | null;
  available?: boolean;
  isActive?: boolean;
  isChefRecommendation?: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface Category extends BaseModel {
  restaurantId: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
  icon?: string;
  visible: boolean;
  order: number;
  isActive: boolean;
}

export interface Schedule {
  dayOfWeek: string;
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
}

export interface Restaurant {
  id: string;
  userId: string;
  slug: string;
  name: string;
  phone: string | null;
  logo: string | null;
  heroImage: string | null;
  tagline: string | null;
  description: string | null;
  schedules: Schedule[];
}

export interface MenuData {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
}

export interface MenuCategoryWithItems extends Category {
  items: MenuItem[];
}
