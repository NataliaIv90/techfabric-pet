import { createApi } from '@reduxjs/toolkit/query/react';
import { ILoginData, ILoginResponse, IRegisterData, IRegisterResponse } from '../../types/auth';

import { baseQueryWithReauth } from './customBaseQuery';
import { ICurrentUserResponse } from '../../types/user';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, ILoginData>({
      query: (data) => ({
        url: 'authorization/login',
        method: 'POST',
        body: data,
      }),

      transformResponse: (response: { data: ILoginResponse }) => {
        localStorage.setItem('tokens', JSON.stringify(response));
        return response.data;
      },
      invalidatesTags: ['User'],
    }),
    registerUser: build.mutation<IRegisterResponse, IRegisterData>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
    sendMail: build.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `users/confirm?email=${email}`,
        method: 'POST',
      }),
    }),
    getUser: build.query<ICurrentUserResponse, string | void>({
      query: () => ({ url: 'users/current' }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterUserMutation, useSendMailMutation, useGetUserQuery } = authApi;
