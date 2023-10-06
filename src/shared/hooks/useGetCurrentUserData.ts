import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetUserQuery } from '../../redux/slicesApi/authSliceApi';

export const useGetCurrentUserData = () => {
  const tokens = localStorage.getItem('tokens');
  const { data, refetch } = useGetUserQuery(tokens ?? skipToken);
  return { data, refetch };
};
