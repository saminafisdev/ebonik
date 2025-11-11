import type { Cart } from "@/types";
import { api } from "./api";

const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserCart: build.query<Cart, void>({
      query: () => "cart/ ",
    }),
    addToCart: build.mutation({
      query: ({ product_id, quantity }) => ({
        url: "cart-items/",
        method: "POST",
        body: { product_id, quantity },
      }),
    }),
  }),
});

export const { useGetUserCartQuery, useAddToCartMutation } = cartApi;
