import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './customBaseQuery';
import { IRequestComment } from '../../types/comments';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery,

  endpoints: (build) => ({
    createComment: build.mutation<void, IRequestComment>({
      query: ({ articleId, content }) => ({
        url: `articles/${articleId}/comments`,
        method: 'POST',
        body: { content },
      }),
    }),
  }),
});

export const { useCreateCommentMutation } = commentsApi;
