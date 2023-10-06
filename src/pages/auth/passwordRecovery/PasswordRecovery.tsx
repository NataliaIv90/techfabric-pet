import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { StyledForm, StyledFormWrapper, StyledErrorMessage } from '../authWrapper/AuthWrapper.styled';
import { Button, CircularProgress } from '@mui/material';
import { InputComponent } from '../../../shared/components/Input';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../redux/slicesApi/passwordRecoverySliceApi';
import { IResetPasswordData } from '../../../types/recoveryPassword';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const validationSchema = Yup.object().shape({
  toEmail: Yup.string()
    .required('This is required field')
    .email('You should enter a valid email address')
    .min(5, "This field can't be empty")
    .max(50, 'This email is too long'),
});

export const PasswordRecovery = () => {
  const [resetPassword, { error, isSuccess, isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate('/recovery-notification');
    }
  }, [isSuccess, navigate]);

  const onSubmit: SubmitHandler<IResetPasswordData> = async (data) => {
    resetPassword(data);
  };

  const { control, handleSubmit } = useForm<IResetPasswordData>({
    defaultValues: {
      toEmail: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <AuthWrapperComponent
      title='Forgot Your Password?'
      text='You need to enter your email to recover your password. We will send an instruction with password recovery to your e-mail.'
      isNarrow
    >
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='toEmail'
            render={({ field, fieldState }) => (
              <InputComponent
                type='text'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the e-mail...'
                icon={<MailOutlineIcon />}
              />
            )}
          />

          {error && 'data' in error ? <StyledErrorMessage>{error.data as string}</StyledErrorMessage> : null}

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='outlined'
              type='submit'
              sx={{ textTransform: 'none' }}
            >
              Send me the instructions
            </Button>
          )}
        </StyledForm>
      </StyledFormWrapper>
    </AuthWrapperComponent>
  );
};
