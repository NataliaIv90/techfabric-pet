import { CommentsContainer } from './Comments.styled';
import { CreateComment } from './components/createComment/CreateComment';
import { ListComments } from './components/commentsList/CommentsList';
import { useArticleById } from '../../../../shared/hooks/useArticleById';
import { useGetCurrentUserData } from '../../../../shared/hooks/useGetCurrentUserData';

export const Comments = () => {
  const { data: userData } = useGetCurrentUserData();
  const { data } = useArticleById();
  const hasComments = data?.comments.length;
  if (!hasComments && !userData) {
    return null;
  }
  return (
    <CommentsContainer id='commentsSection'>
      <CreateComment />
      <ListComments />
    </CommentsContainer>
  );
};
