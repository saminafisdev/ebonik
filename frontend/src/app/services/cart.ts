import { api } from "./api";

const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: ({ product_id, quantity }) => ({
        url: "cart-items/",
        method: "POST",
        body: { product_id, quantity },
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
