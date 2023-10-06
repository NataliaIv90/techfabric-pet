import React, { ReactNode } from 'react';
import { LikesSidebar } from './likesSideBar/LikesSideBar';
import { AuthorSideBar } from './authorSideBar/AuthorSideBar';
import { ArticlePageContainer } from './ArticleWrapper.styled';

interface IArticleWrapperProps {
  children: ReactNode;
  scrollToSection: () => void;
}

export const ArticleWrapper: React.FC<IArticleWrapperProps> = ({ children, scrollToSection }) => {
  return (
    <ArticlePageContainer>
      <LikesSidebar scrollToSection={scrollToSection} />
      {children}
      <AuthorSideBar />
    </ArticlePageContainer>
  );
};
