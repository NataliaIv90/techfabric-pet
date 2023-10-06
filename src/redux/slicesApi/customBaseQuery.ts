import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      const { accessToken } = JSON.parse(tokens);
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 'FETCH_ERROR') {
    const tokens = localStorage.getItem('tokens');

    const { refreshToken } = tokens && JSON.parse(tokens);
    const refreshResult = await baseQuery(
      { url: '/authorization/refresh-tokens', method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      localStorage.setItem('tokens', JSON.stringify(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('tokens');
      window.location.href = '/login';
    }
  }
  return result;
};
