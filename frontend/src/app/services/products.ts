import type { Product } from "@/types";
import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => "products/",
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Products" as const, id })),
        { type: "Products", id: "LIST" },
      ],
    }),
    getProductById: build.query<Product, string>({
      query: (id) => `products/${id}/`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
