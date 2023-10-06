import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, CircularProgress } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import { StyledForm, StyledFormWrapper, StyledErrorMessage } from '../authWrapper/AuthWrapper.styled';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { LinedText } from '../components/Line';
import { InputComponent } from '../../../shared/components/Input';
import { useLoginMutation } from '../../../redux/slicesApi/authSliceApi';
import { ILoginData } from '../../../types/auth';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('This is required field, enter your username or email')
    .min(3, 'This field shold be at least 3 symbols')
    .max(50, 'This text is too long')
    .matches(
      /^(((?=.{3,50}$)[A-Za-z0-9\-_+=!]*)|(?=.{5,50}$)([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+))$/,
      'Enter a valid email or username'
    ),
  password: Yup.string()
    .required('Password is required field')
    .min(8, 'This password is too short')
    .max(50, 'This password is too long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/,
      'Use uppercase and lowercase letters, numbers, spec symbols (!,%,*,?,&), min 8 characters'
    ),
});

export const Login = () => {
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, [error]);

  useEffect(() => {
    isSuccess && navigate('/');
  }, [isSuccess, navigate]);

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    login(data);
  };

  const { control, handleSubmit } = useForm<ILoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <AuthWrapperComponent
      title='Welcome back to the '
      islogoInText
      text='We are the largest society of game enthusiasts. Here you are sure to find like-minded people! To log into your account, enter your username or email and password.'
    >
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='email'
            render={({ field, fieldState }) => (
              <InputComponent
                type='text'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the username or email...'
                icon={<MailOutlineIcon />}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field, fieldState }) => (
              <InputComponent
                type='password'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the password...'
                icon={<KeyIcon />}
              />
            )}
          />

          {error && 'data' in error ? <StyledErrorMessage>{error.data as string}</StyledErrorMessage> : null}

          <Button
            sx={{ textTransform: 'none' }}
            onClick={() => {
              navigate('/password-recovery');
            }}
          >
            Forgot Your Password?
          </Button>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='outlined'
              type='submit'
              sx={{ textTransform: 'none' }}
            >
              Log In
            </Button>
          )}
        </StyledForm>

        <LinedText text='Don&#39;t have an account?' />

        <Button
          onClick={() => {
            navigate('/register');
          }}
          variant='black'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '22px',
            textTransform: 'none',
            fontFamily: 'Roboto',
            fontWeight: 500,
          }}
        >
          <MailOutlineIcon />
          <Box>Sign up with email</Box>
        </Button>
      </StyledFormWrapper>
    </AuthWrapperComponent>
  );
};
