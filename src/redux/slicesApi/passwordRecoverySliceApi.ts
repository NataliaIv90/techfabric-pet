import { createApi } from '@reduxjs/toolkit/query/react';
import { IResetPasswordData, IResponse, ISetPasswordData } from '../../types/recoveryPassword';
import { baseQuery } from './customBaseQuery';

export const passwordRecoveryApi = createApi({
  reducerPath: 'passwordRecoveryApi',
  baseQuery,

  endpoints: (build) => ({
    resetPassword: build.mutation<IResponse, IResetPasswordData>({
      query: ({ toEmail }) => ({
        url: `users/reset-password?toEmail=${toEmail}`,
        method: 'POST',
      }),
    }),
    setPassword: build.mutation<IResponse, ISetPasswordData>({
      query: ({ data, id }) => ({
        url: `users/reset-password/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useSetPasswordMutation } = passwordRecoveryApi;
