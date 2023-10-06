import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IArticleFullInfoResponse,
  IArticleFullData,
  IPublishArticleResponse,
  ITopTagResponse,
  ITopAuthorsResponse,
  IResponseData,
  IImageUploadResponse,
} from '../../types/article';
import { baseQueryWithReauth } from './customBaseQuery';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Author', 'Like'],

  endpoints: (build) => ({
    getArticlesList: build.query<IResponseData, void>({
      query: () => 'articles',
    }),
    getArticlesListWithQuery: build.query<
      IResponseData,
      { query: string; category: string; page: string; size: string }
    >({
      query: ({ query, category, page, size }) =>
        `/articles/find?page=${page}&size=${size}&search=${query}&findBy=${category}`,
    }),
    getArticlesListFavorite: build.query<IResponseData, { page: number; size: number }>({
      query: ({ page, size }) => `articles?IsFavorites=true&page=${page}&size=${size}`,
      providesTags: ['Author', 'Like'],
    }),
    postArticle: build.mutation<IPublishArticleResponse, IArticleFullData>({
      query: (data) => ({
        url: 'articles',
        method: 'POST',
        body: data,
      }),
    }),
    getArticle: build.query<IArticleFullInfoResponse, { id: string }>({
      query: ({ id }) => ({
        url: `articles/${id}`,
      }),
      providesTags: ['Author'],
    }),
    like: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `articles/${id}/like`,
        method: 'PUT',
      }),
      invalidatesTags: ['Like'],
    }),
    getTopTags: build.query<ITopTagResponse, void>({
      query: () => 'articles/top/tags',
    }),
    getTopAuthors: build.query<ITopAuthorsResponse, void>({
      query: () => 'articles/top/authors',
      providesTags: ['Author'],
    }),
    getArticleListQuery: build.query<
      IResponseData,
      { page: string; size: string; order: string; search: string | null; findBy: string | null }
    >({
      query: ({ page = 1, size = 10, order = 'DateCreated', findBy, search }) => ({
        url: !search
          ? `/articles?page=${page}&size=${size}&order=${order}`
          : `/articles?page=${page}&size=${size}&order=${order}&findBy=${findBy}&search=${search}`,
      }),
      providesTags: ['Author'],
    }),
    uploadImage: build.mutation<IImageUploadResponse, FormData>({
      query: (formData) => ({
        url: 'articles/image',
        method: 'POST',
        body: formData,
      }),
    }),
    deleteArticle: build.mutation<IPublishArticleResponse, { articleId: string }>({
      query: (data) => ({
        url: `articles/${data.articleId}`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  usePostArticleMutation,
  useGetArticleQuery,
  useLikeMutation,
  useGetTopTagsQuery,
  useGetTopAuthorsQuery,
  useGetArticlesListFavoriteQuery,
  useLazyGetArticlesListWithQueryQuery,
  useGetArticleListQueryQuery,
  useLazyGetArticleListQueryQuery,
  useUploadImageMutation,
  useDeleteArticleMutation
} = articlesApi;
