import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import * as Yup from 'yup';
import { InputComponent } from '../../../shared/components/Input';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledForm, StyledFormWrapper, StyledErrorMessage } from '../authWrapper/AuthWrapper.styled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { LinedText } from '../components/Line';
import { Button, CircularProgress } from '@mui/material';
import { useRegisterUserMutation } from '../../../redux/slicesApi/authSliceApi';
import { IRegisterData } from '../../../types/auth';
import { useEffect } from 'react';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required field')
    .min(3, 'Username should be min 3 characters')
    .max(50, 'This username is too long')
    .matches(
      /^(?=.{2,50}$)[A-Za-z0-9\-_+=!]*$/,
      'Username can contain only latin letters, numbers and special characters -,_,+,=,!'
    ),
  name: Yup.string()
    .required('Name is required field')
    .min(2, 'Name should be min 2 characters')
    .max(50, 'This name is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Name can only contain latin letters, start from capital letter'),
  surname: Yup.string()
    .required('Surname is required field')
    .min(2, 'Surname should be min 2 characters')
    .max(50, 'This surname is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Surname can only contain latin letters,  start from capital letter'),
  email: Yup.string()
    .required('Email is required field')
    .email()
    .min(5, 'Email should be min 5 symbols')
    .max(50, 'This email is too long'),
  password: Yup.string()
    .min(8, 'This password is too short, min 8 symbols')
    .max(50, 'This password is too long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/,
      'Use uppercase and lowercase letters, numbers, spec symbols (!,%,*,?,&), min 8 characters'
    )
    .required('Password is required field'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Wrong input of confirmation password')
    .required('This field is required'),
});

export const Register = () => {
  const [register, { data, isLoading, error }] = useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, [error]);

  useEffect(() => {
    if (data) {
      navigate(`/confirm/${data.email}`);
    }
  }, [data, navigate]);

  const onSubmit: SubmitHandler<IRegisterData> = (data) => {
    register(data);
  };

  const { control, handleSubmit } = useForm<IRegisterData>({
    defaultValues: {
      username: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <AuthWrapperComponent
      title='Welcome to the '
      islogoInText
      text='We are the largest society of game enthusiasts. Here you are sure to find like-minded people! To create an account, you can register via email.'
    >
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='username'
            render={({ field, fieldState }) => (
              <InputComponent
                type='text'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the username...'
                icon={<AccountCircleOutlinedIcon />}
              />
            )}
          />

          <Controller
            control={control}
            name='name'
            render={({ field, fieldState }) => (
              <InputComponent
                type='text'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the name...'
                icon={<AccountCircleOutlinedIcon />}
              />
            )}
          />

          <Controller
            control={control}
            name='surname'
            render={({ field, fieldState }) => (
              <InputComponent
                type='text'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the surname...'
                icon={<AccountCircleOutlinedIcon />}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field, fieldState }) => (
              <InputComponent
                type='text'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the email...'
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

          <Controller
            control={control}
            name='repeatPassword'
            render={({ field, fieldState }) => (
              <InputComponent
                type='password'
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter the password again...'
                icon={<KeyIcon />}
              />
            )}
          />

          {error && 'data' in error ? (
            <StyledErrorMessage>An error occured: {JSON.stringify(error.data)}</StyledErrorMessage>
          ) : null}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type='submit'
              variant='black'
              sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '22px',
                fontFamily: 'Roboto',
                fontWeight: 500,
              }}
            >
              <MailOutlineIcon />
              <span>Sign up with email</span>
            </Button>
          )}
        </StyledForm>

        <LinedText text='or' />

        <Button
          sx={{ textTransform: 'none' }}
          onClick={() => {
            navigate('/login');
          }}
        >
          Log In
        </Button>
      </StyledFormWrapper>
    </AuthWrapperComponent>
  );
};
