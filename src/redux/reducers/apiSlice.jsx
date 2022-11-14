// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const socialNetworkApi = createApi({
  reducerPath: 'socialNetworkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `user/${userId}`,
    }),
    getUsers: builder.query({
      query: () => `user`,
    }),
    getPost: builder.query({
      query: () => `post`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useGetUsersQuery, useGetPostQuery } = socialNetworkApi;