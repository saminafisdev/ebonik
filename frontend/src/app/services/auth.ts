import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/jwt/create/ ",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "auth/users/me/",
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} = authApi;
