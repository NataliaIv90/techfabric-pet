import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { StyledForm, StyledFormWrapper, StyledErrorMessage } from '../authWrapper/AuthWrapper.styled';
import { Button, CircularProgress } from '@mui/material';
import { InputComponent } from '../../../shared/components/Input';
import KeyIcon from '@mui/icons-material/Key';

import { useSetPasswordMutation } from '../../../redux/slicesApi/passwordRecoverySliceApi';
import { ISetPasswordData, INewPasswordForm } from '../../../types/recoveryPassword';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/,
      'Use uppercase and lowercase letters, numbers, spec symbols (!,%,*,?,&), min 8 characters'
    )
    .max(50, 'This password is too long')
    .required('Password is required field'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Wrong input of confirmation password')
    .required('This is required field'),
});

export const NewPassword = () => {
  const [setNewPassword, { error, isSuccess, isLoading }] = useSetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<INewPasswordForm> = async ({ password, repeatPassword }) => {
    const resetToken = new URLSearchParams(location.search).get('token')?.replaceAll(' ', '+') as string;
    const id = location.pathname.split('reset-password/')[1];

    const passwordRequestData: ISetPasswordData = {
      data: {
        password,
        repeatPassword,
        resetToken,
      },
      id,
    };
    setNewPassword(passwordRequestData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  const { control, handleSubmit } = useForm<INewPasswordForm>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <AuthWrapperComponent
      title='Password Recovery'
      text=''
      isNarrow
    >
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
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

          {error && 'data' in error ? <StyledErrorMessage>{JSON.stringify(error.data)}</StyledErrorMessage> : null}

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='outlined'
              type='submit'
              sx={{ textTransform: 'none' }}
            >
              Save this new password
            </Button>
          )}
        </StyledForm>
      </StyledFormWrapper>
    </AuthWrapperComponent>
  );
};
