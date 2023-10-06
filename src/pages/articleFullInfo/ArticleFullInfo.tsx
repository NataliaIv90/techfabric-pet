import { ArticleWrapper } from './components/articleWrapper/ArticleWrapper';
import { ArticleMainContent } from './components/articleMainContent/ArticleMainContent';
import { Comments } from './components/comments/Comments';
import { LoaderContainer, MainArticleContainer } from './ArticleFullInfo.styled';
import { useArticleById } from '../../shared/hooks/useArticleById';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { scrollToTop } from '../../shared/utils/scrollToTop';

export const ArticleFullInfo = () => {
  const { data, isLoading } = useArticleById();

  useEffect(() => {
    scrollToTop();
  }, [data]);

  const scrollToSection = () => {
    const sectionElement = document.getElementById('commentsSection');
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <LoaderContainer>
        <CircularProgress />
      </LoaderContainer>
    );
  }
  return (
    <ArticleWrapper scrollToSection={scrollToSection}>
      <MainArticleContainer>
        <ArticleMainContent />
        <Comments />
      </MainArticleContainer>
    </ArticleWrapper>
  );
};
