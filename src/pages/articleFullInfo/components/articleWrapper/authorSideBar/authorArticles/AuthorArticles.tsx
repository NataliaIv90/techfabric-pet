import {
  ArticleItem,
  ArticlesList,
  AuthorArticlesContainer,
  AuthorArticlesName,
  NameArticleButton,
  TagsList,
  TextArticle,
} from './AuthorArticles.styled';
import { useArticleById } from '../../../../../../shared/hooks/useArticleById';
import { useNavigate } from 'react-router-dom';

export const AuthorArticles = () => {
  const { data } = useArticleById();
  const navigate = useNavigate();

  if (!data?.authorsArticles.length) {
    return null;
  }

  return (
    <AuthorArticlesContainer>
      <AuthorArticlesName>
        More from <span>{`${data.author.name} ${data.author.surname}`}</span>
      </AuthorArticlesName>
      <ArticlesList>
        {data?.authorsArticles.map(({ name, tags, id }, idndex) => (
          <ArticleItem
            key={idndex}
            borderBottom={data.authorsArticles.length > 0 && data.authorsArticles.length - 1 !== idndex}
          >
            <NameArticleButton
              type='button'
              onClick={() => navigate(`/articles/${id}`)}
            >
              <TextArticle>{name}</TextArticle>
              <TagsList>
                {tags.map((tag, index) => (
                  <li key={index}>
                    <p>{tag.name}</p>
                  </li>
                ))}
              </TagsList>
            </NameArticleButton>
          </ArticleItem>
        ))}
      </ArticlesList>
    </AuthorArticlesContainer>
  );
};
