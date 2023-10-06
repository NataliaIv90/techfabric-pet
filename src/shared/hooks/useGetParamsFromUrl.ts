import { useSearchParams } from 'react-router-dom';
import { ECategory, EOrder, EParameter } from '../../types/search';

export const useGetParamsFromUrl = () => {
  const [searchParams] = useSearchParams();
  const params = {
    query: searchParams.get('query') || '',
    parameters: searchParams.get('parameters') || EParameter.Relevant,
    category: searchParams.get('category') || ECategory.Articles,
    order: EOrder.Order,
  };

  return params;
};
