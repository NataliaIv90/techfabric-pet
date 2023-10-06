import { useArticleById } from '../../../../../../shared/hooks/useArticleById';
import { CommentsCount } from './CreateComments.styled';
import { FormComment } from '../commentForm/CommentForm';
import { useGetCurrentUserData } from '../../../../../../shared/hooks/useGetCurrentUserData';

export const CreateComment = () => {
  const { data: userData } = useGetCurrentUserData();
  const { data } = useArticleById();

  if (!userData) {
    return null;
  }
  return (
    <>
      <CommentsCount>Comments: {data?.comments.length}</CommentsCount>
      <FormComment />
    </>
  );
};
