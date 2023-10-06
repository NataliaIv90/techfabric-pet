import { useParams } from 'react-router-dom';
import { useGetArticleQuery } from '../../redux/slicesApi/articlesApi';

export const useArticleById = () => {
  const { articleId } = useParams();
  const { data, isLoading, refetch } = useGetArticleQuery({ id: articleId || '' });
  return { data, isLoading, articleId, refetch };
};
