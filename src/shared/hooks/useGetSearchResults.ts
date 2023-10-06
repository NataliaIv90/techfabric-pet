import { useSearchQuery } from '../../redux/slicesApi/searchSliceApi';
import { IRequestSearchData } from '../../types/search';
import { useGetParamsFromUrl } from './useGetParamsFromUrl';

export const useGetSearchResults = () => {
  const params = useGetParamsFromUrl() as IRequestSearchData;
  const { data, error, isLoading, isFetching } = useSearchQuery(params);

  return { data, error, isLoading, isFetching };
};
