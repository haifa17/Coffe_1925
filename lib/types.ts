
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

export interface MenuData {
  restaurant: any;
  categories: Category[];
  menuItems: MenuItem[];
  storyCards: any[];
}
export interface MenuCategoryWithItems extends Category {
  items: MenuItem[];
}
