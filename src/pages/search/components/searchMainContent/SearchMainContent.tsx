import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArticleCard } from '../../../../shared/components/articleCard/ArticleCard';
import { useGetSearchResults } from '../../../../shared/hooks/useGetSearchResults';
import { ECategory } from '../../../../types/search';
import {
  ArticlesSearchList,
  CommentNavLink,
  CommentsSearchList,
  TagButton,
  TagsSearchList,
  UserButton,
  UserItem,
  UsersSearchList,
} from './SearchMainContent.styled';
import { Author } from '../../../../shared/components/author/Author';
import { CircularProgress } from '@mui/material';
import { CommentCard } from '../../../../shared/components/commentCard/CommentCard';

export const SearchMainContent = () => {
  const { data, error, isFetching } = useGetSearchResults();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const navigate = useNavigate();

  if (error) {
    return <div>No Results!</div>;
  }
  if (isFetching) {
    return <CircularProgress />;
  }

  const currentData = () => {
    switch (category) {
      case ECategory.Articles:
        if (data && 'articles' in data) {
          return (
            <ArticlesSearchList>
              {data?.articles.map((article) => (
                <li key={article.id}>
                  <ArticleCard data={article} />
                </li>
              ))}
            </ArticlesSearchList>
          );
        }
        break;
      case ECategory.Users:
        if (data && 'users' in data) {
          return (
            <UsersSearchList>
              {data?.users.map((user, index) => (
                <UserItem key={index}>
                  <UserButton
                    type='button'
                    onClick={() => navigate(`/articles?query=${user.userName}&category=username`)}
                  >
                    <Author
                      author={user}
                      type='search'
                    />
                  </UserButton>
                </UserItem>
              ))}
            </UsersSearchList>
          );
        }
        break;
      case ECategory.Tags:
        if (data && 'tags' in data) {
          return (
            <TagsSearchList>
              {data.tags.map((tag) => (
                <li key={tag.name}>
                  <TagButton
                    type='button'
                    onClick={() => navigate(`/articles?query=${tag.name.slice(1)}&category=tags`)}
                  >
                    {tag.name}
                  </TagButton>
                </li>
              ))}
            </TagsSearchList>
          );
        }
        break;
      case ECategory.Comments:
        if (data && 'comments' in data) {
          return (
            <CommentsSearchList>
              {data.comments.map(({ content, articleId, createdAt, author }) => (
                <CommentNavLink
                  to={`/articles/${articleId}`}
                  key={createdAt}
                >
                  <CommentCard
                    content={content}
                    id={createdAt}
                    createdAt={createdAt}
                    author={author}
                  />
                </CommentNavLink>
              ))}
            </CommentsSearchList>
          );
        }
        break;
      default:
        return null;
    }
  };
  return <>{currentData()}</>;
};
