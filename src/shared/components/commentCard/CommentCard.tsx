import { TCommentCard } from '../../../types/comments';
import { Author } from '../author/Author';
import { CommentContent, CommentItem } from './CommentCard.styled';

export const CommentCard = ({ author, createdAt, content }: TCommentCard) => {
  return (
    <CommentItem>
      <Author
        author={author}
        type='comment'
        datePublished={createdAt}
      />
      <CommentContent>{content}</CommentContent>
    </CommentItem>
  );
};
