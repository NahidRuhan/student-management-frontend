import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, AuthCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthUser, AuthCredentials>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getMe: builder.query<AuthUser, void>({
      query: () => '/auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
