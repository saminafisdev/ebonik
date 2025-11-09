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
  }),
});

export const { useGetProductsQuery } = productsApi;
