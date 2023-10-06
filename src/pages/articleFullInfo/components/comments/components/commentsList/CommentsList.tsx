import { CommentCard } from '../../../../../../shared/components/commentCard/CommentCard';
import { useArticleById } from '../../../../../../shared/hooks/useArticleById';
import { ListCommentsContainer } from './CommentsList.styled';

export const ListComments = () => {
  const { data } = useArticleById();

  return (
    <ListCommentsContainer>
      {data?.comments.map(({ content, author, createdAt }, index) => (
        <CommentCard
          key={index}
          content={content}
          author={author}
          createdAt={createdAt}
        />
      ))}
    </ListCommentsContainer>
  );
};
