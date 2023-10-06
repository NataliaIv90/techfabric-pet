import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from './slicesApi/authSliceApi';
import { passwordRecoveryApi } from './slicesApi/passwordRecoverySliceApi';
import { articlesApi } from './slicesApi/articlesApi';
import { commentsApi } from './slicesApi/commentsSliceApi';
import { searchApi } from './slicesApi/searchSliceApi';
import { userListApi } from './slicesApi/userListApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [passwordRecoveryApi.reducerPath]: passwordRecoveryApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [userListApi.reducerPath]: userListApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware as any,
      passwordRecoveryApi.middleware as any,
      articlesApi.middleware as any,
      commentsApi.middleware as any,
      searchApi.middleware as any,
      userListApi.middleware as any
    ),
});

export type RootState = ReturnType<typeof store.getState>;
