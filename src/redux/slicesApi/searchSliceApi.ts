import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery';
import {
  EParameter,
  IRequestSearchData,
  IResponseArticles,
  IResponseComments,
  IResponseTags,
  IResponseUsers,
} from '../../types/search';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Author'],

  endpoints: (build) => ({
    search: build.query<IResponseArticles | IResponseUsers | IResponseTags | IResponseComments, IRequestSearchData>({
      query: ({ query, order, parameters, category }) => ({
        url: `${
          parameters !== EParameter.Relevant
            ? `/search?category=${category}&order=${order}&parameters=${parameters}&search=${query}`
            : `/search?category=${category}&search=${query}`
        }`,
      }),
      providesTags: ['Author'],
    }),
  }),
});

export const { useSearchQuery } = searchApi;
