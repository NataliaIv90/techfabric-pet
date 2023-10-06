import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetParamsFromUrl } from './useGetParamsFromUrl';

export const useNavigateWithSearchParams = () => {
  const params = useGetParamsFromUrl();
  const navigate = useNavigate();

  const navigateTo = (name: string, value: string) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ ...params, [name]: value })}`,
    });
  };
  return navigateTo;
};
