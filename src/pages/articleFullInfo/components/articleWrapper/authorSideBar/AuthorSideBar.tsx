import React from 'react';
import { Author } from '../../../../../shared/components/author/Author';
import { AuthorArticles } from './authorArticles/AuthorArticles';
import { AuthorContainer, AuthorSideBarContainer } from './AuthorSideBar.styled';
import { useArticleById } from '../../../../../shared/hooks/useArticleById';

export const AuthorSideBar = () => {
  const { data } = useArticleById();

  return (
    <AuthorSideBarContainer>
      <AuthorContainer>
        <Author
          author={data?.author}
          datePublished={data?.published}
        />
      </AuthorContainer>
      <AuthorArticles />
    </AuthorSideBarContainer>
  );
};
