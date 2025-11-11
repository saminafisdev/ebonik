import type { Product } from "@/types";
import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      Product[],
      { category?: string; search?: string; page?: number }
    >({
      query: ({ category, search, page } = {}) => {
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());

        return `products/?${params.toString()}`;
      },
      providesTags: (result = []) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProductById: build.query<Product, string>({
      query: (id) => `products/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
