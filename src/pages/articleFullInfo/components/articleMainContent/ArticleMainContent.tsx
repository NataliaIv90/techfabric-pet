import { ArticleContainer } from './ArticleMainContent.styled';
import { CircularProgress } from '@mui/material';
import { useArticleById } from '../../../../shared/hooks/useArticleById';
import { Article } from '../../../../shared/components/article/Article';
import { useMemo } from 'react';

export const ArticleMainContent = () => {
  const { data, isLoading } = useArticleById();

  const hasComments = !!data?.comments.length;
  const tags = useMemo(() => {
    return data?.tags.map(({ name }) => name).join(' ');
  }, [data?.tags]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <ArticleContainer>
      <Article
        hasComments={hasComments}
        inFullInfo={true}
        name={data?.name || ''}
        mainImage={`data:${data?.contentType};base64,${data?.mainImage}` || ''}
        tags={tags || ''}
        content={data?.content || ''}
        year={data?.year}
        platform={data?.platform}
        gameType={data?.gameType}
      />
    </ArticleContainer>
  );
};
