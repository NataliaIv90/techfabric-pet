import { CircularProgress } from '@mui/material';
import { useGetArticlesListFavoriteQuery } from '../../redux/slicesApi/articlesApi';
import { ArticleCard } from '../../shared/components/articleCard/ArticleCard';
import { SidebarNavigation } from '../../shared/components/sidebarNavigation/SidebarNav';
import { FavoriteArticlesList, FavoriteContainer, FavoriteMainContainer } from './Favorite.styled';
import { useState } from 'react';
import { PaginationComponent } from '../../shared/components/pagination/Pagination';

export const Favorite = () => {
  const [controller, setController] = useState({ page: 1, size: 10 });
  const { data, error, isLoading } = useGetArticlesListFavoriteQuery(controller);

  return (
    <FavoriteContainer>
      <SidebarNavigation />
      {isLoading ? (
        <CircularProgress />
      ) : !error ? (
        <FavoriteMainContainer>
          <FavoriteArticlesList>
            {data?.articles?.map((article) => (
              <ArticleCard
                key={article.id}
                data={article}
              />
            ))}
          </FavoriteArticlesList>
          <PaginationComponent
            controller={controller}
            chnageController={setController}
            totalPages={data?.totalPages || 1}
          />
        </FavoriteMainContainer>
      ) : (
        <div>No results!</div>
      )}
    </FavoriteContainer>
  );
};
