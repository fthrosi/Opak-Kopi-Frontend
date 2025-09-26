import { create } from "zustand";
import { fetchMenu } from "@/api/menu";
import { getRatingsMenu } from "@/api/rating";
import type { MenuProps } from "@/types/menu";
import type { MenuRating } from "@/types/rating";

type MenuStore = {
  // Menu state
  listMenu: MenuProps[];
  isLoading: boolean;
  error: string | null;

  // Rating state
  ratings: MenuRating[];
  isRatingsLoading: boolean;
  ratingsError: string | null;

  // Actions
  fetchMenuData: () => Promise<void>;
  fetchRatingsData: (menuIds?: number[]) => Promise<void>;

  // Helper function
  getMenuRating: (menuId: number) => {
    averageRating: number;
    totalReviews: number;
  };

  // Reset functions
  resetMenu: () => void;
  resetRatings: () => void;
};

export const useMenu = create<MenuStore>((set, get) => ({
  listMenu: [],
  isLoading: false,
  error: null,

  ratings: [],
  isRatingsLoading: false,
  ratingsError: null,

  fetchMenuData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchMenu();
      const menuData = response.data;

      set({
        listMenu: menuData,
        isLoading: false,
      });
      const menuIds = menuData.map((menu: MenuProps) => menu.id);
      if (menuIds.length > 0) {
        get().fetchRatingsData(menuIds);
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch menu data",
        isLoading: false,
      });
    }
  },

  fetchRatingsData: async (menuIds?: number[]) => {
    set({ isRatingsLoading: true, ratingsError: null });
    try {
      let ids = menuIds;

      if (!ids) {
        const { listMenu } = get();
        ids = listMenu.map((menu) => menu.id);
      }

      if (!ids || ids.length === 0) {
        set({ isRatingsLoading: false });
        return;
      }

      const response = await getRatingsMenu(ids);

      const ratingsData = response.data || response;
      const validRatings = Array.isArray(ratingsData) ? ratingsData : [];

      set({
        ratings: validRatings,
        isRatingsLoading: false,
      });
    } catch (error: any) {
      set({
        ratingsError: error.message || "Failed to fetch ratings data",
        isRatingsLoading: false,
        ratings: [],
      });
    }
  },

  getMenuRating: (menuId: number) => {
    const { ratings } = get();

    if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const menuRating = ratings.find((rating) => rating.menu_id === menuId);

    if (!menuRating) {
      return { averageRating: 0, totalReviews: 0 };
    }

    return {
      averageRating: Math.round((menuRating._avg.rating || 0) * 10) / 10,
      totalReviews: menuRating._count.rating || 0,
    };
  },

  resetMenu: () =>
    set({
      listMenu: [],
      isLoading: false,
      error: null,
    }),

  resetRatings: () =>
    set({
      ratings: [],
      isRatingsLoading: false,
      ratingsError: null,
    }),
}));
