import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { useCreateCommentMutation } from '../../../../../../redux/slicesApi/commentsSliceApi';
import { useArticleById } from '../../../../../../shared/hooks/useArticleById';
import { InputComponent } from '../../../../../../shared/components/Input';
import { StyledErrorMessage } from '../../../../../auth/authWrapper/AuthWrapper.styled';
import { ButtonContainer, ButtonStyled } from './CommentForm.styled';

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required('This is required field')
    .min(1, "This field can't be empty")
    .max(200, 'This comment is too long')
    .test('no-whitespace', 'Comment cannot consist of only whitespace', (value) => {
      return value.replace(/\s/g, '').length > 0;
    }),
});

export const FormComment = () => {
  const { articleId, refetch } = useArticleById();
  const [createComment, { isLoading, error }] = useCreateCommentMutation();

  const onSubmit: SubmitHandler<{ content: string }> = async (content) => {
    if (articleId) {
      const requestData = { ...content, articleId };

      await createComment(requestData);
      refetch();
      reset();
    }
  };

  const { control, handleSubmit, reset } = useForm<{ content: string }>({
    defaultValues: {
      content: '',
    },
    resolver: yupResolver(validationSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='content'
        render={({ field, fieldState }) => (
          <InputComponent
            type='text'
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            placeholder='Write your comment here'
          />
        )}
      />

      {error && 'data' in error ? <StyledErrorMessage>{error.data as string}</StyledErrorMessage> : null}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <ButtonContainer>
          <ButtonStyled
            variant='outlined'
            type='submit'
            sx={{ textTransform: 'none' }}
          >
            Send comment
          </ButtonStyled>

          <ButtonStyled
            type='button'
            sx={{ textTransform: 'none' }}
            onClick={() => reset()}
          >
            Clear
          </ButtonStyled>
        </ButtonContainer>
      )}
    </form>
  );
};
