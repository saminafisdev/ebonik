import type { Category } from "@/types";
import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<Category[], void>({
      query: () => "categories/",
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Categories" as const, id })),
        { type: "Categories", id: "LIST" },
      ],
    }),
    getCategoryBySlug: build.query<Category, string>({
      query: (slug) => `categories/${slug}/`,
      providesTags: (_result, _error, id) => [{ type: "Categories", id }],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryBySlugQuery } =
  productsApi;
