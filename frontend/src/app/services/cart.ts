import type { Cart } from "@/types";
import { api } from "./api";

const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserCart: build.query<Cart, void>({
      query: () => "cart/ ",
      providesTags: ["Cart"],
    }),
    addToCart: build.mutation({
      query: ({ product_id, quantity }) => ({
        url: "cart-items/",
        method: "POST",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: build.mutation({
      query: (id) => ({
        url: `cart-items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
} = cartApi;
