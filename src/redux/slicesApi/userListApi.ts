import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery';
import { ICurrentUserResponse, IUserListResponce, IUsersToUpdate } from '../../types/user';
import { IPagination } from '../../shared/constants/types';

export const userListApi = createApi({
  reducerPath: 'userListApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getAllUsers: build.query<ICurrentUserResponse[], void>({
      query: () => 'users',
    }),
    setNewRoles: build.mutation<void, IUsersToUpdate[]>({
      query: (data) => ({
        url: 'users',
        method: 'PATCH',
        body: data,
      }),
    }),
    getUsersByPage: build.mutation<IUserListResponce, IPagination>({
      query: ({ page, size }) => ({
        url: `users?page=${page}&size=${size}`,
      }),
    }),
    changeUserAvatar: build.mutation<
      void,
      {
        image: string | null;
        contentType: string | null;
      }
    >({
      query: ({ image, contentType }) => ({
        url: `users/avatar`,
        body: { image, contentType },
        method: 'PUT',
      }),
    }),
    changeUserInfo: build.mutation<
      void,
      {
        userName?: string;
        name?: string;
        surname?: string;
      }
    >({
      query: ({ userName, name, surname }) => ({
        url: `users`,
        body: { userName, name, surname },
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSetNewRolesMutation,
  useGetUsersByPageMutation,
  useChangeUserAvatarMutation,
  useChangeUserInfoMutation,
} = userListApi;
